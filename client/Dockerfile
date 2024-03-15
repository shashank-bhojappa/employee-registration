FROM node:14-alpine as build

# WORKDIR /dist/src/app

# COPY . .

# RUN npm install

# RUN npm run build

# # Serve Application using Nginx Server
# FROM nginx:1.20 as ngx

# COPY --from=build /dist/src/app/dist/client /usr/share/nginx/html

# EXPOSE 80


COPY . /dist/src/app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]




# RUN npm cache clean --force

# COPY . .

# RUN npm install

# RUN npm run build --prod

# FROM nginx:stable

# COPY --from=build /dist/src/app/dist/client /usr/share/nginx/html

# COPY /nginx.conf  /etc/nginx/conf.d/default.conf




