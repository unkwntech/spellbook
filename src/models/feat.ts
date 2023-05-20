import { DbUtilities } from "../db-utils";
import Factory from "./factory";
import { Identifiable } from "./identifiable";
import Time from "./time";

export class Feat implements Identifiable {
    public _id: string;
    public ability?: {
        cha?:number;
        con?:number;
        dex?:number;
        int?:number;
        str?:number;
        wis?:number;

        hidden?:boolean;

        choose?: {
            amount: number,
            from: string[],
            entry?: string
        }
    }[];
    public additionalSources?: {page: number, source: string}[];
    public additionalSpells?: {ability?: string, innate?: {}, known?:{}, name?: string}[];
    public armorProficiencies?: {heavy?:boolean, light?:boolean, medium?:boolean, "shield|phb"?: boolean}[]
    public entries?: {}[];
    public expertise?: {anyProficientSkill: number}[];
    public hasFluffImages?: boolean;
    public languageProficiencies?: {}[];//
    public name: string;
    public optionalfeatureProgression?: {featureType: string, name: string, progression: {}}[];
    public otherSources?: {page: number, source: string}[];//
    public page: number;
    public prerequisite?: {}[];
    public resist?: string[];
    public savingThrowProficiencies?: {choose:{from:string[]}}[];
    public skillProficiencies?: {}[];
    public skillToolLanguageProficiencies?: {choose: {count?: number, from: string[]}[]}[];
    public source: string;
    public srd: boolean;
    public toolProficiencies?: {}[];
    public weaponProficiencies?: {}[];
    
    constructor(json: any) {
        this._id = json._id;
        this.ability = json.ability;
        this.additionalSources = json.additionalSources;
        this.additionalSpells = json.additionalSpells;
        this.armorProficiencies = json.armorProficiencies;
        this.entries = json.entries;
        this.expertise = json.expertise;
        this.hasFluffImages = json.hasFluffImages;
        this.languageProficiencies = json.languageProficiencies;

        if(!json.name) throw new Error("name is required for feat");
        else this.name = json.name;

        this.optionalfeatureProgression = json.optionalfeatureProgression;
        this.otherSources = json.otherSources;
        
        if(!json.page) throw new Error("page is required for feat");
        else this.page = json.page;

        this.prerequisite = json.prerequisite;
        this.resist = json.resist;
        this.savingThrowProficiencies = json.savingThrowProficiencies;
        this.skillProficiencies = json.skillProficiencies;
        this.skillToolLanguageProficiencies = json.skillToolLanguageProficiencies;

        if(!json.source) throw new Error("source is required for feat");
        else this.source = json.source;

        if(!json.srd) this.srd = false;
        else this.srd = json.srd;

        this.toolProficiencies = json.toolProficiencies;
        this.weaponProficiencies = json.weaponProficiencies;
        
    }

    public static make(json: any): Feat {
        return new Feat({...json, _id: DbUtilities.newGuid()});
    }

    public static getFactory(): Factory<Feat> {
        return new (
            class implements Factory<Feat> {
                public collectionName = 'feats';
                public getCollectionName(): string {
                    return this.collectionName;
                }
                make(json: any) {
                    return new Feat({...json, _id: DbUtilities.newGuid()})
                }
            }
        )();
    }
}
