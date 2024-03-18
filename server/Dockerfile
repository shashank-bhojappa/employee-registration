FROM node:18-alpine

WORKDIR /usr/src/app 

COPY . .

WORKDIR /usr/src/app/server 

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]