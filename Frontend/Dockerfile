## FRONTEND ##

# Base image
FROM node:22

# Metadata
LABEL maintainer="kshitijka"
LABEL version=1.0
LABEL description="Skycrate is a web based file management system that uses Hadoop as filesystem."

# Update & upgrade & rm
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/* && npm install -g http-server

# Create non-root user
RUN useradd -s /bin/bash skycrateFront

# Create work dir
RUN mkdir /app
RUN chown -R skycrateFront:skycrateFront /app
COPY ./dist/ /app
WORKDIR /app

# Switch user
USER skycrateFront

EXPOSE 8080

CMD ["http-server", "/app"]
