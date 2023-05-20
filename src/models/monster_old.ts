import Factory from "./factory";
import { Identifiable } from "./identifiable";

export class MonsterDetail {
    public name: string;
    public desc?: string;
    public value?: string;

    constructor(json: any) {
        this.name = json.name;
        this.desc = json.desc;
        this.value = json.value;
    }
}

export default class Monster implements Identifiable {
    public _id: string;
    public name: string;
    public size: string;
    public type: string;
    public subType: string;
    public alignmnet: string;
    public armorClass: number;
    public avgHitPoints: number;
    public hitPointCalculationMethod: string;
    public hitDie: string;
    public speed: string[];
    public str: number;
    public dex: number;
    public con: number;
    public int: number;
    public wis: number;
    public cha: number;
    public proficiencies: MonsterDetail[];
    public damageVulnerabilities: string[];
    public damageResistances: string[];
    public damageImmunities: string[];
    public conditionImmunities: string[];
    public senses: string[];
    public languages: string[];
    public challengeRating: number;
    public specialAbilities: MonsterDetail[];
    public actions: MonsterDetail[];
    public legendaryActions: MonsterDetail[];
    public dataSource: string;
    
    
    constructor(json: any) {
        if(!json._id) throw new Error("id is required for Monster")
        this._id = json._id;
        this.name = json.name;
        this.size = json.size;
        this.type = json.type;
        this.subType = json.subType;
        this.alignmnet = json.alignmnet;
        this.armorClass = json.armorClass;
        this.avgHitPoints = json.avgHitPoints;
        this.hitPointCalculationMethod = json.hitPointCalculationMethod;
        this.hitDie = json.hitDie;
        this.speed = json.speed;
        this.str = json.str;
        this.dex = json.dex;
        this.con = json.con;
        this.int = json.int;
        this.wis = json.wis;
        this.cha = json.cha;
        this.proficiencies = json.proficiencies.map((p: any) => new MonsterDetail(p));
        this.damageVulnerabilities = json.damageVulnerabilities;
        this.damageResistances = json.damageResistances;
        this.damageImmunities = json.damageImmunities;
        this.conditionImmunities = json.conditionImmunities;
        this.senses = json.senses;
        this.languages = json.languages;
        this.challengeRating = json.challengeRating;
        this.specialAbilities = json.specialAbilities.map((s: any) => new MonsterDetail(s));
        this.actions = json.actions.map((a: any) => new MonsterDetail(a));
        this.legendaryActions = json.legendaryActions.map((l: any) => new MonsterDetail(l));
        this.dataSource = json.dataSource;
    }

    static getFactory(): Factory<Monster> {
        return new (class implements Factory<Monster> {
            make(json: any): Monster {
                return new Monster(json);
            }
            getCollectionName(): string {
                return 'monsters';
            }
        })
    }

    public toEmbed(): object[] {
        let embeds: object[] = [];
        embeds.push({
            color: 7419530,
            title: this.name,
            //description: this.description.substring(0, 2045) + ((this.description.length > 2048)?"...":""),
            //url: "https://dndbeyond.com/monsters/" + this.name.replace(' ', '-'),
            fields: [
                {name: "Armor Class", value: this.armorClass.toString(), inline: true},
                {name: "Hit Points", value: this.avgHitPoints.toString() + ` (${this.hitPointCalculationMethod})`, inline: true},
                {name: "Speed", value: this.speed.join("\n"), inline: true},
                {name: "STR", value: this.str.toString(), inline: true},
                {name: "DEX", value: this.dex.toString(), inline: true},
                {name: "CON", value: this.con.toString(), inline: true},
                {name: "INT", value: this.int.toString(), inline: true},
                {name: "WIS", value: this.wis.toString(), inline: true},
                {name: "CHA", value: this.cha.toString(), inline: true},
                {name: "Proficiencies", value: this.proficiencies.map(p => `${p.name} +${p.value}`).join("\n"), inline: true},
                {name: "Languages", value: this.languages.join("\n"), inline: true},
                {name: "Challenge Rating", value: this.challengeRating.toString(), inline: true}
            ],
            footer: {
                "text": `Data from ${this.dataSource}`
            }
        });

        if(this.actions.length > 0)
        embeds.push({
            color: 7419530,
            title: `${this.name} Actions`,
            fields: this.actions.map(a => {return {name: a.name, value: a.desc}})
        });

        if(this.legendaryActions.length > 0)
        embeds.push({
            color: 7419530,
            title: `${this.name} Legendary Actions`,
            fields: this.legendaryActions.map(l => { return {name: l.name, value: l.desc}})
        });

        if(this.specialAbilities.length > 0)
        embeds.push({
            color: 7419530,
            title: `${this.name} Special Abilities`,
            fields: this.specialAbilities.map(s => { return {name: s.name, value: s.desc}})
        });

        if(this.damageImmunities.length > 0 || this.damageResistances.length > 0 ||
            this.damageVulnerabilities.length > 0 || this.conditionImmunities.length > 0) {
            let resists: object[] = [];
            if(this.damageImmunities.length > 0)
                resists.push({name: "Damage Immunities", value: this.damageImmunities.join("\n")});
            if(this.damageResistances.length)
                resists.push({name: "Damage Resistances", value: this.damageResistances.join("\n")});
            if(this.damageVulnerabilities.length > 0)
                resists.push({name: "Damage Vulnerabilities", value: this.damageVulnerabilities.join("\n")});
            if(this.conditionImmunities.length > 0)
                resists.push({name: "Damage Immunities", value: this.conditionImmunities.join("\n")});

            embeds.push({
                color: 7419530,
                title: `${this.name} Special Abilities`,
                fields: resists
            });
        }

        return embeds;

    }

}