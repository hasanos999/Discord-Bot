const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  console.log(`${client.guilds.size} Sunucuya Hizmet. ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı`)
  setInterval(() => {
    }, 1 * 10000);
}