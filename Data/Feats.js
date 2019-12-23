const sqlite3 = require('sqlite3').verbose();
const FeatModel = require("../Models/Feats.js");

let LoadFeatsToMemory = function()
{
    let db = new sqlite3.Database('./Data/db.sqlite', sqlite3.OPEN_READONLY);
    let sql = "SELECT * FROM ClassFeatures";

    Feats.forEach(() => {Feats.pop()});

    db.all(sql, [], (err, rows) => 
    {
        if(err)
            throw err;

        rows.forEach((row) =>
        {
            let feat = new FeatModel();
            feat.Name = row.Name;
            feat.Level = (row.Level === -1)?'Cantrip':row.Level;
            feat.Description = row.Description;
            feat.Classes = row.Classes.split(',');
            feat.DataSource = row.DataSource;

            Feats.push(feat);
        });
        console.log(Feats.length + " feats loaded to memory.");
    });

    db.close();
}

const Feats = [];

LoadFeatsToMemory();

module.exports = {List: Feats, Reload: LoadFeatsToMemory};