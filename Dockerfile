FROM node:16-alpine AS BUILD
# Create the bot's directory
# RUN mkdir -p /usr/src/bot
# WORKDIR /usr/src/bot

# COPY package.json /usr/src/bot
# RUN npm install
# RUN npm install node@latest
# RUN npm install node-opus

# COPY . /usr/src/bot

# # Start the bot.
# CMD ["node", "index.js"]
WORKDIR /build
COPY . /build
RUN rm -r Procfile LICENSE README.md
RUN npm install --production

FROM node:16-alpine
LABEL MAINTAINER="Nizeic" DESCRIPTION="A music bot written using discord.js and discord-player"
WORKDIR /bot
COPY --from=BUILD /usr/lib/ /usr/lib/
COPY --from=BUILD /lib/ /lib/
COPY --from=BUILD /build/ /bot
ENV NODE_ENV production
CMD ["node", " index.js"]