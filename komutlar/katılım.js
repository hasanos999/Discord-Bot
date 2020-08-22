const Discord = require('discord.js')
const { RichEmbed } = require('discord.js')
exports.run = (client, message, args) => {

  let yazıİçeriği = args.slice().join(' ')
  const Mesaj = new RichEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FraccoonHead.png?v=1598031841290', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FraccoonHead.png?v=1598031841290')


	.addField('Inline field title', 'Some value here', true)
	.setImage('https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FraccoonHead.png?v=1598031841290')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FPeeVed.jpg?v=1598077756090');

message.channel.send(Mesaj)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['embed', 'embedyazı'],
  permLevel: 0
}

exports.help = {
  name: 'embedyaz'
}