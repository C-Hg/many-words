FROM node:11.7.0

WORKDIR /server/
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "npm", "run", "dev" ]