import { DbUtilities } from "../db-utils";
import Factory from "./factory";
import { Identifiable } from "./identifiable";
import Time from "./time";

export class Deity implements Identifiable {
    public _id: string;
    public _copy?: {name: string, pantheon: string, source: string};
    public additionalSources?: {page: number, source: string};
    public alignment?: string;
    public altNames?: string[];
    public basicRules: boolean;
    public category?: string;
    public customExtensionOf?: string;
    public domains?: string[];
    public entries?: {}[];
    public name: string;
    public page: number;
    public pantheon: string;
    public piety?: boolean;
    public province?: string;
    public reprintAlias?: string;
    public source: string;
    public srd: boolean;
    
    constructor(json: any) {
        this._id = json._id;
        this._copy = json._copy;
        this.additionalSources = json.additionalSources;
        this.alignment = json.alignment;
        this.altNames = json.altNames;

        if(!json.basicRules) this.basicRules = false;
        this.basicRules = json.basicRules;
        
        this.category = json.category;
        this.customExtensionOf = json.customExtensionOf;
        this.domains = json.domains;
        this.entries = json.entries;

        if(!json.name) throw new Error("name is required for deity");
        this.name = json.name;

        if(!json.page) throw new Error("page is required for deity");
        this.page = json.page;

        if(!json.pantheon) throw new Error("pantheon is required for deity");
        this.pantheon = json.pantheon;

        this.piety = json.piety;
        this.province = json.province;
        this.reprintAlias = json.reprintAlias;

        if(!json.source) throw new Error("source is required for deity");
        this.source = json.source;

        if(!json.srd) this.srd = false;
        this.srd = json.srd;
    }

    public static make(json: any): Deity {
        return new Deity({...json, _id: DbUtilities.newGuid()});
    }

    public static getFactory(): Factory<Deity> {
        return new (
            class implements Factory<Deity> {
                public collectionName = 'deities';
                public getCollectionName(): string {
                    return this.collectionName;
                }
                make(json: any) {
                    return new Deity({...json, _id: DbUtilities.newGuid()})
                }
            }
        )();
    }
}
