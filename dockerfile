FROM node:16

WORKDIR /usr/src/app

COPY ./wait-for-it.sh .

RUN apt-get update && \
    apt-get install -y netcat && \
    chmod +x ./wait-for-it.sh

EXPOSE 3000