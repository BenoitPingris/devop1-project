FROM node:14.11.0-stretch-slim

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . ./
COPY wait-for-it.sh /

EXPOSE 3000
CMD /wait-for-it.sh db:3306 -t 5 -- node .