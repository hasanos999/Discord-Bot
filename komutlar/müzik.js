  const Discord = require("discord.js")

exports.run = async(client, message) => {
	
	let prefix = '-'

	const codare = new Discord.RichEmbed()
       .setAuthor(`Komutlar`)
       .setTitle(`Müzik Komutları`)
       .setDescription(`!çal:\nYazdığınız Müziği Çalar\n\n!geç:\nÇalan Şarkıyı Atlar.\n\n!kapat:\nÇalmakta Olan Şarkıyı Kapatır.\n\n!ses:\nŞarkının Sesini Ayarlar.\n\n!çalan:\nÇalmakta Olan Şarkıyı Gösterir.\n\n!kuyruk:\nKuyruktaki Şarkıları Gösterir.\n\n!durdur:\nŞarkıyı Durdurur.\n\n!devam:\nŞarkıyı Devam Ettirir.`)

  .setFooter(`Yapımcı @Hasan 14`)
  return message.channel.send(codare)
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: `Geliştirici`
};

exports.help = {
  name:'myardım' ,
  description: '[Admin Komutu]',
  usage: '!bakım-mod aç'
};