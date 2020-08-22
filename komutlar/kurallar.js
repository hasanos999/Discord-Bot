const Discord = require('discord.js')
const { RichEmbed } = require('discord.js')
exports.run = (client, message, args) => {

  let yazıİçeriği = args.slice().join(' ')
  const Mesaj = new RichEmbed()
	.setColor('#0099ff')
	.setTitle('Lonca Katılım Linki')
	.setURL('https://www.craftrise.tc/lonca/befa16a1-7800-4d5d-9b3c-0f6f4360e6d3')
	.setAuthor('PeeVed', 'https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FPeeVed.jpg?v=1598087071137', 'https://discord.gg/VVfzqjs')
	.setDescription('**• Kurallar •**\n\n**Reklam**\n**•**Sözlü reklamlar, link ile reklam, özelden reklam, resim ile reklam ve benzeri şekilde reklamlar yapmak yasaktır.\n\n**Küfür, Argo, Hakaret**\n**•**Her kanalda küfür etmek ve argo kullanmak yasaktır.\n**•**Üyelere karşı hakaret etmek ve dalga geçme yasaktır.\n\n**Kanallar**\n**•**Komut kanalı haricinde komut kullanılması yasaktır.\n**•**Sesli müzik kanalı haricinde müzik açılması yasaktır.\n**•**Kanal açıklamalarında yararlı bilgiler bulabilirsin.\n\n**Yetkililer ve Yetki**\n**•**Yetki istemek yasaktır.\n**•**Yetkilileri boş yere @etiketlemek ve @etiketleyerek spam yapmak yasaktır.\n**•**Yetkililere saygılı olun.\n\n**Spam ve Etiketleme**\n**•** Spam yapmak yasaktır.\n**•** Bir kelimeyi sürekli bir mesajda yazmak yasaktır.\n**•** Bir üyeyi sürekli @etiketlemek yasaktır.\n\n**Din, Siyaset, Cinsellik**\n**•**Din ile ilgili konuşmak, tartışmak, kullanıcı adlarını din ile ilgili koymak yasaktır.\n**•**Siyaset ile ilgili konuşmak, tartışmak, kullanıcı adlarını siyaset ile ilgili koymak yasaktır.\n**•**18+ fotoğraflar paylaşmak ve konuşmak yasaktır.\n\n**Kavga, Tartışmak**\n**•**Kavga etmek, kavgaya dahil olmak ve tartışmak yasaktır.')
	.setThumbnail('https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FraccoonHead.png?v=1598031841290')
	
	.setTimestamp()
	.setFooter('PeeVed', 'https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FPeeVed.jpg?v=1598087071137');

message.channel.send(Mesaj)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kural','kurallar'],
  permLevel: 0,
  kategori: "kullanıcı"
  
}

exports.help = {
  name: '**!Kurallar** ,'

}