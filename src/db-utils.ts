import { MongoClient } from 'mongodb';
import Factory from './models/factory';
import { Identifiable } from './models/identifiable';

require('dotenv').config();


const dbClient = new MongoClient(`${process.env.DB_CONN_STRING}`);

//dbClient.connect();

dbClient.addListener("open", client => {
    console.log("Mongo connection open");
})

dbClient.addListener("error", e => {
    console.debug(e);
})

// TODO: Db connection pooling.

export class DbUtilities {
    static async Insert<T>(o: T, collectionName: string){//, factory: Factory<T>) {
        try {
            await dbClient.connect();

            const database = dbClient.db(process.env.DB_NAME);
            const collection = database.collection(collectionName);//factory.getCollectionName());

            const result = await collection.insertOne(o);

            if (!result) {
                throw new Error('Error inserting.');
            }
        } catch (ex) {
            throw ex;
        } finally {
            await dbClient.close();
        }
    }

    static async Query<T>(query: any, factory: Factory<T>, projection?: any): Promise<T[]> {
        try {
            await dbClient.connect();

            const database = dbClient.db(process.env.DB_NAME);
            const collection = database.collection(factory.getCollectionName());
            const cursor = collection.find(query);
            const list = new Array<T>();
            await cursor.forEach((doc) => {
                let o = factory.make(doc);
                list.push(o);
            });

            return list;
        } catch (ex) {
            throw ex;
        } finally {
            await dbClient.close();
        }
    }

    static async QueryOne<T>(query: any, factory: Factory<T>, projection?: any): Promise<T> {
        try {
            await dbClient.connect();

            const database = dbClient.db(process.env.DB_NAME);
            const collection = database.collection(factory.getCollectionName());
            const cursor = await collection.findOne(query);
            return factory.make(cursor);
        } catch (ex) {
            throw ex;
        } finally {
            await dbClient.close();
        }
    }
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
