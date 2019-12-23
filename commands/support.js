const { Category, Command } = require('discord-akairo');

class SupportCommand extends Command
{
    constructor()
    {
        super('support', {
            aliases: ["support"],
            split: 'none',
            args: 
            [
                {id:'terms', type: "string", default: null}
            ]
        });
    }
    exec(message)
    {
        var output = "\n";
        output += "If you need support using Spellbot, or if you find bugs please join our discord and lets us know.";
        output += "Support Discord; https://discord.gg/TaWsnpY";
        
        return message.reply(output);
    }
}

module.exports = SupportCommand;