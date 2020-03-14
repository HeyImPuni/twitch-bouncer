#########
# Build #
#########
FROM node:13-alpine as build

WORKDIR /tmp/twitch-bouncer

COPY package*.json ./
COPY tsconfig.json .
COPY src/ src/

RUN npm install typescript
RUN npm run build

##############
# Production #
##############
FROM node:13-alpine

WORKDIR /opt/twitch-bouncer

COPY package*.json ./
COPY --from=build /tmp/twitch-bouncer/dist dist/
COPY .env .

RUN npm install

RUN chown node:node /opt/twitch-bouncer -R

USER node

CMD ["node", "dist/main.js"]
