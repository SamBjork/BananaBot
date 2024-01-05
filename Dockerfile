FROM node:16-alpine AS BUILD

# Install Python and build essentials
RUN apk add --no-cache python3 py3-pip build-base

# Create a symbolic link for python
RUN ln -sf python3 /usr/bin/python

# Rest of your Dockerfile commands
WORKDIR /build
COPY . /build
RUN rm -r Procfile LICENSE README.md
RUN npm install --production

# Rest of the Dockerfile for the final image
FROM node:16-alpine
LABEL MAINTAINER="Nizeic" DESCRIPTION="A music bot written using discord.js and discord-player"
WORKDIR /bot
COPY --from=BUILD /usr/lib/ /usr/lib/
COPY --from=BUILD /lib/ /lib/
COPY --from=BUILD /build/ /bot
ENV NODE_ENV production
CMD ["node", " index.js"]