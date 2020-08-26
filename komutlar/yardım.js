const Discord = require('discord.js')
const { RichEmbed } = require('discord.js')
exports.run = (client, message, args) => {

  let yazıİçeriği = args.slice().join(' ')
  const Mesaj = new RichEmbed()
	.setColor('#0099ff')
	.setTitle('Lonca Katılım Linki')
	.setURL('https://www.craftrise.tc/lonca/befa16a1-7800-4d5d-9b3c-0f6f4360e6d3')
	.setAuthor('PeeVed', 'https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FPeeVed.jpg?v=1598087071137', 'https://discord.gg/VVfzqjs')
	.setDescription('**• Komutlar •**\n\n**Örnek Kullanım\n!yardım**\n\n**!Kurallar**\n**•**Size Sunucumuzdaki Kuralları Gösterir.\n\n**!Bilgi**\n**•**Sunucu ve Lonca Hakkında Bilgi Verir.\n\n**!Davet**\n**•**Sizin İçin Davet Linki Oluşturur.\n\n**!8ball**\n**•**Sorduğunuz Soruya Rastgele Cevap Verir.\n\n**!EmojiYazı**\n**•**Yazdığınız Yazıyı Emojiye Çevirir.\n\n**!SunucuPP**\n**•** Sunucunun Profil Fotoğrafını Gösterir.\n\n**!SayıTahmin**\n**•**Sayı Tahmin Etme Oyunu Oynarsınız.\n\n**!Söyle**\n**•**Yazdığınız Mesajı Ses Kanalında Sesli Olarak Söyler.\n\n**!StresÇarkı**\n**•**Sizin İçin Bir Stres Çarkı Çevirir..\n\n**!YazıTura**\n**•**Yazı mı? Tura mı?')
	.setThumbnail('https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FraccoonHead.png?v=1598031841290')
	
	.setTimestamp()
	.setFooter('PeeVed', 'https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FPeeVed.jpg?v=1598087071137');

message.channel.send(Mesaj)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım'],
  permLevel: 0,
  kategori: "kullanıcı"
  
}

exports.help = {
  name: '**!Yardım** ,'

}

//\n\n**!YazıTura**\n**•**