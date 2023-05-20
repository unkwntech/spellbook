import { DbUtilities } from "../db-utils";
import Factory from "./factory";
import { Identifiable } from "./identifiable";
import Time from "./time";

export class Skill implements Identifiable {
    public _id: string;
    public basicRules: boolean = true;
    public entries?: {items:string[], type: string}[];
    public name: string;
    public page: number;
    public source: string = "PHB";
    public srd: boolean = true;
    
    constructor(json: any) {
        this._id = json._id;
        this.entries = json.entries;

        if(!json.name) throw new Error("name is required for skill");
        else this.name = json.name;

        if(!json.page) throw new Error("page is required for skill");
        else this.page = json.page;
    }

    public static make(json: any): Skill {
        return new Skill({...json, _id: DbUtilities.newGuid()});
    }

    public static getFactory(): Factory<Skill> {
        return new (
            class implements Factory<Skill> {
                public collectionName = 'skills';
                public getCollectionName(): string {
                    return this.collectionName;
                }
                make(json: any) {
                    return new Skill({...json, _id: DbUtilities.newGuid()})
                }
            }
        )();
    }
}
