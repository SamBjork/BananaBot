const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");
const yts = require("yt-search");

const client = new Discord.Client();
const queue = new Map();

client.once("ready", () => {
  console.log("Banana signing up for duty!");
  client.user.setActivity(`Music & !help`, {
    type: "PLAYING",
  });
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}hi`)) {
    hello(message);
    return;
  } else if (message.content.startsWith(`${prefix}pause`)) {
    pause(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}resume`)) {
    resume(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}rate me baddy`)) {
    rate(message);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}gtfo`)) {
    leave(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}help`)) {
    help(message);
    return;
  } else if (message.content.startsWith(`${prefix}random`)) {
    random(message);
    return;
  } else if (message.content.startsWith(`${prefix}fuckyou`)) {
    fuckyou(message);
    return;
  } else if (message.content.startsWith(`${prefix}banana`)) {
    banana(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}rick`)) {
    rick(message, serverQueue);
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  let song;
  if (ytdl.validateURL(args[1])) {
    const { videos } = await yts(args.slice(1).join(" "));
    console.log("Trying 1");
    console.log(videos);
    if (!videos.length) {
      message.channel.send("No song or video found! Double check the URL!");
    }
    song = {
      title: videos[0].title,
      url: videos[0].url,
    };
    console.log(videos[0].title, videos[0].url);
    console.log(videos[0]);
  } else {
    const { videos } = await yts(args.slice(1).join(" "));
    console.log("Trying 2");

    if (!videos.length) {
      message.channel.send("No song or video found from search!");
    }
    if (videos[0] == undefined) {
      message.channel.send("It's a video!");
    }
    song = {
      title: videos[0].title,
      url: videos[0].url,
    };
    console.log(videos[0].title, videos[0].url);
    console.log(videos[0]);
  }

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

async function banana(message, serverQueue) {
  message.channel.send("Yeah. Here it is. Hold on to your banana.");
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }
  song = {
    title: "Naturbarn",
    url: "https://www.youtube.com/watch?v=uirUgpqXRg4",
  };
  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, song);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

async function rick(message, serverQueue) {
  message.channel.send("***YOU'RE GETTING RICK ROLLED!***");
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }
  song = {
    title: "!RICK ROLL! :D",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  };
  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 17,
      playing: true,
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, song);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function pause(message, serverQueue) {
  message.channel.send("Pausing the music, dear banana buyer. <3");
  serverQueue.connection.dispatcher.pause();
}

function resume(message, serverQueue) {
  message.channel.send("Resuming the music, dear banana buyer. <3");
  serverQueue.connection.dispatcher.resume();
}

function fuckyou(message) {
  switch ((number = Math.floor(Math.random() * 1))) {
    case 0:
      number = 0;
      message.channel.send(
        "Alright. Alright.. Jeez sorry. I was just doing my banana duty."
      );
      break;
    case 1:
      number = 1;
      message.channel.send(
        "** HEY! No talk like that here in our banana land! But I Understand Your Feelings!**"
      );
      break;
  }
}

function hello(message) {
  switch ((number = Math.floor(Math.random() * 4))) {
    case 0:
      number = 0;
      message.channel.send("Oh, Hello there!");
      break;
    case 1:
      number = 1;
      message.channel.send(
        "*nom nom* HI! U WANT SOME BANANA?? ITS COCAINE IN IT! I MEAN ITS NOOT ANY COCAINE IN THIS BANANA. **Yes there is**"
      );
      break;
    case 2:
      number = 2;
      message.channel.send(
        "Top of the mornin' to you! Or night! Or Midday. Or rather:" + Date()
      );
      break;
    case 3:
      number = 3;
      message.channel.send(
        "Hola! Como estas?.. Que?. ¿No sabías que todos los plátanos pueden hablar español?"
      );
      break;
    case 4:
      number = 4;
      message.channel.send(
        "Oh hi, it's so good that you came! **sobbing** I.. I.. killed a fair-trade banana!..**sobbing** There's yellow mush all over!!... I hear the police coming down the street!... WHaT DO We DO???"
      );
      break;
  }
}

