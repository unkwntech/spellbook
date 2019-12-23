const { Command } = require('discord-akairo');
const { Discord } = require('discord.js');
const http = require("http");
const spells = require('../Data/Spells.js');
const SpellModel = require("../Models/Spell.js");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

class SpellCommand extends Command
{
    constructor()
    {
        super('spell',
            {
                aliases: ['s', "spell"],
                split: 'none',
                args: 
                [
                    {id:'terms', type: "string", default: null}
                ]
            });
    }

    exec(message, args)
    {
        var baseURL = "http://www.dnd5eapi.co/api/spells?name=";

        var data = '';

        var searchTerm = this.cleanSearchTerms(args.terms);

        var spell = new SpellModel();

        console.log("Searching for: " + searchTerm);

        console.log("Searching " + spells.List.length + " spells in memory.");

        var msr = spells.List.filter(obj => { return obj.Name === searchTerm });

        if(msr.length == 1)
        {
            console.log("Found in memory.");

            msr = msr[0]
            
            spell.Name = msr.Name;
            spell.Level = msr.Level;
            spell.CastingTime = msr.CastingTime;
            spell.Ritual = msr.Ritual;
            spell.Concentration = msr.Concentration;
            spell.Range = msr.Range;
            spell.VerbalComponent = msr.VerbalComponent;
            spell.SemanticComponent = msr.SemanticComponent;
            spell.MaterialComponent = msr.MaterialComponent;
            spell.Duration = msr.Duration;
            spell.Description = msr.Description;
            spell.SourceBook = msr.SourceBook;
            spell.SourcePage = msr.SourcePage;
            spell.Materials = msr.Materials;
            spell.Classes = msr.Classes;
            spell.School = msr.School;
            spell.DataSource = "Memory";

            this.spellResponse(message, spell);

        }
        // else if(msr.length < 1)
        // {
        //     console.log('requesting from external source');

        //     http.get(baseURL + searchTerm, (resp) =>
        //     {
        //         resp.on('data', (chunk) => {data += chunk;});

        //         resp.on('end', () => {this.searchResponse(message, data);});

        //         resp.on('error', (err) => {console.log('Error: ' + err.message)});
        //     });
        // }
    }

    cleanSearchTerms(terms)
    {
        var tarray = terms.split(/\s+/);

        var output = '';

        for(var i=0;i<tarray.length;i++)
        {
            if(!["of", "or", "in", "if", "an", "a", "for", "by", "and", "the", "without"].includes(tarray[i].toLowerCase()))
               output += tarray[i].capitalize() + " ";
            else
                output += tarray[i] + " ";
        }

        return output.trim();
    }

    searchResponse(message, result)
    {
        result = JSON.parse(result);

        if(result.count < 1)
            return message.reply('Unable to locate a spell by that name, perhaps it isn\'t in the SRD.');
        else   
            console.log("Found!");
        
        var data = '';

        http.get(result.results[0].url, (resp) =>
        {
            resp.on('data', (chunk) => {data += chunk;});

            resp.on('end', () =>
            {
                data = JSON.parse(data);
                var spell = new SpellModel();
                spell.Name = data.name;
                spell.Level = (row.Level === -1)?'Cantrip':row.Level;
                spell.CastingTime = data.casting_time;
                spell.Ritual = data.ritual;
                spell.Concentration = data.concentration;
                spell.Range = data.range;
                spell.VerbalComponent = data.VerbalComponent;
                spell.SemanticComponent = data.SemanticComponent;
                spell.MaterialComponent = data.MaterialComponent;
                spell.Duration = data.duration;
                spell.Description = data.desc.join() + ((data.higher_level === undefined)?"":data.higher_level[0]);
                spell.School = data.school.name;
                spell.SourceBook = "Players Handbook";
                spell.SourcePage = data.page.split(' ')[1].trim();

                spell.Materials = (data.material === undefined)?"None":data.material;

                for(var i =0; i < data.classes.length; i++)
                    spell.Classes.push(data.classes[i].name);
                
                spell.DataSource = "dnd5eapi.com";

                spells.List.push(spell);

                spell.SaveToDatabase();

                this.spellResponse(message, spell);
            });

            resp.on('error', (err) => {console.log('Error: ' + err.message)});
        })
    }

    spellResponse(message, data)
    {
        return message.reply(data.toDiscordEmbed());
    }
}

module.exports = SpellCommand;