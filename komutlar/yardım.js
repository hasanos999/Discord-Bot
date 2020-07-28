const Discord = require("discord.js")

exports.run = async(client, message) => {
	
	let prefix = '!'

	const codare = new Discord.RichEmbed()
       .setColor("RANDOM")
       .setAuthor(`Komutlar`)
       .setTitle(`Eğlence Komutları`)
       .setDescription(`!8ball:\nSorduğunuz Soruya Rastgele Cevap Verir. \n\n !adamasmaca:\nAdam Asmaca Oynarsınız.\n\n!canlıyardım:\nCanlı Destek Tablebi Oluşturur.\n\n!emojiyazı:\nMesajınızı emojiye çevirir.\n\n!pp:\nSunucu Resminin Linkini Atar.\n\n!söyle:\nYazdığınız mesajı sesli olarak söyler.\n\n!stersçarkı:\nSizin için bir stres çarkı çevirir.\n\n!yazıtura:\nYazı Tura Oynamanıza Yarar.\n\n!sayıtahmin:\nRastgele rakam belirler ve siz o rakamı bulmaya çalışırsınız.\n\n!myardım:\nMüzik Komutları.`)
       
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
  name: 'yardım',
  description: '[Admin Komutu]',
  usage: '!bakım-mod aç'
};