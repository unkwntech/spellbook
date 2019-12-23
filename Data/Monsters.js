const sqlite3 = require('sqlite3').verbose();
const MonsterModel = require("../Models/Monsters.js");

let LoadMonstersToMemory = function()
{
    let db = new sqlite3.Database('./Data/db.sqlite', sqlite3.OPEN_READONLY);
    let sql = "SELECT * FROM Monsters";

    Monsters.forEach(() => {Monsters.pop()});

    db.all(sql, [], (err, rows) => 
    {
        if(err)
            throw err;

        rows.forEach((row) =>
        {
            let Monster = new MonsterModel();
            Monster.Name = row.Name;
            Monster.Size = row.Size;
            Monster.Type = row.Type;
            Monster.SubType = row.SubType;
            Monster.Alignment = row.Alignment;
            Monster.ArmorClass = row.ArmorClass;
            Monster.HitPoints = row.HitPoints;
            Monster.HitDice = row.HitDice;
            Monster.Speed = JSON.parse(row.Speed);
            Monster.Strength = row.Strength;
            Monster.Dexterity = row.Dexterity;
            Monster.Constitution = row.Constitution;
            Monster.Intelligence = row.Intelligence;
            Monster.Wisdom = row.Wisdom;
            Monster.Charisma = row.Charisma;
            Monster.Proficiencies = JSON.parse(row.Proficiencies);
            Monster.DamageVulnerabilities = JSON.parse(row.DamageVulnerabilities);
            Monster.DamageResistances = JSON.parse(row.DamageResistances);
            Monster.DamageImmunities = JSON.parse(row.DamageImmunities);
            Monster.ConditionImmunities = JSON.parse(row.ConditionImmunities);
            Monster.Senses = JSON.parse(row.Senses);
            Monster.Languages = row.Languages;
            Monster.ChallengeRating = row.ChallengeRating;
            Monster.SpecialAbilities = JSON.parse(row.SpecialAbilities);
            Monster.Actions = JSON.parse(row.Actions);
            Monster.LegendaryActions = JSON.parse(row.LegendaryActions);

            Monster.DataSource = row.DataSource;
            Monster.RetrievedOn = row.RetrievedOn;

            Monsters.push(Monster);
        });
        console.log(Monsters.length + " Monsters loaded to memory.");
    });

    db.close();
}

const Monsters = [];

LoadMonstersToMemory();

module.exports = {List: Monsters, Reload: LoadMonstersToMemory};