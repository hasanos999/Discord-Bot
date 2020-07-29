
const { GOOGLE_API_KEY } = require("./anahtarlar.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const YouTube = require("simple-youtube-api");
const queue = new Map();
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`Bot pingi ${client.ping} ms. olarak ölçüldü...`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const token = ayarlar.token;
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require("ytdl-core");
const prefix = ayarlar.prefix;
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
require("./util/eventLoader")(client);
const chalk = require("chalk");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const db = require("quick.db");
require("./util/eventLoader.js")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");

client.on("message", async msg => {
  if (msg.author.bot) return false;
  if (!msg.content.startsWith(prefix)) return false;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.split(" ")[0].slice(ayarlar.prefix.length);
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8")); 

  //command = command.slice(prefix.length)

  if (command === "çal") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("#bf2e41")
          .setDescription(
            "❌ | **Sesli bir kanala giriş yapmalısın !**"
          )
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("#bf2e41")
          .setTitle(
            "❌ | **Sesli bir kanala giriş yapmalısın !**"
          )
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("#bf2e41")
          .setTitle(
            "❌ | **Şarkı başlatılamadı. Lütfen mikrofonumu açınız !**"
          )
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel
        .sendEmbed(new Discord.RichEmbed())
        .setTitle(
          `✅ | **${playlist.title}** adlı şarkı başarıyla kuyruğa eklendi !`
        );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 5);
          let index = 0;
          msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setTitle(
                `${client.user.username} | Şarkı Seçimi`,
                client.user.avarURL
              )
              .setThumbnail(client.user.avatarURL)
              .setDescription(
                `${videos
                  .map(video2 => `**${++index} -** ${video2.title}`)
                  .join("\n")}`
              )
              .setFooter("Lütfen 10 saniye içinde 1-5 arası bir sayı seçiniz !")
              .setColor("#bf2e41")
          );
          msg.delete(5000);
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.sendEmbed(
              new Discord.RichEmbed()
                .setColor("#bf2e41")
                .setDescription(
                  "❌ | **Şarkı numarası belirtmediğiniz için seçim iptal edilmiştir !**"
                )
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setColor("#bf2e41")
              .setDescription(
                "❌  **Arattırdığınız sonuç bulunamadı !**"
              )
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "geç") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("#bf2e41")
            .setDescription(
              " ❌ | **Sesli bir kanala giriş yapmalısın !**"
            )
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("#bf2e41")
          .setTitle(
            "❌ | **Hiç Bir Müzik Çalmamakta**"
          )
      );
    serverQueue.connection.dispatcher.end(
      "✅ | **Oynatılan müzik geçildi !**"
    );
    return undefined;
  } else if (command === "kapat") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("#bf2e41")
            .setDescription(
              "❌ | **Sesli bir kanala giriş yapmalısın !**"
            )
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("#bf2e41")
          .setTitle(
            "❌  **Hiç bir müzik çalmıyor !**"
          )
      );
    msg.channel.send(
      `✅ | **Oynatılan müzik kapatıldı !**`
    );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end(
      "✅ | **Oynatılan müzik bitti !**"
    );
    return undefined;
  } else if (command === "ses") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("#bf2e41")
            .setDescription(
              "❌ | **Sesli bir kanala giriş yapmalısın !**"
            )
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("#bf2e41")
          .setTitle("❌ | **Hiç bir müzik çalmıyor !**")
      );
    if (!args[1])
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(
            `❗ | Ses seviyesi: **${serverQueue.volume}**`
          )
          .setColor("#bf2e41")
      );
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(
          `🤖 | Ayarlanan ses seviyesi: **${
            args[1]
          }**`
        )
        .setColor("#bf2e41")
    );
    /////////////////////////////////////////////////

    /////////////////////////////////////////////
  } else if (command === "çalan") {
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(
            "❌ | **Hiç bir müzik çalmıyor !**"
          )
          .setColor("#bf2e41")
      );
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setColor("#bf2e41")
        .setTitle(`${client.user.username} | Çalan`)
        .addField(
          "Başlık",
          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`,
          true
        )
        .addField(
          "Süre",
          `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`,
          true
        )
    );
  } else if (command === "kuyruk") {
    let index = 0;
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("❌ | **Kuyrukta müzik yok !**")
          .setColor("#bf2e41")
      );
    return msg.channel
      .sendEmbed(
        new Discord.RichEmbed()
          .setColor("#bf2e41")
          .setTitle(`${client.user.username} | Şarkı Kuyruğu`)
          .setDescription(
            `${serverQueue.songs
              .map(song => `**${++index} -** ${song.title}`)
              .join("\n")}`
          )
      )
      .addField("Şu anda çalınan: " + `${serverQueue.songs[0].title}`);
  } else if (command === "durdur") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(":pause_button: | **Çalan müzik durduruldu !**")
          .setColor("#bf2e41")
      );
    }
    return msg.channel.send(
      "❌ | **Hiç bir müzik çalmıyor !**"
    );
  } else if (command === "devam") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(":arrow_forward: | **Müzik başarıyla devam ettiriliyor !**")
          .setColor("#bf2e41")
      );
    }
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle("❌ | **Hiç bir müzik çalmıyor !**")
        .setColor("#bf2e41")
    );
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    views: video.views,
    best: video.channel.title,
    loop: true
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 3,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(
        `❌ | Şarkı sisteminde hata var ! **${error}**`
      );
      queue.delete(msg.guild.id);
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(
            `❌ | Şarkı sisteminde hata var ! **${error}**`
          )
          .setColor("#bf2e41")
      );
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(
          `✅ | **${song.title}** adlı müziği kuyruğa ekledim !`
        )
        .setColor("#bf2e41")
    );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "❌ | Akış hızı **yetersiz !**")
        console.log("Müzik Bitti.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.sendEmbed(
    new Discord.RichEmbed()
      .setTitle(
        `**${client.user.username} | 🎙 Müzik Başladı**`,
        `https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`
      )
      .setThumbnail(
        `https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`
      )
      .addField("\nŞarkı İsmi", `[${song.title}](${song.url})`, true)
      .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
      .addField("Süre", `${song.durationm}:${song.durations}`, true)
      .addField(
        "Video Link",
        `https://www.youtube.com/watch?v=${song.id}`,
        true
      )
      .addField("Kanal İsmi", `${song.best}`, true)
      .setColor("#bf2e41")
  );
}

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komutlar: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

