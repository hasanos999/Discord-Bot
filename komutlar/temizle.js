const Discord = require('discord.js');
exports.run = function(client, message, args) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!").then(m => m.delete(8000))
if(!args[0]) return message.channel.send("<:hayirr:495950887898841089> Lütfen Silinicek Mesaj Miktarını Yazın.!").then(m => m.delete(8000))
message.channel.bulkDelete(args[0]).then(() => {
  const embed = new Discord.RichEmbed()
       .setDescription(`Mesajlar Başarılı Bir Şekilde Yok Edildi.`)
        .setImage(`https://tenor.com/view/konosoba-megumin-explosion-gif-7559840`)
        .setFooter(`${message.author.username} Tarafından istendi.`)
        .setColor("BLACK")
        .setTimestamp()
message.channel.send({ embed }).then(m => m.delete(8000))
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['patlat','sil'],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'patlat <silinicek mesaj sayısı>'
};
