FROM node:16.18.0-alpine3.15

RUN apk add git

COPY src/package*.json /avalia/src/
RUN cd /avalia/src && npm install && cd /
COPY src/ /avalia/src/

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
