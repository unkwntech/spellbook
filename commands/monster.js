const { Command } = require('discord-akairo');
const { Discord } = require('discord.js');
const http = require("http");
const Monsters = require('../Data/Monsters.js');
const MonsterModel = require("../Models/Monsters.js");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

class MonsterCommand extends Command
{
    constructor()
    {
        super('monster',
            {
                aliases: ["m", "monster"],
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

        var Monster = new MonsterModel();

        console.log("Searching for: " + searchTerm + " - " + Monsters.List.length + " Monsters in memory.");

        var msr = Monsters.List.filter(obj => { return obj.Name === searchTerm });

        if(msr.length > 0)
        {
            console.log("Found in memory.");
            //console.log(msr[0]);
            var row = msr[0]
            
            Monster.Name = row.Name;
            Monster.Size = row.Size;
            Monster.Type = row.Type;
            Monster.SubType = row.SubType;
            Monster.Alignment = row.Alignment;
            Monster.ArmorClass = row.ArmorClass;
            Monster.HitPoints = row.HitPoints;
            Monster.HitDice = row.HitDice;
            Monster.Speed = row.Speed;
            Monster.Strength = row.Strength;
            Monster.Dexterity = row.Dexterity;
            Monster.Constitution = row.Constitution;
            Monster.Intelligence = row.Intelligence;
            Monster.Wisdom = row.Wisdom;
            Monster.Charisma = row.Charisma;
            Monster.Proficiencies = row.Proficiencies;
            Monster.DamageVulnerabilities = row.DamageVulnerabilities;
            Monster.DamageResistances = row.DamageResistances;
            Monster.DamageImmunities = row.DamageImmunities;
            Monster.ConditionImmunities = row.ConditionImmunities;
            Monster.Senses = row.Senses;
            Monster.Languages = row.Languages;
            Monster.ChallengeRating = row.ChallengeRating;
            Monster.SpecialAbilities = row.SpecialAbilities;
            Monster.Actions = row.Actions;
            Monster.LegendaryActions = row.LegendaryActions;

            Monster.DataSource = row.DataSource;
            Monster.RetrievedOn = row.RetrievedOn;
            
            //Monster.DataSource = "Memory";

            this.MonsterResponse(message, Monster);

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
            return message.reply('Unable to locate a Monster by that name, perhaps it isn\'t in the SRD.');
        
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

    MonsterResponse(message, data)
    {
        data.toDiscordEmbed().forEach(function(e, i){message.reply(e);});
        
        //return message.reply();
    }
}

module.exports = MonsterCommand;