const { Command } = require('discord-akairo');
const { Discord } = require('discord.js');
const http = require("http");
const Items = require('../Data/Items.js');
const ItemModel = require("../Models/Items.js");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

class ItemCommand extends Command
{
    constructor()
    {
        super('item',
            {
                aliases: ["i", "item"],
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

        var Item = new ItemModel();
        //console.log(Items.List[160])
        console.log("Searching for: '" + searchTerm + "' - " + Items.List.length + " Items in memory.");

        var msr = Items.List.filter(obj => { return obj.Name === searchTerm });

        //console.log(msr);

        if(msr.length > 0)
        {
            console.log("Found in memory.");
            //console.log(msr[0]);
            var row = msr[0]
            
            Item.Name = row.Name;               //common
            Item.EquipmentCategory = row.EquipmentCategory;  //common
            Item.WeaponCategory = row.WeaponCategory;
            Item.WeaponRange = row.WeaponRange;
            Item.CategoryRange = row.CategoryRange;
            Item.Cost = row.Cost;               //common
            Item.Damage = row.Damage;
            Item.Range = row.Range;
            Item.Weight = row.Weight;
            Item.Properties = row.Properties;
            Item.ThrowRange = row.ThrowRange;
            Item.TwoHandedDamage = row.TwoHandedDamage;
            Item.Special = row.Special;
            Item.ArmorCategory = row.ArmorCategory;
            Item.ArmorClass = row.ArmorClass;
            Item.STRMinimum = row.STRMinimum;
            Item.StealthDisadvantage = row.StealthDisadvantage;
            Item.GearCategory = row.GearCategory;
            Item.Description = row.Description;
            Item.Contents = row.Contents;
            Item.ToolCategory = row.ToolCategory;
            Item.VehicleCategory = row.VehicleCategory;
            Item.Speed = row.Speed;
            Item.Capacity = row.Capacity;

            Item.DataSource = row.DataSource;
            Item.RetrievedOn = row.RetrievedOn;
            
            //Item.DataSource = "Memory";

            this.ItemResponse(message, Item);

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
            return message.reply('Unable to locate a Item by that name, perhaps it isn\'t in the SRD.');
        
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

    ItemResponse(message, data)
    {
        data.toDiscordEmbed().forEach(function(e, i){message.reply(e);});
        
        //return message.reply();
    }
}

module.exports = ItemCommand;