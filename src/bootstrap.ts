// import { DbUtilities } from './db-utils';
// import stringArgv from 'string-argv';
import fs from 'fs';
import path from 'path';
import { DbUtilities } from './db-utils';
import { Action } from './models/action';
import { Background } from './models/background';
import { Deity } from './models/deity';
import { Feat } from './models/feat';
import { Race } from './models/race';
import { Skill } from './models/skill';
import { Vehicle } from './models/vehicle';

export default async function bootstrap(): Promise<void> {
    let targetPath = path.join(__dirname, "../data/");

    for(let action of (require(path.join(targetPath, "actions.json"))).action.map((a: any) => Action.make(a))) {
        await DbUtilities.Insert(action, "actions")
    }
    for(let background of (require(path.join(targetPath, "backgrounds.json"))).background.map((a: any) => Background.make(a))) {
        await DbUtilities.Insert(background, "backgrounds");
    }
    for(let deity of (require(path.join(targetPath, "deities.json"))).deity.map((a: any) => Deity.make(a))) {
        await DbUtilities.Insert(deity, "deities");
    }
    for(let feat of (require(path.join(targetPath, "feats.json"))).feat.map((a: any) => Feat.make(a))) {
        await DbUtilities.Insert(feat, "feats");
    }
    for(let race of (require(path.join(targetPath, "races.json"))).race.map((a: any) => Race.make(a))) {
        await DbUtilities.Insert(race, "races");
    }
    for(let skill of (require(path.join(targetPath, "skills.json"))).skill.map((a: any) => Skill.make(a))) {
        await DbUtilities.Insert(skill, "skills");
    }
    for(let vehicle of (require(path.join(targetPath, "vehicles.json"))).vehicle.map((a: any) => Vehicle.make(a))) {
        await DbUtilities.Insert(vehicle, "vehicles");
    }
    let files = [];
    files = fs.readdirSync(path.join(__dirname, "../data/bestiary"));//, async (err, files: string[]) => {
        //let e: any[] = [];
        for(let fileName of files) {
            console.log(fileName);
            if(!fileName.match(/[A-z]*?\.json/gi, )) continue;
            for(let monster of (require(path.join(path.join(__dirname, "../data/bestiary"), fileName))).monster) {
                await DbUtilities.Insert({...monster, _id: DbUtilities.newGuid()}, "monsters");
            }   
        }
    //});
    files = fs.readdirSync(path.join(__dirname, "../data/spells"));//, async (err, files: string[]) => {
        //let e: any[] = [];
        for(let fileName of files) {
            console.log(fileName);
            if(!fileName.match(/[A-z]*?\.json/gi, )) continue;
            for(let spell of (require(path.join(path.join(__dirname, "../data/spells"), fileName))).spell) {
                await DbUtilities.Insert({...spell, _id: DbUtilities.newGuid()}, "spells");
            }   
        }
    //});
    files = fs.readdirSync(path.join(__dirname, "../data/class"));//, async (err, files: string[]) => {
        //let e: any[] = [];
        for(let fileName of files) {
            console.log(fileName);
            if(!fileName.match(/[A-z]*?\.json/gi, )) continue;
            let d = (require(path.join(path.join(__dirname, "../data/class"), fileName)));
            console.log(Object.getOwnPropertyNames(d));
            if(d.class)
            for(let c of d.class) {
                await DbUtilities.Insert({...c, _id: DbUtilities.newGuid()}, "classes");
            }
            if(d.subclass)
            for(let c of d.subclass) {
                await DbUtilities.Insert({...c, id: DbUtilities.newGuid()}, "subcalsses");
            }
            if(d.classFeature)
            for(let c of d.classFeature) {
                await DbUtilities.Insert({...c, id: DbUtilities.newGuid()}, "classfeatures");
            }
            if(d.subclassfeature)
            for(let c of d.subclassFeature) {
                await DbUtilities.Insert({...c, id: DbUtilities.newGuid()}, "subclassfeatures");
            }
        }
    //});
}

bootstrap();