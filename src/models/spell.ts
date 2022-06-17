import Factory from "./factory";
import { Identifiable } from "./identifiable";

export default class Spell implements Identifiable {
    public _id: string;
    public name: string;
    public level: number;
    public castingTime: string;
    public ritual: boolean;
    public concentration: boolean;
    public range: string;
    public duration: string;
    public components: string;
    public materials: string;
    public school: string;
    public description: string;
    public source: string;
    public classes: string[];
    public dataSource: string;
    
    constructor(json: any) {
        this._id = json._id;
        this.name = json.name;
        this.level = json.level;
        this.castingTime = json.castingTime;
        this.ritual = json.ritual;
        this.concentration = json.concentration;
        this.range = json.range;
        this.duration = json.duration;
        this.components = json.components;
        this.materials = json.materials;
        this.school = json.school;
        this.description = json.description;
        this.source = json.source;
        this.classes = json.classes;
        this.dataSource = json.dataSource;
    }

    static getFactory(): Factory<Spell> {
        return new (class implements Factory<Spell> {
            make(json: any): Spell {
                return new Spell(json);
            }
            getCollectionName(): string {
                return 'spells';
            }
        })
    }

    public toEmbed(): object {
        return {
            color: 7419530,
            title: this.name,
            description: this.description.substring(0, 2045) + ((this.description.length > 2048)?"...":""),
             url: "https://dndbeyond.com/spells/" + this.name.replace(' ', '-'),
            fields: [
                { name: "Level", value: this.level.toString(), inline: true }, //0
                { name: "Casting Time", value: this.castingTime, inline: true }, //1
                { name: "Duration", value: this.duration, inline: true }, //2
                { name: "Components", value: this.components, inline: true }, //3
                { name: "Range", value: this.range, inline: true }, //4
                { name: "Concentration", value: (this.concentration) ? "Yes" : "No", inline: true }, //5
                { name: "Ritual", value: (this.ritual) ? "Yes" : "No", inline: true }, //6
                { name: "Classes", value: this.classes.join(", "), inline: true }, //7
                { name: "School", value: this.school, inline: true }, //8
                { name: "Materials", value: this.materials, inline: false }, //9
                { name: "Source", value: this.source, inline: false }, //10
            ]
        };
    }

}