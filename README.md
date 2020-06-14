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

#### update following in serverless.yam

```bash
plugins:
  - serverless-google-cloudfunctions
  - serverless-dotenv-plugin
```
