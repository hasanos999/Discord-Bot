const Discord = require('discord.js')
let prefix = '!'
exports.run = async (client, message, keremdesu) => {
let kategori = keremdesu[0]
if(!kategori) return message.channel.send('Lütfen bir kategori giriniz. \`{ moderasyon, kullanıcı, müzik }\`');
if(kategori === 'moderasyon' | kategori === 'kullanıcı' | kategori === 'müzik'){
let embed = new Discord.RichEmbed()
   .setAuthor(`${kategori} Komutları`)//keremdesu#0404
   .setTitle(`Örnek Kullanım: ${prefix}${client.commands.filter(c=>c.conf.kategori===kategori).random().help.name}`)//keremdesu#0404
   .setDescription(client.commands.filter(c=>c.conf.kategori=== kategori).map(kmt=>kmt.help.name).join('**,\n **'))
  message.channel.send(embed)
  } else { message.channel.send('Kategori \`moderasyon, kullanıcı veya müzik\` olmalı!') }};
  
  exports.conf = {
      enabled:true,
      guildOnly: true,
      aliases:['help'],
      permLevel:0,
    kategori: "kullanıcı"
  }
  
  exports.help = {
      name:`yardım`,
    description:`yardım`,
    usage:`yardım`
  }