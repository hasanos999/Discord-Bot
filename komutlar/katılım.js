const Discord = require('discord.js')
const { RichEmbed } = require('discord.js')
exports.run = (client, message, args) => {

  let yazıİçeriği = args.slice().join(' ')
  const Mesaj = new RichEmbed()
    .setColor('RANDOM')
    .setDescription(yazıi)
    .setTitle('Link')
    .setUrl('https://www.craftrise.tc/lonca/befa16a1-7800-4d5d-9b3c-0f6f4360e6d3')

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