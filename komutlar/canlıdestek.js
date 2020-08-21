
const Discord = require('discord.js')
exports.run = async(client, message, args) => {
  
  
const emoji1 = message.client.emojis.get('📞');
const emoji2 = message.client.emojis.get('📞');
const emoji3 = message.client.emojis.get('📞');
const emoji4 = message.client.emojis.get('📞');
const emoji5 = message.client.emojis.get('📞');
const emoji6 = message.client.emojis.get('📞');
const emoji7 = message.client.emojis.get('📞');
      let isEnabled;
      message.reply("Birazdan Yetkili Ekibimiz sizinle ilgilenicektir.");
      let mesaj = args.slice(0).join(' ');
      let chan = message.channel;
      let destekKanal = "745964036767875142";
      const embed = new Discord.RichEmbed()
        .addField('Uyarı', `📞 Canlı Destek Çağrısı`)
        .setAuthor(`${message.author.tag} `, `${message.author.avatarURL}`)
        .setColor("RANDOM")
        .addField(`Bilgiler`, `\n**Kanal**: ${message.channel.name} \n**Destek İsteyen**: ${message.author.tag} \n**Destek Mesajı**: ${mesaj}`)
        .setFooter("Canlı Destek")
        .setTimestamp()
      client.channels.get(destekKanal).send({
        embed: embed
      });
    const collector = client.channels.get(destekKanal).createCollector(message => message.content.startsWith(''), {
      time: 0
    })
    client.channels.get(destekKanal).send('📞 Soru Talebi bağlanmak için `katıl` yazınız. İptal Etmek İçin `kapat` yazınız.')
    collector.on('message', (message) => {
      if (message.content === 'kapat') collector.stop('aborted')
      if (message.content === 'katıl') collector.stop('success')
    })
    collector.on('end', (collected, reason) => {
      if (reason === 'time') return message.reply('📞 Soru Talebi zaman aşımına uğradı.')
      if (reason === 'aborted') {
        message.reply('Çağrı reddedildi.')
        client.channels.get(destekKanal).send('📞 Başarıyla Soru Talebi reddedildi.')
      }
      if (reason === 'success') {
        client.channels.get(destekKanal).send('📞 Soru Talebiniz alındı!')
        client.channels.get(destekKanal).send('📞 Soru Talebinizi kapatmak için `kapat` yazınız.')
        chan.send(`${message.author}`)
        chan.send('Soru Talebiniz bir destek yetkili tarafından alındı!')
        chan.send('En Yakın Zamanda Size Yardımcı Olacagız.')
        chan.send('Soru Talebini kapatmak için `kapat` yazınız.')
        isEnabled = true
        client.on('message', message => {
          function contact() {
            if (isEnabled === false) return
            if (message.author.id === client.user.id) return
            if (message.content.startsWith('kapat')) {
              message.channel.send('📞 Soru Talebiniz Kapatıldı.')
              if (message.channel.id === chan.id) client.channels.get(destekKanal).send('📞 Soru Talebiniz Karşı Taraftan Kapatıldı.')
              if (message.channel.id === destekKanal) chan.send('📞 Soru Talebiniz Karşı Taraftan Kapatıldı.')
              return isEnabled = false
            }
            if (message.channel.id === chan.id) client.channels.get(destekKanal).send(`📞 **${message.author.tag}**: ${message.content}`)
            if (message.channel.id === destekKanal) chan.send(`📞 **${message.author.tag}**: ${message.content}`)
          }
          contact(client)
        })
      }
    })
}
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
   
};
exports.help = {
  name: 'sor',
  description: 'Canlı Destek Tablebi Oluşturur.',
  usage: 'canlıdestek'
};