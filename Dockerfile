FROM node:16

WORKDIR ./

COPY package*.json ./

RUN npm install --force

COPY ./ ./

RUN npm run build

EXPOSE 3000
