FROM node:13-alpine

ENV NODE_ENV dev

WORKDIR /opt/twitch-bouncer

COPY package.json .
COPY tsconfig.json .
COPY src/ .
COPY .env .

RUN npm install

RUN npm run build

COPY ./dist/ ./dist/

RUN chown node:node /opt/twitch-bouncer -R

USER node

CMD ["node", "dist/main.js"]
