import { DbUtilities } from "../db-utils";
import Factory from "./factory";
import { Identifiable } from "./identifiable";
import Time from "./time";

export class Vehicle implements Identifiable {
    public _id: string;
    public ac?: number | {ac: number, from: string[]}[];
    public action?: string[] | {}[];
    public actionStation?: {}[];
    public actionThresholds?: {};
    public capCargo?: number | string;
    public capCreature?: number;
    public capCrew?: number;
    public capCrewNote?: string;
    public capPassenger?: number;
    public cha?: number;
    public con?: number;
    public conditionImmune?: string[];
    public control?: {}[];
    public cost?: number;
    public dex?: number;
    public dimenions?: string[];
    public entries?: string[] | {}[];
    public hasFluff: boolean;
    public hasFluffImages: boolean;
    public hasToken: boolean;
    public hp?: number | {average?: number, dt?:number, formula?:string, hp?:number, mt?:number};
    public hull?: {ac: number, acForm?: string, dt?: number, hp: number};
    public immune?: string[];
    public int?: number;
    public movement?: {}[];
    public name: string;
    public other?: {entries:string[], name:string}[];
    public otherSources?: {source:string}[];
    public pace?: number | {fly?: number | string, swim?:number, walk?:string};
    public page?: number;
    public reaction?: {entries: string, name: string, type:string}[];
    public size?: string | string[];
    public speed?: {fly?: number, note?: string, swim?: number, walk?:number}
    public srd?:string;
    public str?: number;
    public terrain?: string[];
    public trait?: {entries: string, name: string}[];
    public type?: string;
    public vehicleType?: "SHIP" | "SPELLJAMMER" | "INFWAR" | "CREATURE" | "OBJECT";
    public weapon?: {}[];
    public weight?: number;
    public wis?: number;


    constructor(json: any) {
        this._id = json._id;
        this.ac = json.ac;
        this.action = json.action;
        this.actionStation = json.actionStation;
        this.actionThresholds = json.actionThresholds;
        this.capCargo = json.capCargo;
        this.capCreature = json.capCreature;
        this.capCrew = json.capCrew;
        this.capCrewNote = json.capCrewNote;
        this.capPassenger = json.capPassenger;
        this.cha = json.cha;
        this.con = json.con;
        this.conditionImmune = json.conditionImmune;
        this.control = json.control;
        this.cost = json.cost;
        this.dex = json.dex;
        this.dimenions = json.dimenions;
        this.entries = json.entries;

        if(!json.hasFluff) this.hasFluff = false;
        else this.hasFluff = json.hasFluff;

        if(json.hasFluffImages) this.hasFluffImages = false;
        else this.hasFluffImages = json.hasFluffImages;

        if(!json.hasToken) this.hasToken = false;
        else this.hasToken = json.hasToken;

        this.hp = json.hp;
        this.hull = json.hull;
        this.immune = json.immune;
        this.int = json.int;
        this.movement = json.movement;
        
        if(!json.name) throw new Error("name is required for vehicle");
        else this.name = json.name;

        this.other = json.other;
        this.otherSources = json.otherSources;
        this.pace = json.pace;
        this.page = json.page;
        this.reaction = json.reaction;
        this.size = json.size;
        this.speed = json.speed;
        this.srd = json.srd;
        this.str = json.str;
        this.terrain = json.terrain;
        this.trait = json.trait;
        this.type = json.type;
        this.vehicleType = json.vehicleType;
        this.weapon = json.weapon;
        this.weight = json.weight;
        this.wis = json.wis;
    }

    public static make(json: any): Vehicle {
        return new Vehicle({...json, _id: DbUtilities.newGuid()});
    }

    public static getFactory(): Factory<Vehicle> {
        return new (
            class implements Factory<Vehicle> {
                public collectionName = 'vehicles';
                public getCollectionName(): string {
                    return this.collectionName;
                }
                make(json: any) {
                    return new Vehicle({...json, _id: DbUtilities.newGuid()})
                }
            }
        )();
    }
}
