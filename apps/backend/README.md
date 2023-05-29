# Project Template - Python API

## API endpoints

- `/admin`: Back-office administration
- `/api/docs`: API documentation (Swagger auto-doc)

The project template API also includes two example endpoints, to be modified:
-  `/api/pokemons/`:
    - method: `POST`
    - Create a pokemon in the DB.
- `/api/pokemons/<id>/`:
    - method: `GET`
    - Get a pokemon from the DB by its id.

## Dependencies

### System dependencies
Main dependencies are Python 3.11 or higher and a PostgreSQL database.

### Python dependencies
The project uses [Django](https://www.djangoproject.com/) 4.2 which includes a back-office and a SQL ORM, and [Django Ninja REST Framework](https://django-ninja.rest-framework.com/) to make it a REST API framework.
Both will be installed in the Python virtual environment if you follow the instructions. For the complete list of Python modules dependencies list, please have a peek at `pyproject.toml` if you use a modern Python package manager like [PDM](https://pdm.fming.dev/) or [Poetry](https://python-poetry.org/), or `requirements.txt` otherwise.

## How to run locally

Double check you have a supported Python version (should be >= 3.11):
```bash
python3 -V
```
(If not, install [Pyenv](https://github.com/pyenv/pyenv) to manage several Python versions, and install Python 3.11 with `pyenv install 3.11`.)

### Load environment variables
Here are the necessary environment variables for the project to run localhostlly and/or on GCP:

- `ENV_NAME`: string used to set some variables and the Sentry environment. Should be either `local` when run locally, `dev` for staging, `prod` when run on production.
- `GCP_PROJECT_ID`: the GCP project ID (appears at the very top of GCP console)
- `GCP_PROJECT_NUMBER`: to get the GCP project number from the GCP project ID using gcloud CLI, run `gcloud projects describe $PROJECT_ID --format='value(projectNumber)'`
- `GCP_RUN_REGION`
- `GCP_IMAGE_REGION`
- `GS_BUCKET_NAME`
- `DATABASE_URL`: Database connexion string. Should follow the 12F/(django-environ)[https://django-environ.readthedocs.io/en/latest/quickstart.html] convention, for example: `DATABASE_URL=psql://user:password@host:port/database`
- `SECRET_KEY`: the Django secret key, can be random
- `DJANGO_SUPERUSER_PASSWORD`: the default password for default Django `admin` user
- `SENTRY_DSN`

Example `.env` file for running locally:
```
ENV_NAME=local

####### Google Cloud Platform #######
GCP_PROJECT_ID=project-template-backend
GCP_PROJECT_NUMBER=521347921082
GCP_RUN_REGION=europe-west9
GCP_IMAGE_REGION=europe-west9
GS_BUCKET_NAME=project-template-backend

####### Database #######
DATABASE_URL=postgres://postgres@127.0.0.1/project-template-db
# DATABASE_URL=postgres://postgres:myPostgresPassword@127.0.0.1/project-template-db # from local with GCP proxy

####### Django specific settings #######
SECRET_KEY=myDjangoSecretKey
DJANGO_SUPERUSER_PASSWORD=adminadmin

####### Sentry error logging #######
SENTRY_DSN=mySentryDsn
```


### Install the dependencies

Create a virtual environment, activate it and install the dependencies:
```bash
cd apps/backend
virtualenv -p python3.11 .venv
source .venv/bin/activate
pip install -r requirements.txt
```
...or with [PDM](https://pdm.fming.dev/):
```bash
cd apps/backend
pdm install
```

### Execute commands using [PDM](https://pdm.fming.dev/)
If you use [PDM](https://pdm.fming.dev/), all the Python commands should be preceded by `pdm run` for the commands to be run automatically in the right virtual environment.
For example:
```bash
pdm run ./manage.py runserver
```

### To create new migrations (will be created in `pokemons_app/migrations`)
```bash
pdm run ./manage.py makemigrations
```

### To migrate the DB using the migrations from `pokemons_app/migrations`
```bash
python3 ./manage.py migrate
```

If you want to migrate the cloud database, you might have to connect to it first with a proxy. See `connect to remote GCP SQL` first.

### To create a Django super user
```bash
pdm run ./manage.py createsuperuser
```

### To run
```bash
pdm run ./manage.py runserver
```

### To export lock requirements to old `requirements.txt` lock file
```bash
pdm export -o requirements.txt --production
```

## To connect to remote GCP SQL

You will need a proxy to connect to the GCP PostgreSQL database. More info: [https://cloud.google.com/sql/docs/mysql/connect-auth-proxy](https://cloud.google.com/sql/docs/mysql/connect-auth-proxy).
Before connecting to the database, launch the proxy with:
- dev:
```bash
./cloud-sql-proxy project-template-backend:europe-west9:project-template-db-staging
```
- prod:
```bash
./cloud-sql-proxy project-template-backend:europe-west9:project-template-db-prod
```

Once connected through GCP SQL proxy, you can connect to the DB using the following:
`DB_HOST=localhost`
`DB_USER=postgres` as set in the [GCP console](https://console.cloud.google.com/)
`DB_PASSWORD`: use the password for the `postgres` user set in the [GCP console](https://console.cloud.google.com/)


## To test the CloudSQL instance

```bash
gcloud sql instances describe project-template-db-staging
```

## To deploy on GCP Cloud Run

Building on Google Build and deploying on Google Cloud Run processes are largely inspired by [this Google tutorial for running Django on Google Cloud Run](https://cloud.google.com/python/django/run) and [those example settings and deploy config files for Django projects on GCP, provided by Google](https://github.com/GoogleCloudPlatform/python-docs-samples/tree/main/run/django).

If not there yet, add secrets to the GCP Secrets Manager. Using the "permission" tab, grant the role `Secret Manager Secret Accessor` to the following principals:
- `521347921082-compute@developer.gserviceaccount.com`
- `521347921082@cloudbuild.gserviceaccount.com`

Build the image with:
- dev:
```bash
gcloud builds submit --config cloudbuild.yaml --substitutions _ENV_NAME=staging
```
- prod:
```bash
gcloud builds submit --config cloudbuild.yaml --substitutions _ENV_NAME=prod
```

Deploy it with:
- dev:
```bash
gcloud run deploy project-template-backend-staging \
    --platform managed \
    --region europe-west9 \
    --image gcr.io/project-template-backend/project-template-backend-staging \
    --add-cloudsql-instances project-template-backend:europe-west9:project-template-db-staging \
    --set-env-vars ENV_NAME=staging \
    --allow-unauthenticated
```
- prod:
```bash
gcloud run deploy project-template-backend-prod \
    --platform managed \
    --region europe-west9 \
    --image gcr.io/project-template-backend/project-template-backend-prod \
    --add-cloudsql-instances project-template-backend:europe-west9:project-template-db-prod \
    --set-env-vars ENV_NAME=prod \
    --allow-unauthenticated
```

Get the API URL with:
- dev:
```bash
SERVICE_URL=$(gcloud run services describe project-template-backend-staging --platform managed --region europe-west9 --format "value(status.url)")
```
- prod:
```bash
SERVICE_URL=$(gcloud run services describe project-template-backend-prod --platform managed --region europe-west9 --format "value(status.url)")
```

Update the deployed build with the API URL:
- dev:
```bash
gcloud run services update project-template-backend-staging \
    --platform managed \
    --region europe-west9 \
    --set-env-vars ENV_NAME=staging,CLOUDRUN_SERVICE_URL=$SERVICE_URL
```
- prod:
```bash
gcloud run services update project-template-backend-prod \
    --platform managed \
    --region europe-west9 \
    --set-env-vars ENV_NAME=prod,CLOUDRUN_SERVICE_URL=$SERVICE_URL
```

## To update the deployed instance

- staging:
```bash
gcloud builds submit --config cloudbuild.yaml --substitutions _ENV_NAME=staging
gcloud run deploy project-template-backend-staging\
    --platform managed \
    --region europe-west9 \
    --image gcr.io/project-template-backend/project-template-backend-dev
```
- prod:
```bash
gcloud builds submit --config cloudbuild.yaml --substitutions _ENV_NAME=prod
gcloud run deploy project-template-backend-prod\
    --platform managed \
    --region europe-west9 \
    --image gcr.io/project-template-backend/project-template-backend-prod
```
