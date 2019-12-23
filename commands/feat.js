const { Command } = require('discord-akairo');
const { Discord } = require('discord.js');
const http = require("http");
const feats = require('../Data/Feats.js');
const FeatModel = require("../Models/Feats.js");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

class FeatCommand extends Command
{
    constructor()
    {
        super('feat',
            {
                aliases: ["cf", "classfeature"],
                split: 'none',
                args: 
                [
                    {id:'terms', type: "string", default: null}
                ]
            });
    }

    exec(message, args)
    {
        //var baseURL = "http://www.dnd5eapi.co/api/spells?name=";

        //var data = '';

        var searchTerm = this.cleanSearchTerms(args.terms);

        var feat = new FeatModel();

        console.log("Searching for: " + searchTerm + " - " + feats.List.length + " feats in memory.");

        var msr = feats.List.filter(obj => { return obj.Name === searchTerm });

        if(msr.length > 0)
        {
            console.log("Found in memory.");

            msr = msr[0]
            
            feat.Name = msr.Name;
            feat.Level = msr.Level;
            feat.Description = msr.Description;
            feat.Classes = msr.Classes;
            //feat.DataSource = "Memory";

            this.featResponse(message, feat);

        }/*
        else if(msr.length < 1)
        {
            console.log('requesting from external source');

            http.get(baseURL + searchTerm, (resp) =>
            {
                resp.on('data', (chunk) => {data += chunk;});

                resp.on('end', () => {this.searchResponse(message, data);});

                resp.on('error', (err) => {console.log('Error: ' + err.message)});
            });
        }*/
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

    searchResponse(message, result)
    {
        result = JSON.parse(result);

        if(result.count < 1)
            return message.reply('Unable to locate a feat by that name, perhaps it isn\'t in the SRD.');
        
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
                spell.Components = data.components;
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

    featResponse(message, data)
    {
        return message.reply(data.toDiscordEmbed());
    }
}

module.exports = FeatCommand;