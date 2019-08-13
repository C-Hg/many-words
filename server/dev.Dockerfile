FROM node:12.8.0

WORKDIR /server/
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "npm", "run", "start" ]