# Project Template

There is everything you need to start a project from scratch quickly (api, web, mobile, CI/CD...)


$~$
## 0) Basics
- `PROJECT_ID`: for example "pokemon-apps"
  - It is immutable and can be set only during project creation.
  - It must start with a lowercase letter and can have lowercase ASCII letters, digits or hyphens.
  - It must be between 6 and 30 characters.

$~$
## 1) Set up the codebase
- Clone and set the remote url
`PROJECT_ID` = see 0) Basics
```bash
git clone git@github.com:adriencarpentier.com/project-template.git $PROJECT_ID
&& git remote set-url origin git@github.com:adriencarpentier.com/$PROJECT_ID.git
&& git checkout -B dev
```

- Configure git (on Windows only)
```bash
git config --global core.autocrlf false
```

- Populate the pre-commit script
```bash
cp ./scripts/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
```


$~$
## 2) Set up the local environment
1) BACKEND: See [./apps/backend/README.md](./apps/backend/README.md)
2) FRONTEND: See [./apps/frontend/README.md](./apps/frontend/README.md)


$~$
## 3) Set up the dev/prod environment
#### A) Open the [GCP console](https://shell.cloud.google.com/?hl=en_US&fromcloudshell=true&show=terminal)
- Set variable in the terminal : `> MY_VARIABLE=MY_VALUE`
  - `PROJECT_ID` = see 0) Basics
  - `REPOSITORY` = my-org/my-repo => adriencarpentier.com/project-template
  - `BILLING_ACCOUNT_ID` = search the billing **ACCOUNT_ID** ```gcloud beta billing accounts list --filter="OPEN:true"```
  - `SQL_INSTANCE_NAME` = PROJECT_ID-staging OR PROJECT_ID-production
  - `SQL_TIER` = db-f1-micro OR db-g1-small
  - `SQL_REGION` = [https://cloud.google.com/sql/docs/sqlserver/locations](https://cloud.google.com/sql/docs/sqlserver/locations)
  - `SQL_DATABASE_NAME` = your call :)
  - `SQL_DATABASE_PASSWORD` = your call :)

**FROM NOW, YOU JUST HAVE TO COPY/PASTE SHELL COMMAND**

#### B) Create GCP project
```bash
echo "-------------Create GCP project-------------"

&& echo "Set up GCP project"
&& gcloud projects create $PROJECT_ID --organization=461972869180 
&& gcloud config set project $PROJECT_ID

&& echo "Link the billing"
&& gcloud beta billing projects link $PROJECT_ID --billing-account=$BILLING_ACCOUNT_ID

&& echo "Enable GCP APIs"
&& gcloud services enable dns.googleapis.com sqladmin.googleapis.com containerregistry.googleapis.com run.googleapis.com compute.googleapis.com cloudbuild.googleapis.com servicenetworking.googleapis.com iamcredentials.googleapis.com
```

#### C) Create CI/CD IAMs - [Roles](https://cloud.google.com/iam/docs/understanding-roles) [Workload Identity](https://cloud.google.com/blog/products/identity-security/enabling-keyless-authentication-from-github-actions)
```bash
echo "-------------Create CI/CD IAMs-------------"

&& echo "Get the project number"
&& PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

&& echo "Create Workload Identity Pool : ci-cd-github"
&& gcloud iam workload-identity-pools create ci-cd-github --location=global

&& echo "Create Workload Identity Provider : ci-cd-github"
&& gcloud iam workload-identity-pools providers create-oidc ci-cd-github --workload-identity-pool=ci-cd-github --location=global --attribute-mapping=google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository --issuer-uri=https://token.actions.githubusercontent.com

&& echo "Create the Service Account : ci-cd-github"
&& gcloud iam service-accounts create ci-cd-github

&& echo "Setup permission of the Service Account : ci-cd-github"
&& gcloud projects add-iam-policy-binding $PROJECT_ID --role=roles/run.admin --member=serviceAccount:ci-cd-github@$PROJECT_ID.iam.gserviceaccount.com
&& gcloud projects add-iam-policy-binding $PROJECT_ID --role=roles/storage.admin --member=serviceAccount:ci-cd-github@$PROJECT_ID.iam.gserviceaccount.com
&& gcloud projects add-iam-policy-binding $PROJECT_ID --role=roles/iam.serviceAccountUser --member=serviceAccount:ci-cd-github@$PROJECT_ID.iam.gserviceaccount.com
&& gcloud iam service-accounts add-iam-policy-binding ci-cd-github@$PROJECT_ID.iam.gserviceaccount.com --role=roles/iam.workloadIdentityUser --member=principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/ci-cd-github/attribute.repository/$REPOSITORY
```

#### D) Create postgresSQL database [Cloud SQL](https://cloud.google.com/sql/docs/postgres/create-instance)
```bash
echo "-------------Create postgresSQL database-------------"

&& echo "Create the instance"
&& gcloud sql instances create $SQL_INSTANCE_NAME --tier=$SQL_TIER --region=$SQL_REGION --database-version=POSTGRES_14 --storage-auto-increase --database-flags=cloudsql.iam_authentication=on --retained-backups-count=5 --enable-point-in-time recovery

&& echo "Set the user/password"
&& gcloud sql users set-password postgres --password=$SQL_DATABASE_PASSWORD --instance=$SQL_INSTANCE_NAME

&& echo "Create the database development"
&& gcloud sql databases create $SQL_DATABASE_NAME --instance=$SQL_INSTANCE_NAME
```
_(optional for prod) You can repeat this part for the production database by changing **SQL_DATABASE_NAME=...** AND **SQL_INSTANCE_NAME=...**_

#### E) (optional) Add a developer on the project
`DEVELOPER_EMAIL` = my-user@my-domain.com
```bash
gcloud projects add-iam-policy-binding $PROJECT_ID --member=user:$DEVELOPER_EMAIL --role=roles/editor
```

#### F) (optional) Delete the project
```bash
gcloud projects delete $PROJECT_ID
```


$~$
## 4) Set up GitHub Environments : Settings > Environments > New environment
- For the backend, create a new environment with the following data :
1. Name: _backend-staging_
2. Click on "Add deployment branch rule" and fill with _dev_
3. Click on "Add secret"
   1. NAME: _ENV_
   2. Value: _content from .env.deploy.template_
4. _(optional for prod) Repeat one more time, with name _backend-production_ and branch _main__

- For the frontend, create a new environment with the following data :
1. Name: _frontend-staging_
2. Click on "Add deployment branch rule" and fill with _dev_
3. Click on "Add secret"
    1. NAME: _ENV_
    2. Value: _content from .env.deploy.template_
4. _(optional for prod) Repeat one more time, with name _frontend-production_ and branch _main__


$~$
## 5) Push the first commit
```bash
git add -A && git commit -m "build: first commit" && git push origin main
```
The dev URL : Actions > see the API/FRONTEND jobs > Deploy to Google Cloud Run > Service URL
Don't forget to update the environment "frontend-staging" with the api URL


$~$
## 6) (optional) Set up GitHub protection : Settings > Branches > Add rule
1. Name: _main_
2. Protect matching branches :
    1. _Require a pull request before merging_
    2. _Require status checks to pass before merging_
        1. _Require branches to be up-to-date before merging_
    3. _Do not allow bypassing the above settings_
