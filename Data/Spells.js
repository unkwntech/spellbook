const sqlite3 = require('sqlite3').verbose();
const SpellModel = require("../Models/Spell.js");

let LoadSpellsToMemory = function()
{
    let db = new sqlite3.Database('./Data/db.sqlite', sqlite3.OPEN_READONLY);
    let sql = "SELECT * FROM Spells";

    Spells.forEach(() => {Spells.pop()});

    db.all(sql, [], (err, rows) => 
    {
        if(err)
            throw err;

        rows.forEach((row) =>
        {
            let spell = new SpellModel();
            spell.Name = row.Name;
            spell.Level = (row.Level === -1)?'Cantrip':row.Level;
            spell.CastingTime = row.CastingTime;
            spell.Ritual = row.Ritual;
            spell.Concentration = row.Concentration;
            spell.Range = row.Range;
            spell.VerbalComponent = row.VerbalComponent;
            spell.SemanticComponent = row.SemanticComponent;
            spell.MaterialComponent = row.MaterialComponent;
            spell.Duration = row.Duration;
            spell.Description = row.Description;
            spell.SourceBook = row.SourceBook;
            spell.SourcePage = row.SourcePage;
            spell.Materials = row.Materials;
            spell.Classes = JSON.parse(row.Classes.replace(/\'/gi, '"'));
            spell.School = row.School;
            spell.DataSource = row.DataSource;

            Spells.push(spell);
        });
        console.log(Spells.length + " spells loaded to memory.");
    });

    db.close();
}

const Spells = [];

LoadSpellsToMemory();

module.exports = {List: Spells, Reload: LoadSpellsToMemory};