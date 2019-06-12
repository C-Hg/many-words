FROM node:11.7.0

WORKDIR /server/
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001

# Mongo must be ready when server.js start, we cannot retry connection because of connect-mongodb-session
CMD ["./delay_startup.sh", "npm", "start"]