//EKSTRA KODLAR BU TARAFLARA EKLENECEK!

client.login(ayarlar.token);

////

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('**Aleyküm Selam,  Hoş Geldin!**'); 
		} else {
		msg.reply('Aleyküm selam, hoş geldin ^^');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selam') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('**Aleyküm Selam,  Hoş Geldin!**'); 
		} else {
		msg.reply('Aleyküm selam, hoş geldin ^^');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sea') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('**Aleyküm Selam,  Hoş Geldin!**'); 
		} else {
		msg.reply('Aleyküm selam, hoş geldin ^^');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selamun aleyküm') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('**Aleyküm Selam,  Hoş Geldin!**'); 
		} else {
		msg.reply('Aleyküm selam, hoş geldin ^^');
		}
	}
});

///

client.on("message", msg => {
  var dm = client.channels.get("724503610867712061"); //mesajın geleceği kanal idsi//
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.RichEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("BLUE")
      .setThumbnail(`${msg.author.avatarURL}`)
      .addField(":boy: Gönderen ", msg.author.tag)
      .addField(":id:  Gönderen ID :", msg.author.id)
      .addField(":globe_with_meridians: Gönderilen Mesaj", msg.content);
 
    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});
 

///



///

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sil') {
    if (msg.channel.type === 'dm') {
      const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xdcff00)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(':x:**UYARI**:x:', 'Bu komutu özel mesajlarda kullanamazsın.')
    .setFooter(``)
      msg.author.sendEmbed(ozelmesajuyari); }
      if (msg.channel.type !== 'dm') {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
          if (msg.author.id !== ayarlar.yapimci) {
            const mesajlariyonet = new Discord.RichEmbed()
          .setColor(0xFF0000)
          .setTimestamp()
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .addField(':x:**UYARI**:x:', 'Bu komutu kulllanmak için `Mesajları Yönet` iznine sahip olmalısın.')
          return msg.author.sendEmbed(mesajlariyonet);
      }}
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100); 
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100); 
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      msg.channel.bulkDelete(100);
      const sohbetsilindi = new Discord.RichEmbed()
    .setColor(0x35ff00)
    .setTimestamp()
    .addField('Eylem:', '**Sohbet silme**')
    .addField('Yetkili:', '` ' + msg.author.username + '`')
    .addField('Silinen Mesaj Sayısı:', '»'+ '  **10000**  ' + '«')
    .addField('Sonuç:', '`Başarılı`'+ ' :white_check_mark:  ')
    .setFooter(``)
    return msg.channel.sendEmbed(sohbetsilindi).then(msg => msg.delete(3000));
}}});

