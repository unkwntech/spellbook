const { Category, Command } = require('discord-akairo');

class InviteCommand extends Command
{
    constructor()
    {
        super('invite', {
            aliases: ["invite"],
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
        if(global.DEBUG)
            output += "Invite Link; http://bit.ly/SpellbotDev\n";
        else
            output += "Invite Link; http://bit.ly/Spellbot\n";

        return message.reply(output);
    }
}

module.exports = InviteCommand;