import { DbUtilities } from './db-utils';
import * as Discord from 'discord.js';
import stringArgv from 'string-argv';

import Monster from './models/monster';
import Spell from './models/spell';

require('dotenv').config();

const client = new Discord.Client({
    presence: {
        status: 'online',
        activities: [{
            name: 'I\'m Back and V2 now!',
        }],
    },
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
})

client.login(process.env.DISCORD_BOT_TOKEN);
client.on('ready', async () => {
    console.log("Discord Client Connected");
})

client.on("messageCreate", async (message) => {
    if(!message.content.startsWith(`?`)) return; //Ignore messages that don't start with the trigger
    if(message.author.bot) return; //Ignore bots
    let args: string[] = stringArgv(message.content);
    //Enables case-insensitive searches by building a basic regex /terms/i
    let searchTerm = new RegExp(args.slice(1).join(" "), 'i');
    switch(args[0]) {
        case "?s":
        case "?spell":
            DbUtilities.QueryOne({name: searchTerm}, Spell.getFactory()).then(d => {
                message.channel.send({embeds: d.toEmbed()});
            }).catch(e => {
                console.error(e);
                message.channel.send("I couldn't find that spell in my notes, I'll head to the library!")
            })
            break;
        case "?m":
        case "?monster":
            DbUtilities.QueryOne({name: searchTerm}, Monster.getFactory()).then(d => {
                message.channel.send({embeds: d.toEmbed()});
            }).catch(e => {
                console.error(e);
                message.channel.send("I couldn't find that monster in my notes, it sounds ferocious though!")
            })
            break;
        case "?skill":
            break;
        case "?item":
            break;
        case "?cf":
        case "?classfeature":
            break;
        default:
            message.channel.send("I don't know that command yet, I've taken note to try and pick it up next time we're in town!");
            break;
    }
})