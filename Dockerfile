FROM node:16-alpine as base

RUN mkdir /app
COPY package.json jest.config.js yarn.lock tsconfig.json app/

COPY src/ /app/src
WORKDIR /app

RUN rm -rf node_modules && yarn install --frozen-lockfile

from base as test
CMD yarn jest --passWithNoTests

from base as build
RUN yarn build

from build as start
CMD ["node", "./build/main/src/index.js"]