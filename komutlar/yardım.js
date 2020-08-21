const Discord = require('discord.js')
let prefix = '!'
exports.run = async (client, message, keremdesu) => {
let kategori = keremdesu[0]
if(!kategori) return message.channel.send('Doğru Kullanım:!yardım kullanıcı`');
if(kategori === 'kullanıcı'){
let embed = new Discord.RichEmbed()
   .setAuthor(`Kullanıcı Komutları`)//keremdesu#0404
   .setTitle(`Örnek Kullanım: \n!komut`)//keremdesu#0404
   .setDescription(client.commands.filter(c=>c.conf.kategori=== kategori).map(kmt=>kmt.help.name).join('\n '))
  message.channel.send(embed)
  } else { message.channel.send('Doğru Kullanım:!yardım kullanıcı') }};
  
  exports.conf = {
      enabled:true,
      guildOnly: true,
      aliases:['help'],
      permLevel:0,
    
  }
  
  exports.help = {
      name:`yardım`,
    description:`yardım`,
    usage:`yardım`
  }