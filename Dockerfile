FROM node:16.18.0-alpine3.15

COPY src/package*.json ./src/
RUN cd src && npm install
COPY src/ src/

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
