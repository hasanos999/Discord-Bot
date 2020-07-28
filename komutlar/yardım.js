const Discord = require('discord.js')
exports.run = (client, message, args) => {

  message.channel.send(
    new Discord.RichEmbed()
      .setColor('#000000')
      .setTitle('Ödül')
      .setURL('https://i.imgyukle.com/2020/05/16/rwHv9n.jpg')
        .setDescription('**zFantaStrafe=minesaus\nRTC=MrsMyDarling\nG3NOS=TimeForce\nmehmetpro0101=DqrkOne\nShiezyS=MeliksahStrqfe\nBathneYT=AndreiTheGamer**')
        .addField('Lonca Savaşları', 'Eşleşmeler')
  )
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'yazı'
}