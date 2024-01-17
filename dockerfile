# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:18
# Create app directory
WORKDIR /usr/src/bot

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY dockerfile ./

# Install dependencies, including 'node-gyp' for any binary packages
RUN npm install

# If you are building your code for production, use the following instead
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Start the bot
CMD [ "node", "src/index.js" ]
