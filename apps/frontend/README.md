# Project Template - WEB - SVELTEKIT

This is a quick documentation about setting up the web.
It includes the following packages :
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting


## Set up the local environment
From _.env.local.template_, create _.env_, and replace all _TO_BE_MODIFIED_


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

You can then access your app on `http://localhost:5173`.


To actively check for TS errors in our code, run:
```bash
npm run check:watch
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
