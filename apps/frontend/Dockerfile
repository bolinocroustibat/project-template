##################
# DEFAULT PRODUCTION
#################
ARG NODE_VERSION=18-alpine
ARG NODE_ENV=production
ARG PORT=8080

##################
# BUILD
#################
FROM node:${NODE_VERSION} as build
RUN apk update && apk add yarn && rm -rf /var/cache/apk/* > /dev/null 2>&1

WORKDIR /opt/
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn install

WORKDIR /opt/app
COPY ./ ./

RUN yarn build


##################
# DEVELOPMENT
#################
FROM node:${NODE_VERSION} as development
RUN apk update && apk add yarn

WORKDIR /opt/app
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn install
COPY ./ ./

RUN chmod 775 /opt/app

EXPOSE ${PORT}

CMD ["yarn", "develop"]


##################
# PRODUCTION
#################
FROM nginx:stable-alpine as production

COPY --from=build /opt/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/config.template

ENV HOST 0.0.0.0
EXPOSE ${PORT}

CMD sh -c "envsubst < /etc/nginx/conf.d/config.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

##################
# RUNNER
#################
FROM ${NODE_ENV} as runner