//
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('Otorol Sistemi')
    .setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `)
.setColor("GREEN")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(616648524440010765);
    giriscikiskanali.send(`:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)

});

//

client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "stattemizle") {
  if (!message.guild.channels.find(channel => channel.name === "|▬▬|  Sunucu İstatistik  |▬▬|")) return message.channel.send(" İstatistik ayarlanmamış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
      const a = message.guild.channels.find(channel => channel.name === "|▬▬|  Sunucu İstatistik |▬▬|").delete()
      if(!a) return console.log("guildStats")
      const b = message.guild.channels.find(channel => channel.name === `Üye Sayısı: ${message.guild.memberCount}`).delete()
      if(!b) return console.log("guildStatsMember")
      const c = message.guild.channels.find(channel => channel.name === `Bot Sayısı: ${message.guild.members.filter(m => m.user.bot).size}`).delete()
      if(!c) return console.log("guildStatsBot")
      const d = message.guild.channels.find(channel => channel.name === `Kanal Sayısı  : ${message.guild.channels.size}`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!d) return console.log("guildStatsChannel")
      message.channel.send(" Kanallar temizlendi.")
    }
  if (command === "statayarla") {
  if (message.guild.channels.find(channel => channel.name === "|▬▬|  ❧𝓢𝓾𝓷𝓾𝓬𝓾 𝓘𝓼𝓽𝓪𝓽𝓲𝓼𝓽𝓲𝓴  |▬▬|")) return message.channel.send(" Zaten istatistik ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
  message.channel.send(`Kategori ve kanal kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('|▬▬|  ❧𝓢𝓾𝓷𝓾𝓬𝓾 𝓘𝓼𝓽𝓪𝓽𝓲𝓼𝓽𝓲𝓴  |▬▬|', 'category', [{
  id: message.guild.id,
  deny: ['CONNECT'],
  deny: ['VIEW_CHANNEL']
}]);

 message.guild.createChannel(`Ü𝔂𝓮 𝓼𝓪𝔂𝓲𝓼𝓲: ${message.guild.memberCount}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|  ❧𝓢𝓾𝓷𝓾𝓬𝓾 𝓘𝓼𝓽𝓪𝓽𝓲𝓼𝓽𝓲𝓴  |▬▬|")));
 message.guild.createChannel(`𝓑𝓸𝓽 𝓼𝓪𝔂𝓲𝓼𝓲: ${message.guild.members.filter(m => m.user.bot).size}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|  ❧𝓢𝓾𝓷𝓾𝓬𝓾 𝓘𝓼𝓽𝓪𝓽𝓲𝓼𝓽𝓲𝓴  |▬▬|")));
message.guild.createChannel(`𝓚𝓪𝓷𝓪𝓵 𝓼𝓪𝔂𝓲𝓼𝓲: ${message.guild.channels.size}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|  ❧𝓢𝓾𝓷𝓾𝓬𝓾 𝓘𝓼𝓽𝓪𝓽𝓲𝓼𝓽𝓲𝓴  |▬▬|")));
  message.channel.send(" Sunucu paneli ayarlandı!")
        })
}
});

///,

client.on("message", async msg => {
if(msg.channel.id === "706945052852748379") {msg.member.addRole("")}//711266881255768065
})

//

client.on("message", async msg => {
if(msg.channel.id === "710527700342931557") {msg.member.removeRole("691137325090209812")}
})
//


