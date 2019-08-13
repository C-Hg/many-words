FROM node:12.8.0

WORKDIR /
COPY ./package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "database_seeder"]