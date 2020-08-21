const Discord = require('discord.js')

exports.run = (bot, message, args) => {  
const pingUpdate = new Discord.MessageEmbed()
.setColor('#0099ff')
.setDescription('pinging...')
message.channel.send(pingUpdate);
}

exports.help = {
  name: 'ping'
}