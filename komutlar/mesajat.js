const Discord = require('discord.js');
exports.run = (client, message, args) => {

      
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('? Uyari ?', 'Bu  komutu ozel mesajlarda kullanamazsin.');
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild;
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('Kime Mesaj atıcam.').catch(console.error);
  if (reason.length < 1) return message.reply('Ne gondericem.');
  message.delete();
  message.reply('Mesajini Gonderdim.').then(msg => msg.delete(2000))
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(``)
  .setTimestamp()
  .setDescription(reason);
  return user.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pm','dm'],
  permlevel: 1,
   
};

exports.help = {
  name: 'dmgönder',
  description: 'Bir kullaniciya ozel mesaj yollar.',
  usage: 'mesajat'
};