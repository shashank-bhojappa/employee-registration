FROM node:18-alpine as build

WORKDIR /dist/src/app

# COPY . .

# RUN npm install

# RUN npm run build

# # Serve Application using Nginx Server
# FROM nginx:1.20 as ngx

# COPY --from=build /dist/src/app/dist/client /usr/share/nginx/html

# EXPOSE 80


# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 80

# CMD ["npm", "start"]



COPY . .

FROM nginx:stable

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /dist/src/app/dist/client /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 4200




