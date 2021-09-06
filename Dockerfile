FROM node:14 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:1.16.0-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

