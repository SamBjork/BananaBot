FROM node:14.16.1

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install
RUN npm install node@14.16.1
RUN npm install node-opus

COPY . /usr/src/bot

# Start the bot.
CMD ["node", "b.js"]