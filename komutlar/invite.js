const Discord = require("discord.js");

exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
  message.channel.createInvite({maxAge: 0}).then(invite => {
    let embed = new Discord.RichEmbed()
    .setColor('0xff7700')
    .setTitle('Davet Oluşturuldu')
    .setDescription(`${invite}`)
    .setFooter(`${message.author.tag} Tarafından İstendi.`,message.author.avatarURL)
    message.channel.send(embed);
  });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'davet oluşturur',
  usage: '.davetoluştur'
};

//