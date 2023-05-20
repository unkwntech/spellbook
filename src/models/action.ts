import { DbUtilities } from "../db-utils";
import Factory from "./factory";
import { Identifiable } from "./identifiable";
import Time from "./time";

export class Action implements Identifiable {
    public _id: string;
    public name: string;
    public source: string;
    public page: number;
    public srd: boolean;
    public basicRules: boolean;
    public fromVariant?: string;
    public time?: Time;
    public seeAlsoAction?: string[];
    public entries: {
        text: string,
        details: {
            type: string,
            name: string,
            entries: string[]
        }
    }
    
    constructor(json: any) {
        this._id = json._id;

        if(!json.name) throw new Error("name is required for action");
        else this.name = json.name;

        if(!json.source) throw new Error("source is required for action");
        else this.source = json.source;

        if(!json.page) throw new Error("page is required for action");
        else this.page = json.page;

        //is undefined in source data instead of false.
        if(!json.srd) this.srd = false;
        else this.srd = json.srd;

        //is undefined in source data instead of false.
        if(!json.basicRules) this.basicRules = false;
        else this.basicRules = json.basicRules;

        this.fromVariant = json.fromVariant;
        this.time = json.time;
        this.seeAlsoAction = json.seeAlsoAction;

        if(!json.entries) throw new Error("entries is required for action");
        else this.entries = json.entries;
    }

    public static make(json: any): Action {
        return new Action({...json, _id: DbUtilities.newGuid()});
    }

    public static getFactory(): Factory<Action> {
        return new (
            class implements Factory<Action> {
                public collectionName = 'actions';
                public getCollectionName(): string {
                    return this.collectionName;
                }
                make(json: any) {
                    return new Action({...json, _id: DbUtilities.newGuid()})
                }
            }
        )();
    }
}
