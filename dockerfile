# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:18

RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    libnss3-dev \
    libasound2 \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libatspi2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libgtk-3-0 \
    libpango-1.0-0 \
    libcairo2 \
    libgdk-pixbuf2.0-0 \
    libdbus-glib-1-2 \
    libxt6

    
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
