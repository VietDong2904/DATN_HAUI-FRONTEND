FROM node:alpine AS build

WORKDIR /opt

RUN npm install yarn

COPY .nvmrc package.json package-lock.json yarn.lock ./

# RUN yarn install
RUN yarn install
# RUN yarn install --prefer-offline --frozen-lockfile

COPY . ./

# RUN mv src/environments/environment.docker.ts src/environments/environment.prod.ts

RUN npm run build --prod

FROM nginx

COPY default.conf /etc/nginx/config.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /opt/dist /usr/share/nginx/html

RUN  ["rm", "-rf", "/etc/localtime"]

RUN  ["ln", "-s", "/usr/share/zoneinfo/Asia/Ho_Chi_Minh", "/etc/localtime"]