# Node.js stage (Build)
FROM node:16-alpine as build-stage-node-16

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY ./ /usr/src/app

RUN npm run build

# Nginx stage
FROM nginx:alpine

COPY --from=build-stage-node-16 /usr/src/app/build/ /usr/share/nginx/html
