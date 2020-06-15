# Serverless typescript gcp

## About the Project

Express server using serverless deployed on GCP using github actions CI/CD

### Summary

- Bootstrap app using google-nodejs template, nvm
- Setup using dotenv, typescript, format, eslint, VSCode, husky, jest
- Setup dev env using nodemon, coppa
- CI/CD using Github Action (lint, test, deploy)
- Setup express server

## Setup development

### Clone repository

```bash
$ git clone git@github.com:pramendra/serverless-typescript-gcp.git
$ cd serverless-typescript-gcp
```

### Change node version

```bash
$ nvm use
```

### Install dependencies

```bash
$ npm install
```

### Run dev environment

#### Run to build typescript on watch mode

```bash
$ npm run dev
```

#### Run to emulate cloud function

```bash
$ npm run coppa:watch
```

### Build using typescript

```bash
npm run build
```

### Format code

```bash
npm run format
```

### Lint code

```bash
npm run lint
```

### Test the code in watch mode

```bash
npm run test:watch
```

### Run typescript in watch mode

```bash
npm run dev
```

### Run coppa to emulate cloud functions

```bash
npm run coppa:watch
```

### Test the code in watch mode

```bash
npm run test:watch
```

### Deploy function

```bash
npx serverless --stage dev
```

## Tutorial (Step by step)

### Bootstrap app using google-nodejs template

```bash
$ mkdir serverless-typescript-gcp && $_
$ npx serverless create --template google-nodejs
```

### Setup node version using NVM

make node version same as gcp cloud functions version

#### create .nvmrc file

```bash
$ touch .nvmrc
```

#### add following in file

```
v10.16.2
```

### Setup development env

#### install dotenv package

```bash
$ npm i -D serverless-dotenv-plugin
```

#### configure dotenv support into serverless framework

update serverless.yam as follows

```
plugins:
  - serverless-google-cloudfunctions
  - serverless-dotenv-plugin
```

### Configure typescript

#### install dev dependencies

```bash
npm i -D typescript serverless-plugin-typescript @types/node @types/serverless
```

#### configure typescript support into serverless framework

update serverless.yam as follows

```
plugins:
  - serverless-google-cloudfunctions
  - serverless-dotenv-plugin
  - serverless-plugin-typescript
```

#### configure typescript configuration

create tsconfig.json with following detail

```
{
  "compilerOptions": {
    "esModuleInterop": true,
    "module": "commonjs",
    "target": "es6",
    "outDir": ".build",
    "lib": [
      "es6"
    ],
    "sourceMap": true,
    "strict": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "noUnusedLocals": true,
    "noUnusedParameters": false,
    "resolveJsonModule": true,
    },
  "typeRoots": [
    "node_modules/@types",
    "./types"
  ],
  "include": [
    "./src/**/*"
  ],
  "exclude": [
    "node_modules",
    "./.serverless/**/*",
    "./.build/**/*",
  ]
}
```

#### Create typescript file

migrate javascript to typescript

```bash
$ mkdir src
$ git mv -f index.js src/index.ts
```

#### Setup typescript build

Update scripts in package.json as flows

```
  "main": "src/index.js",
  "scripts": {
    "build": "tsc",
    "dev:watch": "tsc -w",
```

#### Ignore typescript build

add following .gitignore

```
.build
```

#### Refactor src/index.ts to support typescript

### Setup code formatting using prettier

#### Install dev dependencies

```bash
$ npm i -D prettier
```

#### configure prettier

create .prettierrc.json with following content

