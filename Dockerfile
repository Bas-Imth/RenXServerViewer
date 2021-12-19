FROM node:latest

RUN mkdir -p /usr/src/stat
WORKDIR /usr/src/stat

COPY package.json /usr/src/stat
RUN npm install

COPY . /usr/src/stat

CMD ["node", "app.js"]