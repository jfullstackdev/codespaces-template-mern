FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Install MySQL client, Redis CLI, mongosh, and MongoDB database tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        default-mysql-client \
        git \
        gnupg \
        lsb-release \
        procps \
        redis-tools \
        wget && \
    wget https://downloads.mongodb.com/compass/mongosh-2.1.1-linux-x64.tgz && \
    tar -zxvf mongosh-2.1.1-linux-x64.tgz && \
    cp -R mongosh-2.1.1-linux-x64/bin/* /usr/local/bin/ && \
    rm -rf mongosh-2.1.1-linux-x64.tgz mongosh-2.1.1-linux-x64 && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /etc/apt/keyrings/mongodb.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/mongodb.gpg] http://repo.mongodb.org/apt/debian $(lsb_release -cs)/mongodb-org/7.0 main" | \
    tee /etc/apt/sources.list.d/mongodb-org-7.0.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends mongodb-database-tools && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g nodemon@3.0.2 typescript@5.4.5 ts-node@10.9.2 concurrently@8.2.2

ENV SHELL=/bin/bash
WORKDIR /workspace
