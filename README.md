# Serverless typescript gcp
## About the Project
Express server using serverless deployed on GCP using github actions CI/CD 

### Summary
* Bootstrap app using google-nodejs template, nvm
* Setup using dotenv, typescript, format, eslint, VSCode, jest, husky
* Setup dev env using nodemon, copper and local tunnel
* CI/CD using Github Action (lint, test, deploy)
* Setup express server

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