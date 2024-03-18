FROM node:lts-bullseye-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y curl \
    && apt-get upgrade -y \
    && apt-get clean

COPY package*.json ./

COPY .env ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
