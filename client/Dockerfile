FROM node:14.16.1 as build
WORKDIR /client
COPY package.json /client/
RUN npm install --silent
COPY . .
RUN npm run build


#Nginx 
FROM nginx:stable-alpine as stage
COPY --from=build /client/build /usr/share/nginx/html
EXPOSE 80
RUN ["nginx","-g","daemon off"]
