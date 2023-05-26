# Project Template - WEB - REACT + VITE

This is a quick documentation about setting up the web.
It includes the following packages :
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [React](https://reactjs.org) for code base
- [MUI](https://mui.com/) for UI tools
- [Redux](https://redux.js.org) for storage state
- [i12next](https://www.i18next.com) for translation


$~$
## Set up the local environment
1) From _.env.local.template_, create _.env_, and replace all _TO_BE_MODIFIED_ regarding the above comment
2) Start docker deamon, and execute in your terminal ```yarn dev```
3) You can access your site from```https://localhost:5173```


$~$
## Project structure
This project structure is based on [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design).
- ```@assets``` - contains assets that are shared across domains like branding, icons or global locales
- ```@components``` - contains components that are shared across domains like circular progress.
- ```@configs``` - contains global config like theme or sidebar.
- ```@domains``` - contains all domains.
- ```@hooks``` - contains hooks that are shared across domains like the store.
- ```@layouts``` - contains layout based components like sidebar, navbar or container.
- ```@libs``` - contains facades of project libraries like axios or react-router-dom.
- ```@services``` - contains public methods or interfaces like translation or meta.
- ```@stores``` - contains redux store
- ```@utils``` - contains utils functions as for cookies or text


$~$
## Add variable in .env
1) add your variable in ```.env```
2) add your variable in ```vite-env.d.ts```
3) import your variable in ```@services/MetaService.ts```
4) import your variable in your code from ```@services/MetaService.ts```


$~$
## Add new domain
1) Copy the ```@domain/auth``` folder
2) Rename all words containing "auth" (AuthConfig, AuthRoutes, authRoutes, etc.) with your domain name singular
3) Routing - Add your routes in ```<Router routes={[authRoutes, dashboardRoutes, [domain_name]Routes]} />```
   in ```App.tsx```
4) Translation - Add you domain locales```(@domain/[domain_name]/assets/locales```
   in ```@services/TranslationService.ts```
5) Sidebar - Add your main domain route in ```@configs/SidebarConfig.ts```
6) Store - Create a ```new Reducer(reducer_name, default_model)``` and add it to the const ```reducer```
   in ```@stores/Stores.ts``` - example in auth domain


$~$
## Use translation
- Get a translation
```tsx
import { useTranslation } from "react-i18next";

//...

const { t } = useTranslation();
t("[domain name: auth | user | dashboard | .. | global].[key]");
```

- Change language
```tsx
import { useTranslation } from "react-i18next";

//...

const {
    i18n: { language, changeLanguage },
} = useTranslation();

// Change the language to english
onClick: () => changeLanguage("en");

// Print the current language
console.log("Current language: " + language);
```


$~$
## Use store
- Get value from a reducer
```tsx
import { useSelector } from "@hooks/StoreHook";

//...

const userReducer = useSelector((state) => state.authReducer);
```

- Update the value of a reducer
```tsx
import { useDispatch } from "@hooks/StoreHook";
import { updateAuth } from "@domains/auth/stores/auth/AuthReducer";

//...

dispatch(
    updateAuth({
      token: newToken,
    })
);
```

$~$
## Development tips
**Naming**<br />
- **package** starts with a lowercase letter
- **class** starts with an uppercase letter and the package name singular
- **variable** starts with a lowercase letter
- **interface** starts with I letter
- **component** starts with a lowercase letter and don't add the package name

**Comment**<br />
**Always comment your code**, you will make your mate happy when he takes back your code

**Eslint and Prettier**<br />
Add eslint and prettier to your IDE config.


$~$
## Useful commands

- remove ALL containers, images, caches, networks from docker

```bash
docker system prune -a
```

- run the server on docker
  _On Windows, if you want a sync host/vm, you have to work in \\\wsl$\docker-desktop-data\data\docker\volumes\...\_data_

```bash
yarn dev
# or docker-compose up
# add --build to rebuild the container
```

- run test on docker

```bash
docker-compose run -i -t --rm --entrypoint=sh web -c "yarn test"
```