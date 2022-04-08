import { MongoClient } from "mongodb"

const MONGODB_URL = 'mongodb+srv://florest:senha12345678@cluster0.gwzaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true'

async function authToDatabase(database, collection_database) {
    const url = MONGODB_URL

    const client = new MongoClient(url)

    try {
        await client.connect()
        const collection = client.db(database).collection(collection_database)

        const response = await collection.find().toArray
        
        return {client: client, collection: collection}

    } catch (err) {
        return {message:err.stack}
    }
}

async function getDatabase(database, collection_database, query) {
    const { client, collection } = await authToDatabase(database, collection_database)
    
    try {
        const result = await collection.find(query).toArray()

        return result
        client.close()
    } catch (err) {
        return {message:err.stack}
    }
}

async function insertDatabase(database, collection_database, query) {
    const { client, collection } = await authToDatabase(database, collection_database)
    
    try {
        const result = await collection.insertOne(query)
        client.close()
    } catch (err) {
        return {message:err.stack}
    }
}

async function deleteDatabase(database, collection_database, query) {
    const { client, collection } = await authToDatabase(database, collection_database)
    
    try {
        const result = await collection.deleteOne(query)
        client.close()
    } catch (err) {
        return {message:err.stack}
    }
}

export { getDatabase, insertDatabase, deleteDatabase }