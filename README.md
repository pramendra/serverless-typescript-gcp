# Serverless typescript gcp

## About the Project

Express server using serverless deployed on GCP using github actions CI/CD

### Summary

- Bootstrap app using google-nodejs template, nvm
- Setup using dotenv, typescript, format, eslint, VSCode, husky, jest
- Setup dev env using nodemon, copper and local tunnel
- CI/CD using Github Action (lint, test, deploy)
- Setup express server

## Setup development

### Change node version to match cloud functions's node version

```bash
$ nvm use
```

### Install node packge

```bash
$ npm install
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
