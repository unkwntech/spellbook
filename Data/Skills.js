const sqlite3 = require('sqlite3').verbose();
const SkillModel = require("../Models/Skill.js");

let LoadSkillsToMemory = function()
{
    let db = new sqlite3.Database('./Data/db.sqlite', sqlite3.OPEN_READONLY);
    let sql = "SELECT * FROM Skills";

    Skills.forEach(() => {Skills.pop()});

    db.all(sql, [], (err, rows) => 
    {
        if(err)
            throw err;
        
        rows.forEach((row) =>
        {
            let skill = new SkillModel();
            skill.Name = row.Name;
            skill.Description = row.Description;
            skill.Attribute = row.Attribute;

            Skills.push(skill);
        });

        console.log(Skills.length + " skills loaded to memory.");
    });

    db.close();
}

const Skills = [];

LoadSkillsToMemory();

module.exports = {List: Skills, Reload: LoadSkillsToMemory};