FROM node:14.16.1
WORKDIR /server
COPY package.json /server/
RUN npm install --silent
COPY . .
CMD ["npm","start"]