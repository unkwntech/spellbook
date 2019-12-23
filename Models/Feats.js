const sqlite3 = require('sqlite3').verbose();
const feats = require('../Data/Feats.js');

class FeatModel {
    constructor() {
        this.Name = '';
        this.Level = -1;
        this.Description = '';
        this.Classes = [];
        this.DataSource = '';

        this.toDiscordEmbed = function () {
            return {
            embed: {
                color: 7419530,
                title: this.Name,
                description: this.Description.substring(0, 2045) + ((this.Description.length > 2048)?"...":""),
               // url: "https://dndbeyond.com/spells/" + this.Name.replace(' ', '-'),
                fields: [
                    { name: "Level", value: this.Level, inline: true }, //0
                    { name: "Classes", value: this.Classes.join(", "), inline: true } //7
                ]
            }
            };
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

module.exports = FeatModel;