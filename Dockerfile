FROM node:16

WORKDIR ./

COPY package*.json ./

RUN npm install --force

COPY ./ ./

RUN npm run build

RUN npm run migration:up
RUN npm run seed:run

EXPOSE 3000

CMD [ "npm", "start" ]
