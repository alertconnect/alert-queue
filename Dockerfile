FROM node:12.18.2-alpine3.12

WORKDIR /api

COPY package.json .
COPY yarn.lock .
COPY .npmrc .

ARG GITHUB_PKG_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=\${GITHUB_PKG_TOKEN}" >> .npmrc && \
    yarn --frozen-lockfile

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]
