FROM node:12.6.0-slim
RUN apt-get update \
      && apt-get install -y --no-install-recommends \
      g++ \
      && rm -rf /var/lib/apt/lists/*
RUN yarn global add nodemon
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir /home/node/app
ADD ./package.json /home/node

WORKDIR /home/node
RUN yarn install


EXPOSE 3000