```
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "quoteProps": "as-needed",
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

#### configure vscode to auto format on same

create .vscode/settings.json with fllowing details

```
{
  "eslint.enable": true,
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "javascript.validate.enable": false,
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "node_modules/": true,
    "build/": true,
    ".nyc_output": true,
    "npm": true
  }
}
```

#### configure npm cli to format code

update package.json as follows

```
  "scripts": {
    "build": "tsc",
    "dev:watch": "tsc -w",
    "format": "prettier --write src",
    ...
```

### Setup code linting using eslint

#### install dev dependencies

```bash
$ npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier
```

#### configure eslint

create .eslintrc.json with following content

```
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "env": {
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "project": "./tsconfig.json",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": 0
  }
}
```

#### setup to ignore files

create .eslintignore with following content

```
node_modules
coverage
.serverless
.vscode
```

#### configure npm cli to format code

update package.json as follows

```
  "scripts": {
    "build": "tsc",
    "dev:watch": "tsc -w",
    "format": "prettier --write src",
    "lint": "eslint src/**/*",
    "lint:fix": "eslint --fix src/**/*",
    ...
```

### Setup husky to format and lint staged code

#### Install dependencies

```
$ npm i -D husky pretty-quick lint-staged
```

#### configure husky

##### append following package.json

```
{
  ...
  "husky": {
    "hooks": {
      "pre-commit": "npm run build && npm run pretty-quick --staged && npm run lint-staged"
    }
  }
}
```

##### create .lintstagedrc with following contente

```
{
  "*.ts": ["npm run lint:fix", "npm run format"]
}
```

### setup test using jest to test typescript

#### Install dev dependencies

```bash
$ npm i -D jest ts-jest @types/jest jest-express
```

#### Configure jest

##### create jest.config.js with following content

```
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  testMatch: ['**/tests/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/'],
  verbose: true,
  testURL: 'http://localhost/',
};

```

##### configure eslint

update .eslintrc.json as follows

```
    "env": {
        "node": true,
        "es6": true,
        "jest": true,
    },
