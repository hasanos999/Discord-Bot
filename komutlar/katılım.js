const Discord = require('discord.js')
const { RichEmbed } = require('discord.js')
exports.run = (client, message, args) => {
  
  

  let yazıİçeriği = args.slice().join(' ')
  const Mesaj = new RichEmbed()
	.setColor('#0099ff')
	.setTitle('Lonca Davet Linki')
	.setURL('https://www.craftrise.tc/lonca/befa16a1-7800-4d5d-9b3c-0f6f4360e6d3')
	.setAuthor('PeeVed', 'https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FraccoonHead.png?v=1598031841290', 'https://discord.gg/VVfzqjs')
	.setThumbnail('https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FraccoonHead.png?v=1598031841290')


	.addField(`\nYetkililer:`, `**Mekktile** (Kurucu)\n**MiniAnn** (Moderatör)\n**YT_Eren** (Moderatör)\n**EndlessSpear** (Moderatör)\n**minesaus** (Moderatör)\n**missyhypnst** (Moderatör)\n**kocmar333** (Moderatör)\n**pufuu** (Moderatör)\n**Retuhn** (Moderatör)`, true)
  .addField(`|` , `**|**\n**|**\n**|**\n**|**\n**|**\n**|**\n**|**\n**|**\n**|**`, true)
  .addField(`Loncadaki Kullanıcı Sayısı: \n37 \n\n**Discorddaki Kullanıcı Sayısı:**\n \`, ${message.guild.memberCount}, \`\n\n**Aktif Yetkili Sayısı:**\n1` , true)
	.setTimestamp()
	.setFooter('PeeVed', 'https://cdn.glitch.com/9e3a1417-6901-4041-baf5-d8644c0da566%2FPeeVed.jpg?v=1598077756090');

message.channel.send(Mesaj)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bilgi'],
  permLevel: 0,
  kategori: "kullanıcı"
  
}

exports.help = {
  name: '**!Bilgi** ,'

}

//member.guild.memberCount