const Discord = require('discord.js')
const client = new Discord.Client();
const config = require('./config.json')
const { readdirSync } = require('fs');
const { join } = require('path');

const { dirname } = require('path/posix');

const prefix = config.prefix;

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});


client.commands = new Discord.Collection();


    const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(join(__dirname, "commands", `${file}`));
        client.commands.set(command.name, command);
    }

    client.on("ready", () => {
        console.log(`Bot online em ${client.guilds.cache.size} servidores!`)
        client.user.setActivity("Universal World BR", { type: "COMPETING"})
    })

    client.on("guildCreate", (guild) => {
        console.log(`o bot foi adicionado no servidor ${guild.name}`)
    })

    client.on("message", async message => {

        if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) return message.reply(`my prefix is ${prefix}`);
        if(message.author.bot) return;
        if(message.channel.type === 'dm') return;
    
        //let prefix = await db.get(`prefix_${message.guild.id}`);
        //if(prefix === null) prefix = default_prefix;
    
    
        if(message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/);
    
            const command = args.shift().toLowerCase();
    
            if(!client.commands.has(command)) return;
    
    
            try{
                client.commands.get(command).run(client, message, args);
    
            } catch (error){
                console.error(error);
            }
        }
    })

    client.login(config.token)
    