const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../util/Util.js');

exports.run = async (client, message, args) => {
  
  this.fighting = new Set();
  
    let opponent = message.mentions.users.first()
    
  if(opponent.bot) {message.reply('Botla mı oynayacaksın? Hadi be') }
  if (opponent.id === message.author.id) return message.reply('Kendinle bilek güreşi yapamassın!');
        if (this.fighting.has(message.channel.id)) return message.reply('Kanal başına sadece bir bilek güreşi olabilir .');
        this.fighting.add(message.channel.id);
        try {
            if (!opponent.bot) {
                await message.channel.send(`${opponent}, bilek güreşi isteği geldi. Meydan okuma'yı kabul ediyor musun? (\`evet\` veya \`hayır\` olarak cevap veriniz.)`);
                const verification = await verify(message.channel, opponent);
                if (!verification) {
                    this.fighting.delete(message.channel.id);
                    return message.channel.send(`Meydan Okuma kabul edilmedi...`);
                }
            }
            let userHP = 100;
            let oppoHP = 100;
            let userTurn = false;
            let guard = false;
            const reset = (changeGuard = true) => {
                userTurn = !userTurn;
                if (changeGuard && guard) guard = false;
            };
            const dealDamage = damage => {
                if (userTurn) oppoHP -= damage;
                else userHP -= damage;
            };
            const forfeit = () => {
                if (userTurn) userHP = 0;
                else oppoHP = 0;
            };
            while (userHP > 0 && oppoHP > 0) {
                const user = userTurn ? message.author : opponent;
                let choice;
                if (!opponent.bot || (opponent.bot && userTurn)) {
                    await message.channel.send(stripIndents`
                        ${user}, ne yapmak istersin? \`bastır\`, \`diren\`, \`yüklen\`, veya \`pes et\`?
                        **${message.author.username}**: ${userHP} :muscle:
                        **${opponent.username}**: ${oppoHP} :muscle:
                    `);
                    const filter = res =>
                        res.author.id === user.id && ['bastır', 'diren', 'yüklen', 'pes et'].includes(res.content.toLowerCase());
                    const turn = await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000
                    });
                    if (!turn.size) {
                        await message.reply(`Üzgünüm ama, süre doldu!`);
                        reset();
                        continue;
                    }
                    choice = turn.first().content.toLowerCase();
                } else {
                    const choices = ['bastır', 'diren', 'yüklen'];
                    choice = choices[Math.floor(Math.random() * choices.length)];
                }
                if (choice === 'bastır') {
                    const damage = Math.floor(Math.random() * (guard ? 20 : 60)) + 1;
                    await message.channel.send(`${user}, **${damage}** kadar bileğini zorladı!`);
                    dealDamage(damage);
                    reset();
                } else if (choice === 'diren') {
                    await message.channel.send(`${user}, rakibinin bileğini bükmeye çalışmaktan vazgeçip kendi bileğini korudu!`);
                    guard = true;
                    reset(false);
                } else if (choice === 'yüklen') {
                    const miss = Math.floor(Math.random() * 4);
                    if (!miss) {
                        const damage = randomRange(100, guard ? 20 :80);
                        await message.channel.send(`${user}, vücudundan yeterli miktarda destek aldın ve **${damage}** rakibinin bileğini masaya kadar düşürdün!!`);
                        dealDamage(damage);
                    } else {
                        await message.channel.send(`${user}, bileğin yorgun olduğu için rakibinin bileğine yüklenemedin`);
                    }
                    reset();
                } else if (choice === 'pes et') {
                    await message.channel.send(`${user},pes etti,bükemediğin bileği öpeceksin !`);
                    forfeit();
                    break;
                } else {
                    await message.reply('Ne yapmak istediğini anlamadım.');
                }
            }
            this.fighting.delete(message.channel.id);
            const winner = userHP > oppoHP ? message.author : opponent;
            return message.channel.send(`Bilek güreşi bitti! Tebrikler, **${winner}** kazandı! \n**${message.author.username}**: ${userHP} :muscle: \n**${opponent.username}**: ${oppoHP} :muscle:`);
        } catch (err) {
            this.fighting.delete(message.channel.id);
            throw err;
        }
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['1vs1', '1v1', 'savaş'],
  permLevel: `Yetki gerekmiyor.`
};

exports.help = {
  name: 'bilekgüreşi',
  category: "eğlence",
  description: 'İstediğiniz bir kişi ile bilekgüreşi atarsınız!',
  usage: 'bilekgüreşi <@kullanıcı>'
};