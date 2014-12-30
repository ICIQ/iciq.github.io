## Build environment for compiling Bootstrap >= 3.0.0 (Node.js / SASS environment)

FROM ubuntu:14.04

RUN apt-get update \
  && apt-get -y install \
    git \
    libxml2-dev \
    libxslt1-dev \
    libcurl4-openssl-dev \
    make \
    software-properties-common \
  && add-apt-repository ppa:chris-lea/node.js \
  && apt-get update \
  && apt-get -y install \
    python \
    python-software-properties \
    g++ \
    make \
    nodejs 

COPY . /bootstrap/
WORKDIR bootstrap

RUN npm install -g grunt-cli \
  && npm install 

CMD make css

