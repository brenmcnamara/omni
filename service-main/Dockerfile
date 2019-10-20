# References for designing nodejs dockerfile:
#  - https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
#  - http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/

FROM node:12.12.0-alpine

WORKDIR /usr/app

RUN apk add yarn

COPY package*.json ./

COPY yarn.lock ./

COPY .npmrc ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start-server"]
