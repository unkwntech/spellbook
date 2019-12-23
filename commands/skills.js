const { Command } = require('discord-akairo');
const Skills = require('../Data/Skills.js');
const SkillModel = require("../Models/Skill.js");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

class SkillCommand extends Command
{
    constructor()
    {
        super('skill',
            {
                aliases: ["skill"],
                split: 'none',
                args: 
                [
                    {id:'terms', type: "string", default: null}
                ]
            });
    }

    exec(message, args)
    {
        var searchTerm = this.cleanSearchTerms(args.terms);

        var Skill = new SkillModel();

        console.log("Searching for: '" + searchTerm + "' - " + Skills.List.length + " Skills in memory.");

        var msr = Skills.List.filter(obj => { return obj.Name === searchTerm });

        if(msr.length > 0)
        {
            var row = msr[0]
            
            Skill.Name = row.Name;
            Skill.Description = row.Description;
            Skill.Attribute = row.Attribute;

            this.SkillResponse(message, Skill);
        }
    }

    cleanSearchTerms(terms)
    {
        var tarray = terms.split(/\s+/);

        var output = '';

        for(var i=0;i<tarray.length;i++)
        {
            if(!["of", "or", "in", "if", "an", "a", "for", "by", "and", "the"].includes(tarray[i].toLowerCase()))
               output += tarray[i].capitalize() + " ";
            else
                output += tarray[i] + " ";
        }

        return output.trim();
    }

    SkillResponse(message, data)
    {
        data.toDiscordEmbed().forEach(function(e, i){message.reply(e);});
        
        //return message.reply();
    }
}

module.exports = SkillCommand;