client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() ===  'c!botpaneli') {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('Bot Kullanımı', 'category', [{
  id: message.guild.id,
  deny: ['CONNECT']
}])



        
 message.guild.createChannel(`Bellek Kullanımı: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, 'voice', [{
  id: message.guild.id,
  deny: ['CONNECT']
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
 message.guild.createChannel(`Sunucular: ${client.guilds.size.toLocaleString()}`, 'voice', [{
  id: message.guild.id,
  deny: ['CONNECT']
}])
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
       message.guild.createChannel(`Toplam Kanal: ${client.channels.size.toLocaleString()}`, 'voice', [{
        id: message.guild.id,
        deny: ['CONNECT']
      }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
             message.guild.createChannel(`Ping: ${client.ping}`, 'voice', [{
              id: message.guild.id,
              deny: ['CONNECT']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
            message.guild.createChannel('Yapımcım: Hasan Böcek', 'voice', [{
              id: message.guild.id,
              deny: ['CONNECT']
            }])
            .then(channel =>
              channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
             message.guild.createChannel(`Kütüphanesi: Discord.js`, 'voice')
            
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
        message.channel.send('Bot Bilgi Panelini Oluturdum');
                 })   
    
}
});

//

const activities_list = [
    "Mekktile <3",
    "!yardım",// Sadece Tırnak Yani " İşareti İçinde Yazmakta Olan Mesajları Değiştirin.
  
    ]; 
client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // Bu Kısımları Ellemeyin
        client.user.setActivity(activities_list[index]); // Bu Kısımları Ellemeyin.
    }, 10000); // Selam 1 Saniye = 1000 MiliSaniye Yapar - Kısacası Böyle Bırakırsan - 3 Saniyede 1 Değişir. 
});
   



  
 client.on("message", message => {
  if(!message.guild) return;
  if(message.channel.id !== "724503610867712061") return;
  else if(message.author.id !== client.user.id) message.delete(200)
});
     //https://convertlive.com/tr/u/dönüştürmek/milisaniye/a/saniye Burdan Saniyeyi Milisaniye Yapabilirsiniz 1 saniye 1000 milisaniye oluyor
  //Made in Kong
//

client.on("messageUpdate", (old, nev) => {
  if (old.content != nev.content) {
    const yasak = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az",
      "sg",
      "oç",
      "oçe",
      "anan",
      "ananı",
      "ananı sikim",
      "anneni sikim",
      "anneni sikeyim",
      "ananı sikeyim",
      "annen",
      "ağzına",
      "ağzına sıçim",
      "ağzına sıçayım",
      "ağzına s",
      "am",
      "ambiti",
      "amını",
      "amını s",
      "amcık",
      "amcik",
      "amcığını",
      "amciğini",
      "amcığını",
      "amcığını s",
      "amck",
      "amckskm",
      "amcuk",
      "amına",
      "amına k",
      "amınakoyim",
      "amına s",
      "amunu",
      "amını",
      "amın oğlu",
      "amın o",
      "amınoğlu",
      "amk",
      "aq",
      "amnskm",
      "anaskm",
      "ananskm",
      "amkafa",
      "amk çocuğu",
      "amk oç",
      "piç",
      "amk ç",
      "amlar",
      "amcıklar",
      "amq",
      "amındaki",
      "amnskm",
      "ananı",
      "anan",
      "ananın am",
      "ananızın",
      "aneni",
      "aneni s",
      "annen",
      "anen",
      "ananın dölü",
      "sperm",
      "döl",
      "anasının am",
      "anası orospu",
      "orospu",
      "orosp,",
      "kahpe",
      "kahbe",
      "kahße",
      "ayklarmalrmsikerim",
      "ananı avradını",
      "avrat",
      "avradını",
      "avradını s",
      "babanı",
      "babanı s",
      "babanın amk",
      "annenin amk",
      "ananın amk",
      "bacı",
      "bacını s",
      "babası pezevenk",
      "pezevenk",
      "pezeveng",
      "kaşar",
      "a.q",
      "a.q.",
      "bitch",
      "çük",
      "yarrak",
      "am",
      "cibiliyetini",
      "bokbok",
      "bombok",
      "dallama",
      "göt",
      "götünü s",
      "ebenin",
      "ebeni",
      "ecdadını",
      "gavat",
      "gavad",
      "ebeni",
      "ebe",
      "fahişe",
      "sürtük",
      "fuck",
      "gotten",
      "götten",
      "göt",
      "gtveren",
      "gttn",
      "gtnde",
      "gtn",
      "hassiktir",
      "hasiktir",
      "hsktr",
      "haysiyetsiz",
      "ibne",
      "ibine",
      "ipne",
      "kaltık",
      "kancık",
      "kevaşe",
      "kevase",
      "kodumun",
      "orosbu",
      "fucker",
      "penis",
      "pic",
      "porno",
      "sex",
      "sikiş",
      "s1kerim",
      "s1k",
      "puşt",
      "sakso",
      "sik",
      "skcm",
      "siktir",
      "sktr",
      "skecem",
      "skeym",
      "slaleni",
      "sokam",
      "sokuş",
      "sokarım",
      "sokarm",
      "sokaym",
      "şerefsiz",
      "şrfsz",
      "sürtük",
      "taşak",
      "taşşak",
      "tasak",
      "tipini s",
      "yarram",
      "yararmorospunun",
      "yarramın başı",
      "yarramınbaşı",
      "yarraminbasi",
      "yrrk",
      "zikeyim",
      "zikik",
      "zkym"
    ];
    if(yasak.some(banned => nev.content.includes(banned))) {
      if(!nev.member.hasPermission("MANAGE_MESSAGES")) {
        try {
          nev.delete();
          nev.channel.send(`<@${nev.author.id}>, bu sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`)
          nev.author.send(`<@${nev.author.id}>, **${nev.guild.name}** adlı sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
});
   
