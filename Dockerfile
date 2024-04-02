FROM node:16-alpine

ENV TZ Europe/Rome

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

CMD [ "yarn", "start" ]
