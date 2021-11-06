FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY public public/
COPY src src/

RUN npm run build 
# RUN yarn global add serve
RUN npm i -g serve

EXPOSE 3000
CMD serve -s build