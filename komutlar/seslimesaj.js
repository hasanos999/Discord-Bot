const Discord = require('discord.js')
const googleTTS = require('google-tts-api');
const ayarlar = require('../ayarlar.json');
const opus = require("node-opus")

exports.run = async (client, message, args) => {
    let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix

  let yazi = args.join(" ")
  
  if (!message.member.voiceChannel) return message.channel.send(' Lütfen sesli bir kanala katıl ve tekrar dene.').then(msg => msg.delete(5000));
  if (!yazi) return message.channel.send(' Sesli olarak söylenmesini istediğin mesajı belirtmelisin. \`${prefix}seslimesaj Merhaba\``').then(msg => msg.delete(5000))
  
  googleTTS(`${yazi}`, 'tr', 1).then(url => {
    message.member.voiceChannel.join().then(connection => {
      message.channel.send(` \`${yazi}\` mesajı sesli olarak söyleniyor.`).then(msg => msg.delete(5000))
      connection.playStream(url).on("end",() => {
      })
    })
  })
  
};
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['konuş'],
   kategori: "eğlence",
   permLevel: 0
 };

 exports.help = {
   name: 'söyleş',
   description: 'Yazdığınız mesajı sesli olarak söyler.',
   usage: 'seslimesaj <mesaj>'
 };