//

client.on("message", msg => {
  let küfürEngel = db.fetch(`ke_${msg.guild.id}`)
  if (!msg.guild) return
  if (küfürEngel === 'kapali') return
    if (küfürEngel === 'acik') {
   
    var request = require('request');
request(`https://pingapi.glitch.me/api/kufur?apikey=pingwashere`, function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var veri = JSON.parse(body);
      if (veri.kelimeler.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(new Discord.RichEmbed().setColor('#000000').setDescription('Küfür yakışıyor mu sana?')).then(message => message.delete(3000));
    
    }}
    }
})}});

//

client.on("message", message => {
  if(!message.guild) return;
  if(message.channel.id !== "") return;
  else if(message.author.id !== client.user.id) message.delete(1000)
});

//

client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler, başarılı bir şekilde ${sayac[message.guild.id].sayi} kullanıcıya ulaştık!`)
                .setColor("0x808080")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: ${member.user.tag}, aramızdan ayrıldı, \**${sayac[member.guild.id].sayi}\** kişi olmamıza \**${sayac[member.guild.id].sayi - member.guild.memberCount}\** kişi kaldı!`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: ${member.user.tag}, aramıza katıldı **${sayac[member.guild.id].sayi}** kişi olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** kişi kaldı!` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
   
//


client.on("guildMemberAdd", async member => {
 let log = 'mod-log';
let lbulundu = await db.fetch(`giriscikis_${member.guild.id}`);
if (lbulundu === null) log = 'mod-log';
else log = lbulundu;
        
  
      
    const channel = member.guild.channels.find('name', `${log}`);
  
  if (!channel) return;
        let username = member.user.username;
        let id = member.user.id;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {            
          const bg = await Jimp.read("https://cdn.discordapp.com/attachments/499911418896973824/500023171827761154/guildAdd_2.png");
  const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    if( id == "616178965865955340" ){
                     channel.send(new Discord.Attachment("./img/" + member.id + ".png"))
                      channel.send("İşte Bak! Kurucum sunucuna giriş yaptı.")
                    }else{
                     channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
                    }
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })




client.on("guildMemberRemove", async member => {
  
let log = 'mod-log';
let lbulundu = await db.fetch(`giriscikis_${member.guild.id}`);
if (lbulundu === null) log = 'mod-log';
else log = lbulundu;
           
  
    const channel = member.guild.channels.find('name', `${log}`);
  if (!channel) return;
        let username = member.user.username; 
  let id = member.user.id
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {            
          const bg = await Jimp.read("https://cdn.discordapp.com/attachments/499911418896973824/500023173459345416/guildRemove_2.png");
 const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    if( id == "616178965865955340" ){
                     channel.send(new Discord.Attachment("./img/" + member.id + ".png"))
                      channel.send("Kurucum sunucunuzdan ayrıldı..")
                    }else{
                     channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
                    }
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })