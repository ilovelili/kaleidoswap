# Stage 0, compile angular
FROM node:12.18 as builder

# install yarn
RUN apt-get update -y
RUN apt-get install apt-transport-https -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y
RUN apt-get install yarn -y

WORKDIR /app

COPY nginx.conf /nginx.conf
COPY package*.json /app/
COPY /patches/ /app/patches/

RUN yarn

COPY ./ /app/

RUN yarn build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=builder /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf