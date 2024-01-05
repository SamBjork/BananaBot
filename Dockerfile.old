FROM node:18-alpine AS BUILD
# Install Python for node-gyp
RUN apk add --no-cache python3 py3-pip

# Create a symbolic link for python
RUN ln -sf python3 /usr/bin/python

# Rest of your Dockerfile commands
WORKDIR /build
COPY . /build
RUN rm -r Procfile LICENSE README.md
RUN npm install --production
# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install
RUN npm install node@latest
RUN npm install node-opus

COPY . /usr/src/bot

# Start the bot.
CMD ["node", "index.js"]
WORKDIR /build
COPY . /build
RUN rm -r Procfile LICENSE README.md
RUN npm install --production

FROM node:18-alpine
LABEL MAINTAINER="Nizeic" DESCRIPTION="A music bot written using discord.js and discord-player"
WORKDIR /bot
COPY --from=BUILD /usr/lib/ /usr/lib/
COPY --from=BUILD /lib/ /lib/
COPY --from=BUILD /build/ /bot
ENV NODE_ENV production
CMD ["node", " index.js"]