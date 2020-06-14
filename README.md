# Serverless typescript gcp
## About the Project
Express server using serverless deployed on GCP using github actions CI/CD 

### Summary
* Bootstrap app using google-nodejs template, nvm
* Setup using dotenv, typescript, format, eslint, VSCode, jest, husky
* Setup dev env using nodemon, copper and local tunnel
* CI/CD using Github Action (lint, test, deploy)
* Setup express server

## Tutorial (Step by step)

### Bootstrap app using google-nodejs template
```bash
$ mkdir serverless-typescript-gcp && $_
$ npx serverless create --template google-nodejs
``` 