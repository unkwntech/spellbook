const sqlite3 = require('sqlite3').verbose();
const spells = require('../Data/Spells.js');

class SpellModel {
    constructor() {
        this.Name = '';
        this.Level = -1;
        this.CastingTime = '';
        this.Ritual = false;
        this.Concentration = false;
        this.Range = '';
        this.VerbalComponent = false;
        this.SemanticComponent = false;
        this.MaterialComponent = false;
        this.Components = [];
        this.Duration = '';
        this.Description = '';
        this.SourceBook = '';
        this.SourcePage = -1;
        this.Materials = '';
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
                    { name: "Casting Time", value: this.CastingTime, inline: true }, //1
                    { name: "Duration", value: this.Duration, inline: true }, //2
                    { name: "Components", value: this.getComponents(), inline: true }, //3
                    { name: "Range", value: this.Range, inline: true }, //4
                    { name: "Concentration", value: (this.Concentration) ? "Yes" : "No", inline: true }, //5
                    { name: "Ritual", value: (this.Ritual) ? "Yes" : "No", inline: true }, //6
                    { name: "Classes", value: this.Classes.join(", "), inline: true }, //7
                    { name: "School", value: this.School, inline: true }, //8
                    { name: "Materials", value: this.Materials, inline: false }, //9
                    { name: "Source", value: this.SourceBook + " p." + this.SourcePage, inline: false }, //10
                ]
            }
            };
        };
    }
    getComponents = function()
    {
        return ((this.VerbalComponent)?"V":"") + ((this.SemanticComponent)?"S":"") + ((this.MaterialComponent)?"M":"");
    }
}

module.exports = SpellModel;