```

##### configure typescript

update tsconfig.json as follows

```
    "include": [
      "./src/**/*",
      "./tests/**/*",
      "./types/**/*.ts",

```

##### Configure to test using npm

append as follows to test code

```
  "scripts": {
    "build": "tsc",
    "dev:watch": "tsc -w",
    "format": "prettier --write src",
    "lint": "eslint src/**/*",
    "lint:fix": "eslint --fix src/**/*",
    "test": "jest --coverage",
    "test:watch": "jest --watch"
    ...
```

##### setup file for test

create tests/index.test.ts with following content

```
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
const index = require('../src/index');

test('test http function', async () => {
  const req: any = new Request();
  const res: any = new Response();
  await index.http(req, res);
  expect(res.statusCode).toBe(200);
  expect(res.body).toBe('Hello World!');
});
```

## Configure nodemon to monitor changes in source and automatically restart

### Install dependencies

```bash
$ npm i -D nodemon
```

### configure nodemon

#### create nodemon.json with following content

```
{
  "ignore": ["**/*.test.ts", "**/*.spec.ts", ".git", "node_modules"],
  "watch": ["src"],
  "exec": "npm run dev:watch",
  "ext": "ts"
}
```

#### update scripts in package.json

```
    "dev": "NODE_ENV=dev nodemon"
```

## Configure coppa to emulate google cloud functions locally

### Install dependencies

```bash
$ npm i -D coppa
```

### configure coppa

#### update scripts in package.json

```
    "coppa:watch": "nodemon --ext js --watch .build/src --exec coppa start -- -e .build/src/index.js"
```

## Setup serverless CI/CD using github actions

### Goal

- should be able to deploy when PR is raised
- Shoul be able to deply when PR is merged
- Should have unique url for testing

### URL structure

SERVICE-STAGE-FUNCTION

#### example on master branch

`xxx.cloudfunctions.net/service-master-first`

#### example on PR branch

`service-pr[number]-function`

`xxx.cloudfunctions.net/service-pr2-first`

### Configure Google cloud functions

#### Create service account

1. Goto https://console.cloud.google.com/iam-admin/serviceaccounts/create?project=[PROJECT-ID]&supportedpurview=project
2. Create service account for CI/CD (eg: `github-action-cicd@[PROJECT-ID].iam.gserviceaccount.com`)

#### Create service account

1. Goto https://console.cloud.google.com/iam-admin/iam?authuser=1&project=[PROJECT-ID]&supportedpurview=project
2. Click `ADD`
3. Add members, roles to "[PROJECT-ID]" project
4. add email `github-action-cicd@[PROJECT-ID].iam.gserviceaccount.com`
5. with following roles

```
Cloud Build Editor
Cloud Functions Admin
Cloud Functions Developer
Cloud Functions Invoker
Deployment Manager Editor
Service Account User
Cloud Run Admin
Storage Admin
```

#### Download service account

1. Goto https://console.cloud.google.com/iam-admin/serviceaccounts/create?project=[PROJECT-ID]&supportedpurview=project
2. Create key
3. Download JSON file
4. rename and move JSON to ~/.gcloud/keyfile.json

### Configure github

#### Create secretes on github

https://github.com/xxx/[repo]/settings/secrets/new

- GCP_PROJECT: project name from GCP
- GCP_REGION: GCP region to deploy function
- GCP_SA_EMAIL: Service account email
- GCP_SA_KEY: (cat ~/.gcloud/keyfile.json | base64) encoded version of service account (downloaded from )
- SERVICE_NAME: serverless service name
- SERVICE_NAME_FUNCTION: serverless function name

### Configure environment variables

create .env with following content

```
GCP_REGION=
GCP_PROJECT=
CREDENTIALS_PATH=~/.gcloud/keyfile.json
```

### Update serverless configuration

update serverless.yml as follows

```
  runtime: nodejs10
  region: ${env:GCP_REGION}
  project: ${env:GCP_PROJECT}
  credentials: ${env:CREDENTIALS_PATH}
```

### Create Github workflows

create following files

1. .build/workflows/pull-request.yml

- Run CI and deploy function to Cloud functions once PR is raised
- eg `service-pr[number]-function`

2. .build/workflows/pull-request-cleanup.yml

- Delete cloud function and artifacts from GCP on PR is merged
- eg delete `service-pr[number]-function`

3. .build/workflows/master.yml

- Run CI and deploy function to Cloud functions when PR is merged or code is pushed into master/dev branch
- `service-master-function`

### Make google cloud function accessible by public

- By default serverless dont make deployed funciton public
- Added job in master.yml and pull-request.yml run after deploy job

```
  deploy_public:
    needs: [deploy]
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [10.16.x]
    name: make deployment public using ${{ matrix.node-version }}
    steps:
      - name: Authenticate into Google Cloud Platform
        uses: GoogleCloudPlatform/github-actions/setup-gcloud@master
        with:
          version: '276.0.0'
          service_account_email: ${{ secrets.GCP_SA_EMAIL }}
          service_account_key: ${{ secrets.GCP_SA_KEY }}

      - name: Extract branch name
        shell: bash
        run: echo "::set-env name=BRANCH_NAME::$(echo ${GITHUB_REF#refs/heads/} | sed 's/\//_/g')"

      - name: Make function public
        run: |
          gcloud functions add-iam-policy-binding ${{secrets.SERVICE_NAME}}-${BRANCH_NAME}-${{secrets.SERVICE_NAME_FUNCTION}} \
          --member="allUsers" \
          --role="roles/cloudfunctions.invoker" \
          --project ${{ secrets.GCP_PROJECT }} \
          --region ${{ secrets.GCP_REGION }}
```

## Setup express server

### install express

```bash
$ npm i express
$ npm i -D @types/express supertest
```

### Update function to support express

update index.ts as follows

```
import express from 'express';

const routeMain = express.Router({});

routeMain.get('/', function (req: any, res: any) {
  res.status(200).send('Hello World!');
});

routeMain.get('/webhook', function (req: any, res: any) {
  res.status(200).send('webhook');
});

export const http = routeMain;
```

### Update test to test express function

update tests/index.test.ts as follows

```
const request = require('supertest');
const index = require('../src/index');
const express = require('express');

const app = express();
app.use('/', index.http);

describe('GET /', () => {
 it('responds Hello World!', async (done) => {
   await request(app).get('/').expect(200, 'Hello World!');
   done();
 });
});

describe('GET /webhook', () => {
 it('responds webhook', async (done) => {
   await request(app).get('/webhook').expect(200, 'webhook');
   done();
 });
});

```
