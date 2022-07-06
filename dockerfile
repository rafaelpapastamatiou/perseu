FROM node:16

WORKDIR /usr/src/app

COPY ./start-docker.sh .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait

RUN chmod +x /wait && \
    chmod +x ./start-docker.sh && \
    apt-get update && \
    apt-get install -y netcat

EXPOSE 4000