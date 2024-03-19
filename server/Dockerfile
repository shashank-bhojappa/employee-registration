FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install npm@9.9.3

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]