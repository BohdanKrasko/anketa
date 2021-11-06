FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY public public/
COPY src src/
ENV PORT=80
RUN npm run build 
RUN yarn global add serve

EXPOSE 80
CMD serve -s build