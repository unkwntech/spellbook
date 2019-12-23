const sqlite3 = require('sqlite3').verbose();
const Monsters = require('../Data/Monsters.js');

class MonsterModel {
    constructor() {
        this.Name = '';
        this.Size = '';
        this.Type = '';
        this.SubType = '';
        this.Alignment = '';
        this.ArmorClass = -1;
        this.HitPoints = -1;
        this.HitDice = '';
        this.Speed = '';
        this.Strength = -1;
        this.Dexterity = -1;
        this.Constitution = -1;
        this.Intelligence = -1;
        this.Wisdom = -1;
        this.Charisma = -1;
        this.Proficiencies = [];
        this.DamageVulnerabilities = [];
        this.DamageResistances = [];
        this.DamageImmunities = [];
        this.conditionImmunities = [];
        this.Languages = [];
        this.ChallengeRating = -1;
        this.SpecialAbilities = [];
        this.Actions = [];
        this.LegendaryActions = [];

        this.DataSource = '';
        this.RetrievedOn = -1;

        this.toDiscordEmbed = function () {

            var embeds = [];

            var speed = [];
            var specialAbilities = [];
            var actions = [];
            var legendaryActions = [];
            var savingThrows = [];
            var skills = [];
            var senses = [];

            if(this.Speed.walk !== undefined)
                speed.push("Walk " + this.Speed.walk);
            if(this.Speed.swim !== undefined)
                speed.push("Swim " + this.Speed.swim);
            if(this.Speed.fly !== undefined)
                speed.push("Fly " + this.Speed.fly);
            if(this.Speed.burrow !== undefined)
                speed.push("Burrow " + this.Speed.burrow);
            if(this.Speed.hover !== undefined)
                speed.push("Hover " + this.Speed.hover);
            if(this.Speed.climb !== undefined)
                speed.push("Climb " + this.Speed.climb);
            
            this.Proficiencies.forEach(function(p, i)
            {
                if(p.name.startsWith("Saving"))
                {
                    savingThrows.push(p.name.match(/(\w{3}$)/gi)[0] + " +" + p.value);
                }
                if(p.name.startsWith("Skill"))
                {
                    skills.push(p.name.match(/\:\s(\w+)/i)[1] + " +" + p.value);
                }
            });

            if(this.Senses.darkvision !== undefined)
                senses.push("Darkvision " + this.Senses.darkvision);
            if(this.Senses.passive_perception !== undefined)
                senses.push("passive Perception " + this.Senses.passive_perception);
            if(this.Senses.blindsight !== undefined)
                senses.push("Blindsight " + this.Senses.blindsight);
            if(this.Senses.truesight !== undefined)
                senses.push("Truesight " + this.Senses.truesight);
            if(this.Senses.tremorsense !== undefined)
                senses.push("Tremorsense " + this.Senses.tremorsense);

            var stats = [
                { name: "Armor Class", value: this.ArmorClass, inline: true }, //0
                { name: "Hit Points", value: this.HitPoints, inline: true },
                { name: "Speed", value: speed.join(","), inline: true },
                { name: "\u200b", value: "\u200b"},//Empty Line
                { name: "STR", value: this.Strength, inline: true },
                { name: "DEX", value: this.Dexterity, inline: true }, //5
                { name: "CON", value: this.Constitution, inline: true },
                { name: "INT", value: this.Intelligence, inline: true },
                { name: "WIS", value: this.Wisdom, inline: true },
                { name: "CHA", value: this.Charisma, inline: true },
                { name: "\u200b", value: "\u200b"},//Empty Line //10
            ];
            if(savingThrows.length > 0)
                stats.push({ name: "Saving Throws", value: savingThrows.join(", "), inline: true });
            if(skills.length > 0)
                stats.push({ name: "Skills", value: skills.join(", "), inline: true });

            stats.push({ name: "Languages", value: this.Languages, inline: true });
            stats.push({ name: "Challenge Rating", value: this.ChallengeRating + "", inline: true }); //15

            this.SpecialAbilities.forEach(function(a, i)
            {
                specialAbilities.push({name: a.name, value: a.desc});
            });

            this.Actions.forEach(function(a, i)
            {
                actions.push({name: a.name, value: a.desc});
            });

            this.LegendaryActions.forEach(function(a, i)
            {
                legendaryActions.push({name: a.name, value: a.desc});
            });

            embeds.push({
                embed: {
                    color: 4874511,
                    title: this.Name,
                    description: this.Size + " " + this.Type + ((this.SubType === undefined || this.SubType === null || this.SubType === 'null')?"":" " + this.SubType) + ", " + this.Alignment,
                   // url: "https://dndbeyond.com/spells/" + this.Name.replace(' ', '-'),
                     fields: stats,
                     footer: {text: "Data from " + this.DataSource}
                }});

            if(specialAbilities.length > 0)
                embeds.push({embed: {
                    color: 4874511,
                    title: this.Name + "(cont.)",
                    description: "**Special Abilities**",
                    fields: specialAbilities
                }});
            if(actions.length > 0)
                embeds.push({embed: {
                    color: 4874511,
                    title: this.Name + "(cont.)",
                    description: "**Actions**",
                    fields: actions
                }});
            if(legendaryActions.length > 0)
                embeds.push({embed: {
                    color: 4874511,
                    title: this.Name + "(cont.)",
                    description: "**Legendary Actions**",
                    fields: legendaryActions
                }});
            
            return embeds;
        };

        this.SaveToDatabase = function()
        {
            /*
            let db = new sqlite3.Database('./Data/db.sqlite', sqlite3.OPEN_READWRITE);
            var sql = "INSERT INTO Spells (Name, Description, Level, CastingTime, Duration, Components, Range, Concentration, Ritual, Classes, School, Materials, SourceBook, SourcePage, DataSource, RetrievedOn) VALUES (";
            sql += "'" + this.Name + "', ";
            sql += "'" + this.Description + "', ";
            sql += this.Level + ", ";
            sql += "'" + this.CastingTime + "', ";
            sql += "'" + this.Duration + "', ";
            sql += "'" + this.Components.join(",") + "', ";
            sql += "'" + this.Range + "', ";
            sql += ((this.Concentration)?1:0) + ", ";
            sql += ((this.Ritual)?1:0) + ", ";
            sql += "'" + this.Classes.join(",") + "', ";
            sql += "'" + this.School + "', ";
            sql += "'" + this.Materials + "', ";
            sql += "'" + this.SourceBook + "', ";
            sql += "'" + this.SourcePage + "', ";
            sql += "'" + this.DataSource + "', ";
            sql += Date.now() + ")";

            try
            {
                db.run(sql, (err) => {});
            }
            catch(e)
            {
                if(e.errno == 19)
                {
                    console.log("Attempted to insert duplicate spell.");
                }
            }

            console.log("New Spell Added to Database");

            //spells.Reload();

            //console.log("Spells in memory reloaded");
            */
        }
    }
}

module.exports = MonsterModel;