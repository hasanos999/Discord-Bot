const Discord = require('discord.js')
const fs = require('fs');
var ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")){
   message.channel.send("**Bu komutu kulanmaya yetkiniz yok!!**")
  }else{
  let nesne = args[0]
  if (!nesne) return message.channel.send('Kanal ayarlaması yapılamadı.')
    
  db.set(`giriscikis_${message.guild.id}`, nesne)
   message.channel.send("Artık giriş çıkış mesajları " + nesne + " kanalına gönderilecek.")
  }   
 };
                                        
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
  
}

exports.help = {
    name: 'girişçıkışayarla',
    description: 'Mod log kanalını ayarlar.',
    usage: 'mod-log-ayarla <#kanal>'
}