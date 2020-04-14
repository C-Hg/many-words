FROM node:13.12.0-alpine

WORKDIR /web-app/
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . ./

EXPOSE 3000
EXPOSE 35729
CMD ["npm", "start"]