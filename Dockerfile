FROM node:16

WORKDIR ./

COPY package*.json ./

RUN npm install --force

COPY ./ ./

RUN NODE_OPTIONS="--max-old-space-size=8192" npm run build


EXPOSE 3000
