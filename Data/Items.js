const sqlite3 = require('sqlite3').verbose();
const ItemModel = require("../Models/Items.js");

let LoadItemsToMemory = function()
{
    let db = new sqlite3.Database('./Data/db.sqlite', sqlite3.OPEN_READONLY);
    let sql = "SELECT * FROM Items";

    items.forEach(() => {items.pop()});

    db.all(sql, [], (err, rows) => 
    {
        if(err)
            throw err;

        rows.forEach((row) =>
        {
            //console.log(row);
            let item = new ItemModel();
            item.Name = row.Name.replace("%27", "'");               //common
            item.EquipmentCategory = row.EquipmentCategory;  //common
            item.WeaponCategory = row.WeaponCategory.replace("%27", "'");
            item.WeaponRange = row.WeaponRange;
            item.CategoryRange = row.CategoryRange;
            item.Cost = JSON.parse(row.Cost);               //common
            item.Damage = JSON.parse(row.Damage);
            item.Range = JSON.parse(row.Range);
            item.Weight = row.Weight;
            item.Properties = JSON.parse(row.Properties);
            item.ThrowRange = row.ThrowRange;
            item.TwoHandedDamage = JSON.parse(row.TwoHandedDamage);
            item.Special = JSON.parse(row.Special);
            item.ArmorCategory = row.ArmorCategory.replace("%27", "'");
            item.ArmorClass = JSON.parse(row.ArmorClass);
            item.STRMinimum = row.STRMinimum;
            item.StealthDisadvantage = row.StealthDisadvantage;
            item.GearCategory = row.GearCategory;
            item.Description = row.Description.replace("%27", "'");
            item.Contents = row.Contents;
            item.ToolCategory = row.ToolCategory.replace("%27", "'");
            item.VehicleCategory = row.VehicleCategory;
            item.Speed = JSON.parse(row.Speed);
            item.Capacity = row.Capacity;

            items.push(item);
        });
        console.log(items.length + " items loaded to memory.");
    });

    db.close();
}

const items = [];

LoadItemsToMemory();

module.exports = {List: items, Reload: LoadItemsToMemory};