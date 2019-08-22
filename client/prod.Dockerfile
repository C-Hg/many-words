FROM node:12.8.0

WORKDIR /client/
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "build"]