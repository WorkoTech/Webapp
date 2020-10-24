# BUILDING CONTAINER
FROM node:10.15.0

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json .
RUN npm install

# BUILD
ADD . .
RUN npm run build


# SERVING CONTAINER
FROM nginx:1.17.7

COPY --from=0 /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html
