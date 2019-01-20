# Welcome to the Many-Words codebase!

## To run the code locally

### Dependencies
* make sure node.js and npm are properly installed, refer to : 

https://nodejs.org/en/download/
* install nodemon if you don't have it already (hot reloading in development) :

npm install -g nodemon
* install mongodb locally :
https://docs.mongodb.com/manual/installation/
then run it: 

sudo service mongod start

### Many-Words itself
* clone the repository, then from the repository

npm run install:all
* seed the database :

npm run seeder

For obvious security reasons, the app IDs and passwords are kept private, so you cannot for now test the logged in features with social auth.
