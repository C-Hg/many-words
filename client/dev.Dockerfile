FROM node:11.7.0

WORKDIR /client/
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start"]