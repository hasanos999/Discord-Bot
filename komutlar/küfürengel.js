
const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => {


  if (!message.member.hasPermission('ADMINSTRATOR')) {
    message.channel.send('Bu komut için `YÖNETİCİ` yetkisine sahip olmalısın.')
  }
if (!args[0]) {
   message.channel.send("`!küfürengel aç` veya `!küfürengel kapat` yazmalısınız.");
}

 

if (args[0] == 'aç') {
    db.set(`ke_${message.guild.id}`, 'acik')
  message.channel.send(":white_check_mark: Başarılı küfür engel açıldı.");
}
if (args[0] == 'kapat') {
    db.delete(`ke_${message.guild.id}`)
  message.channel.send(":white_check_mark: Başarılı küfür engel kapatıldı.");
}

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  
}

exports.help = {
  name: 'küfürengel'
}