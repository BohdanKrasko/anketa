FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src src/
COPY config/server.json config/server.json 

EXPOSE 8000

CMD [ "node", "src/index.js" ]


# docker build -t kraskobohdan/irc:server .