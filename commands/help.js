const { Category, Command } = require('discord-akairo');

class HelpCommand extends Command
{
    constructor()
    {
        super('help', {
            aliases: ["help"],
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
        output += "?monster [name]\n";
        output += "     Alias: ?m [name]\n";
        output += "     Source: SRD\n";
        output += "?spell [name]\n";
        output += "     Alias: ?s [name]\n";
        output += "     Source: SRD\n";
        output += "?item [name]\n"
        output += "     Alias: ?i [name]\n";
        output += "     Source: SRD\n";
        output += "?skill [name]\n"
        output += "?support\n"
        output += "?invite\n"
        output += "\n";
        output += "DM Spellbot with the same commands to get information directly.\n\n";

        return message.reply(output);
    }
}

module.exports = HelpCommand;