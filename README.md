# Welcome to the Many-Words codebase!

## To run the code locally

### Many-Words itself

- clone the repository, then from the repository (you might need sudo to install webpack globally)

`npm run install:all`

- launch all services with docker:

`npm run docker-dev`

- if you are under linux, you can enjoy separated logs with:

`npm run docker-dev:detached`

For obvious security reasons, the app IDs and passwords are kept private, so you cannot test the logged in features with social auth as is. If you wish to do so, register private keys for development use with Google or Facebook.

### Dependencies

- make sure node.js and npm are properly installed, refer to :

https://nodejs.org/en/download/

- install nodemon if you don't have it already (hot reloading in development) :

`npm install -g nodemon`

- install mongodb locally :
  https://docs.mongodb.com/manual/installation/

- if you encounter errors with node-sass, this might help :

`sudo npm install --unsafe-perm -g node-sass`
