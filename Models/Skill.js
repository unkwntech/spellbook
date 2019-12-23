const sqlite3 = require('sqlite3').verbose();
const skills = require('../Data/Skills.js');

class SkillModel {
    constructor() {
        this.Name = '';
        this.Attribute = null;
        this.Description = '';

        this.toDiscordEmbed = function () {
            return [{
            embed: {
                color: 7419530,
                title: this.Name + " (" + this.Attribute + ")",
                description: this.Description,
            }
            }];
        };
    }
}

module.exports = SkillModel;