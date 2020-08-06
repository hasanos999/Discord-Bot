const Discord = require("discord.js")

exports.run = async(client, message) => {
	
	let prefix = '!'

	const codare = new Discord.RichEmbed()
       .setColor("RANDOM")
       .setAuthor(`Lonca`)
       .setURL('https://craftrise.tc/')
       .setTitle(`CraftRise Türkiye`)
       .setDescription(`**Buyur Kardeşim Lonca Katılım Linkin Yukarda**`)
       
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
  name: 'katılım',
  description: '[Admin Komutu]',
  usage: '!bakım-mod aç'
};