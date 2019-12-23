const sqlite3 = require('sqlite3').verbose();
const items = require('../Data/Items.js');

class ItemModel {
    constructor() {
        this.Name = null;               //common
        this.EquipmentCategory = null;  //common
        this.WeaponCategory = null;
        this.WeaponRange = null;
        this.CategoryRange = null;
        this.Cost = null;               //common
        this.Damage = null;
        this.Range = null;
        this.Weight = null;
        this.Properties = null;
        this.ThrowRange = null;
        this.TwoHandedDamage = null;
        this.Special = null;
        this.ArmorCategory = null;
        this.ArmorClass = null;
        this.STRMinimum = null;
        this.StealthDisadvantage = null;
        this.GearCategory = null;
        this.Description = null;
        this.Contents = null;
        this.ToolCategory = null;
        this.VehicleCategory = null;
        this.Speed = null;
        this.Capacity = null;

        this.toDiscordEmbed = function ()
        {
            var embeds = [{
                embed:
                {
                    color: 7419530,
                    title: this.Name.replace("%27", "'"),
                    description: this.EquipmentCategory,
                    fields: []
                    // url: "https://dndbeyond.com/spells/" + this.Name.replace(' ', '-'),
                }
            }];
            switch(this.EquipmentCategory)
            {
                case 'Weapon':
                    embeds[0].embed.description = this.WeaponCategory + " " + this.WeaponRange + " " + this.EquipmentCategory + ((this.Description.length > 0)?"\n" + this.Description:"");
                    embeds[0].embed.fields.push({name: "Damage", value: this.Damage.damage_dice + "+" + this.Damage.damage_bonus + " " + this.Damage.damage_type.name , inline: true});
                    if(this.TwoHandedDamage.damage_dice != undefined)
                        embeds[0].embed.fields.push({name: "2 Handed Damage", value: this.TwoHandedDamage.damage_dice + "+" + this.TwoHandedDamage.damage_bonus + " " + this.TwoHandedDamage.damage_type.name , inline: true});
                    embeds[0].embed.fields.push({name: "Range", value: this.Range.normal + ((this.Range.long != undefined)?"/" + this.Range.long:"") + "ft", inline: true});
                    embeds[0].embed.fields.push({name: "Properties", value: (this.Properties.map(function(e){return e.name}).join(",")).replace("%27", "'"), inline: true});
                    embeds[0].embed.fields.push({name: "Weight", value: this.Weight + "lbs", inline: true});
                    break;
                case 'Armor':
                    embeds[0].embed.description = this.ArmorCategory + " " + this.EquipmentCategory + ((this.Description.length > 0)?"\n" + this.Description:"");
                    embeds[0].embed.fields.push({name: "Armor Class", value: this.ArmorClass.base + ((this.ArmorClass.dex_bonus === true)?"+DEX":""), inline: true});
                    embeds[0].embed.fields.push({name: "Min STR", value: this.STRMinimum, inline: true});
                    embeds[0].embed.fields.push({name: "Stealth Disadvantage", value: (this.StealthDisadvantage?"Yes":"No"), inline: true});
                    embeds[0].embed.fields.push({name: "Weight", value: this.Weight + "lbs", inline: true});
                    break;
                case 'Adventuring Gear':
                    embeds[0].embed.description = this.EquipmentCategory + ((this.Description.length > 0)?"\n" + this.Description:"");
                    embeds[0].embed.fields.push({name: "Weight", value: this.Weight + "lbs", inline: true});
                    break;
                case 'Tools':
                    embeds[0].embed.description = this.ToolCategory + ((this.Description.length > 0)?"\n" + this.Description:"");
                    embeds[0].embed.fields.push({name: "Weight", value: this.Weight + "lbs", inline: true});
                    break;
                case 'Mounts and Vehicles':
                    embeds[0].embed.description = this.EquipmentCategory + ((this.Description.length > 0)?"\n" + this.Description:"");
                    embeds[0].embed.fields.push({name: "Capacity", value: this.Capacity, inline: true});
                    embeds[0].embed.fields.push({name: "Speed", value: this.Speed.quantity + this.Speed.unit, inline: true});
                    break;
            }

            embeds[0].embed.fields.push({name: "Cost", value: this.Cost.quantity + this.Cost.unit, inline: true});

            return embeds;
        };
    }
}

module.exports = ItemModel;