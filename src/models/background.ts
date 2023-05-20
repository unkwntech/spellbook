import { DbUtilities } from "../db-utils";
import Factory from "./factory";
import { Identifiable } from "./identifiable";
import Time from "./time";

export class Background implements Identifiable {
    public _id: string;
    public copy?: {_mod: {}, name: string, source: string};
    public additionalSources?: {page: number, source: string};
    public additionalSpells?: {expanded: {
        s0?:string[],
        s1?:string[],
        s2?:string[],
        s3?:string[],
        s4?:string[],
        s5?:string[]
    }};
    public basicRules?: boolean;
    public entries?: {}[];//wtf
    public feats?: {}[];//wtf
    public hasFluff: boolean;
    public hasFluffImages?: boolean;
    public languageProficiencies?: {}[];//
    public name: string;
    public otherSources?: {page: number, source: string}[];//
    public page?: number;
    public prerequisite?: {campaign: string[]}[];//
    public skillProficiencies?: {}[];//
    public source: string;
    public srd?: boolean;
    public startingEquipment?: {}[];//
    public toolProficiencies?: [][];//

    public constructor(json: any) {
        this._id = json._id;
        this.copy = json.copy;
        this.additionalSources = json.additionalSources;
        this.additionalSpells = json.additionalSpells;
        this.basicRules = json.basicRules;
        this.entries = json.entries;
        this.feats = json.feats;

        if(!json.hasFluff) this.hasFluff = false;
        else this.hasFluff = json.hasFluff;

        this.hasFluffImages = json.hasFluffImages;
        this.languageProficiencies = json.languageProficiencies;

        if(!json.name) throw new Error("name is required for backgrounds");
        else this.name = json.name;

        this.otherSources = json.otherSources;
        this.page = json.page;
        this.prerequisite = json.prerequisite;
        this.skillProficiencies = json.skillProficiencies;

        if(!json.source) throw new Error("source is required for backgrounds");
        else this.source = json.source;

        if(!json.srd) this.srd = false;
        else this.srd = json.srd;

        this.startingEquipment = json.startingEquipment;
        this.toolProficiencies = json.toolProficiencies;
    }

    public static make(json: any): Background {
        return new Background({...json, _id: DbUtilities.newGuid()});
    }

    public static getFactory(): Factory<Background> {
        return new (
            class implements Factory<Background> {
                public collectionName = 'backgrounds';
                public getCollectionName(): string {
                    return this.collectionName;
                }
                make(json: any) {
                    return new Background({...json, _id: DbUtilities.newGuid()})
                }
            }
        )();
    }
}