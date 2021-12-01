FROM node:14.16.1

LABEL version="v:1.0"
LABEL description="This is the base docker image for the medicords client side REACT app"

WORKDIR /client
COPY package.json /client/
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm","start"]