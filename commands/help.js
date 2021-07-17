const Discord = require('discord.js');
const config = require('../config.json')

module.exports = {
    name: "help",
    description: "view a bot commands",

    async run(client, message, args) {
        const inline = true;



        const embed = new Discord.MessageEmbed()
        .setAuthor(`Help... My prefix is ${config.prefix}`)
        .addField("youtube", "Veja o canal do nosso diretor ;-; ")
        message.channel.send(embed)
    }
}