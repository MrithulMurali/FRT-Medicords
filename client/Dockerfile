FROM node:14.16.1 as build
WORKDIR /client
COPY package.json /client/
RUN npm install --production --silent
COPY . .
EXPOSE 3000
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /client/build/ /usr/share/nginx/html
COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf
