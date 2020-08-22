const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => { let invite = await message.channel.createInvite({ 
unique: true
 })
message.reply(invite ? Here's your invite: ${invite} : "There has been an error during the creation of the invite."); 
} 
module.exports.help = { name: "createinvite" }