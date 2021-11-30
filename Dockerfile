FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# install app dependencies
# a wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# building for prod so using produiction flag
RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
