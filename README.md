# Welcome to the Many-Words codebase!

## To run the containers locally
- this assumes you have npm, docker and docker-compose installed

- clone the repository, then from the repository

`npm run install:all`

- launch all services with docker:

`npm run dev`

- if you are under linux, you can enjoy separated logs with:

`npm run dev:detached`

## Local environment
The setup uses https locally. Allow chrome://flags/#allow-insecure-localhost in chrome browser to enable fetch with a self-signed certificate.
If graphql codegen fails due to the self-signed certificate, set this env variable in your shell: `export NODE_TLS_REJECT_UNAUTHORIZED=0`