function rate(message) {
  message.channel.send("Alright, I'll rate you on a scale of 1-10");
  switch ((number = Math.floor(Math.random() * 10))) {
    case 0:
      number = 0;
      message.channel.send(
        "Ughhh... You get 0/10.. You're no banana. No banana at all.."
      );
      break;
    case 1:
      number = 1;
      message.channel.send(
        "Well I mean.. you get 1/10.. You're like the least good banana in the basket."
      );
      break;
    case 2:
      number = 2;
      message.channel.send("Hmmm. 2/10. Like, I'd do you. For money..");
      break;
    case 3:
      number = 3;
      message.channel.send(
        "3/10, I could introduce you to my grandmother?.. She's an old sweet banana with enough spots to prove that she's been around."
      );
      break;
    case 4:
      number = 4;
      message.channel.send(
        "since.. You're a 4/10.. *hick* and I *hick* am feeling good right now.. We.. could.. *hick* have some.. Coitus reservatus.. If you *hick* know what I mean. ;)"
      );
      break;
    case 5:
      number = 5;
      message.channel.send(
        "So.. I'll just say it.. You're 5/10. Nobody's going to throw their banana at you, but some years down the road. Someone might think: Eh. You're fine"
      );
      break;
    case 6:
      number = 6;
      message.channel.send(
        "Mmm. Yeah, I mean. Sure. 6/10. In a good light you look like a 7. Good for you."
      );
      break;
    case 7:
      number = 7;
      message.channel.send(
        "Oh hey there. Clocking out at a 7/10 there, cowboy.. Or cowgirl.. Or cowperson.?+09982+opl banana pk error 403"
      );
      break;
    case 8:
      number = 8;
      message.channel.send(
        "It's a nice day to see someone this pretty. 8/10. I'd say yes to you in an instant. <3"
      );
      break;
    case 9:
      number = 9;
      message.channel.send(
        "Hey.. How you doin'? 9/10. Is it getting hot in here? I'll just start peeling myself off a little."
      );
      break;
    case 10:
      number = 10;
      message.channel.send(
        "There you are. The ultimate. The best. The finest and absolutely just the image of God. 10/10. You make my little banana heart pump like never before."
      );
      break;
    case 11:
      number = 11;
      message.channel.send(
        "I... I... I can't believe it.. How is it possible... 11/10. That should not be possible.. You are.. **The chosen one.**"
      );
      break;
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  message.channel.send(
    "The song is skipped! (Not necessarily because it was bad!)"
  );
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );

  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");

  serverQueue.songs = [];
  message.channel.send("The song is stopped! CD style!");
  serverQueue.connection.dispatcher.end();
}

function leave(message, serverQueue) {
  message.channel.send("Sheesh.. Okay, I'll leave then..");
  serverQueue.voiceChannel.leave();
  queue.delete(message.guild.id);
  return;
}

function random(message) {
  const randomFacts = [
    "Cats say meow",
    "Dogs go bark",
    "Foxes go ring-ding-ding",
  ];
  message.channel.send(
    randomFacts[Math.floor(Math.random() * randomFacts.length)]
  );
}

function help(message) {
  message.channel.send(
    "**!play** to poke a stick at bananbot and make him play a song. Either enter a search term or a URL\n" +
      "**!skip** to slap his little banana face and make him skip the current song\n" +
      "**!pause** to put your hand on his banana mouth and make him pause the current song\n" +
      "**!resume** to remove your hand from his banana mouth and make him resume the current song\n" +
      "**!stop** to put a gag in his little banana mouth to make him stop the music (essentially killing the vibe)\n" +
      "**!gtfo** to make bananabot pack his little fucking backpack and leave the voice channel :)\n" +
      "**!hi** to say hello to bananabot. It's alright to be nice sometimes.\n" +
      "**!rate me baddy** to get bananabot to rate you. As you are. In his bananabot eyes.\n" +
      "**!random** to ask bananabot to give you some random fact. He's crazy tho so don't take it too seriously\n" +
      "**!fuckyou** to tell bananabot off! To stand up for yourself and let him have it!\n" +
      "**!banana** to let bananabot show you the origins from where he came and where it all began..."
  );
  return;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    setTimeout(function () {
      serverQueue.voiceChannel.leave();
    }, 10000000);
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue);
  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

client.login(token);
