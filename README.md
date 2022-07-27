# Single-Spa Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2. with the help of [single-spa](https://single-spa.js.org/).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Overview

This repo is used in conjunction with four other repos listed below. Together they make up an application composed of microfrontends. Each app can be updated and deployed independently from the others.

- [**Root Config**](https://github.com/actionanand/single-spa-demo-root-config)
- [**Angular App** (This Repo)](https://github.com/actionanand/single-spa-angular)
- [**React App**](https://github.com/actionanand/single-spa-react)
- [**Vue App**](https://github.com/actionanand/single-spa-vue)
- [**Svelte App**](https://github.com/actionanand/single-spa-svelte)

## Demo

You can find the demo here: 

## How to run this repo locally

```bash
npm run serve:single-spa:single-spa-angular
```

## How to create single-spa frontend app

```bash
npx create-single-spa
```

## How It Works

This project uses [single-spa](https://single-spa.js.org/) to architect an app composed of `micro-frontends`. In the root config, the four microfrontend apps (angular, react, vue, and svelte) are registered with singe-spa. The main `index.ejs` file contains an import map, which references where to find the compiled JavaScript bundle for each microfrontend. [SystemJS](https://github.com/systemjs/systemjs) is the module loader which then loads the bundles when needed.


### NB

Each repo can be set up with [Travis CI](https://travis-ci.org/) for running jobs as part of a continuous integration pipeline. When new code is pushed to the master branch for any of the repos, the new code is compiled and then uploaded to AWS S3, which serves as a CDN. The CI job also updates the import map file to reference the new bundle for the updated project.

### Sources

- [How to Develop and Deploy Micro-Frontends with Single-SPA](https://www.freecodecamp.org/news/developing-and-deploying-micro-frontends-with-single-spa/)
- [Fun with Micro-frontend in a single-spa way](https://dev.to/nitinreddy3/fun-with-micro-frontend-in-a-single-spa-way-1iok)
- [Connect Micro frontends with the Single-Spa framework. Step by step guide.](https://obaranovskyi.medium.com/connecting-micro-frontends-with-the-single-spa-framework-step-by-step-guide-e7fa87306bc7)