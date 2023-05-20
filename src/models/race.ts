import { DbUtilities } from "../db-utils";
import Factory from "./factory";
import { Identifiable } from "./identifiable";
import Time from "./time";

export class Race implements Identifiable {
    public _id: string;
    public _copy?: {_mod:{entries?:{}[]}, _preserve?:{reprintedAs: boolean}, name: string, source: string};
    public _versions?: {}[];
    public ability?: {
        cha?:number;
        con?:number;
        dex?:number;
        int?:number;
        str?:number;
        wis?:number;

        hidden?:boolean;

        choose?: {
            amount?: number,
            from: string[],
            count?: number
        }
    }[];
    public additionalSources?: {page: number, source: string}[];
    public additionalSpells?: {ability?: string, innate?: {}, known?:{}}[];
    public age?: {mature?: number, max: number};
    public armorProficiencies?: {light: number};
    public basicRules: boolean;
    public blindsight?: number;
    public conditionImmune?: string[];
    public creatureTypes?: string[];
    public creatureTypeTag?: string[];
    public darkvision?: number;
    public entities?: {}[];
    public feats?: {any: number}[];
    public hasFluff: boolean;
    public hasFluffImages: boolean;
    public heightAndWeight?: {baseHeigh: number, baseWeight: number, heightMod: string, weightMod: string};
    public immune?: string[];
    public languageProficiencies?: {}[];
    public lineage?: string;
    public name: string;
    public otherSources?: {page?: number, source: string}[];//
    public page: number;
    public reprintedAs?: string[];
    public resist?: string[];
    public size?: string;
    public skillProficiencies?: {}[];
    public soundClip?: {path: string, type: string};
    public source: string;
    public speed?: number;
    public srd: boolean;
    public toolProficiencies?: {any?: number, "musical instrument"?: boolean}[];
    public traitTags?: string[];
    public vulnerable?: string[];
    public weaponProficiencies?: {}[];


    
    constructor(json: any) {
        this._id = json._id;
        this._copy = json._copy;
        this._versions = json._versions;
        this.ability = json.ability;
        this.additionalSources = json.additionalSources;
        this.additionalSpells = json.additionalSpells;
        this.age = json.age;
        this.armorProficiencies = json.armorProficiencies;
        
        if(!json.basicRules) this.basicRules = false;
        else this.basicRules = json.basicRules;

        this.blindsight = json.blindsight;
        this.conditionImmune = json.conditionImmune;
        this.creatureTypes = json.creatureTypes;
        this.creatureTypeTag = json.creatureTypeTag;
        this.darkvision = json.darkvision;
        this.entities = json.entities;
        this.feats = json.feats;

        if(!json.hasFluff) this.hasFluff = false;
        else this.hasFluff = json.hasFluff;

        if(!json.hasFluffImages) this.hasFluffImages = false;
        else this.hasFluffImages = json.hasFluffImages;

        this.heightAndWeight = json.heightAndWeight;
        this.immune = json.immune;
        this.languageProficiencies = json.languageProficiencies;
        this.lineage = json.lineage;
        
        if(!json.name) throw new Error("name is required for race");
        else this.name = json.name;

        this.otherSources = json.otherSources;

        if(!json.page) throw new Error("page is required for race");
        else this.page = json.page;

        this.reprintedAs = json.reprintedAs;
        this.resist = json.resist;
        this.size = json.size;
        this.skillProficiencies = json.skillProficiencies;
        this.soundClip = json.soundClip;

        if(!json.source) throw new Error("source is required for deity");
        else this.source = json.source;

        this.speed = json.speed;

        if(!json.srd) this.srd = false;
        else this.srd = json.srd;

        this.toolProficiencies = json.toolProficiencies;
        this.traitTags = json.traitTags;
        this.vulnerable = json.vulnerable;
        this.weaponProficiencies = json.weaponProficiencies;
    }

    public static make(json: any): Race {
        return new Race({...json, _id: DbUtilities.newGuid()});
    }

    public static getFactory(): Factory<Race> {
        return new (
            class implements Factory<Race> {
                public collectionName = 'races';
                public getCollectionName(): string {
                    return this.collectionName;
                }
                make(json: any) {
                    return new Race({...json, _id: DbUtilities.newGuid()})
                }
            }
        )();
    }
}
