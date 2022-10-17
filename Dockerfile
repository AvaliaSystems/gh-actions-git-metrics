FROM node:16.18.0-alpine3.15

COPY package*.json ./
RUN npm install
COPY . .

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
