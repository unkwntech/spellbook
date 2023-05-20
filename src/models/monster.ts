import { DbUtilities } from "../db-utils";
import Factory from "./factory";
import { Identifiable } from "./identifiable";
import Time from "./time";

export class Monster implements Identifiable {
    public _id: string;
    public _copy?: {_mod?:{}, _trait?:{}, name: string, source: string};
    public _isCopy: boolean;
    public _versions?: {}[];
    public ac?: number | {};
    public action?: {}[];
    public actionNote?: string;
    public actionTags?: string[];
    public alias?: string;
    public alignment?: string[] | {}[];
    public alignmentPrefix?: string;
    public altArt?: {name: string, page?: number, source: string}[];
    public basicRules: boolean;
    public bonus?:{name: string, entries:string[]}[];
    public cha?: number;
    public con?: number;
    public conditionImmune?: string[];
    public conditionInflict?: string[];
    public conditionInflictLegendary?: string[];
    public conditionInflictSpell?: string[];
    public cr?: string | {coven?: string, cr:string, lair?:string, xp?:number};
    public damageTags?: string[];
    public damageTagsLegendary?: string[];
    public damageTagsSpell?: sring[];
    public dex?: number;
    public dragonAge?: string;
    public dragonCastingColor?: string;
    public environment?: string[];
    public familiar: boolean;
    public group?: string[];
    public hasFluff: boolean;
    public hasFliffImages: boolean;
    public hasToken: boolean;
    public hp?: {average?:number, formula?:string, special?:string};
    public immune?: string[] | {cond?:boolean, immune?:string[], note?: string, special?: string}[];
    public int?: number;
    public isNamedCreature: boolean;
    public isNpc: boolean;
    public languages?: string[];
    public languageTags?: string[];
    public legendary?: {entries?: string[], name: string}[];
    public legendaryActions?: number;
    public legendaryGroups?: {name: string, source: string};
    


    
    constructor(json: any) {
        this._id = json._id;

    }

    public static make(json: any): Monster {
        return new Monster({...json, _id: DbUtilities.newGuid()});
    }

    public static getFactory(): Factory<Monster> {
        return new (
            class implements Factory<Monster> {
                public collectionName = 'monsters';
                public getCollectionName(): string {
                    return this.collectionName;
                }
                make(json: any) {
                    return new Monster({...json, _id: DbUtilities.newGuid()})
                }
            }
        )();
    }
}
