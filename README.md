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