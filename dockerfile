FROM node:16

WORKDIR /usr/src/app

COPY ./wait-for-it.sh .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

RUN apt-get update && \
    apt-get install -y netcat && \
    chmod +x ./wait-for-it.sh

EXPOSE 3000