FROM node:20.14.0-slim

# Set the timezone
ENV TZ Europe/Rome

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn --frozen-lockfile

# Bundle app source
COPY . .

# Start the app
CMD [ "yarn", "start" ]
