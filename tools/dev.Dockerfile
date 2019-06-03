FROM node:11.7.0

WORKDIR /
COPY ./package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "database_seeder"]