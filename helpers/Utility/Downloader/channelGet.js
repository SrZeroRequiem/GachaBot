const {MongoClient} = require("mongodb")
const uri = "mongodb+srv://Zero:UIyJVkUJk4E7hozM@cluster0.rft44.mongodb.net/userDb?retryWrites=true&w=majority"
const db = process.env.MONGO_DBGET
async function getArray() {
    const client = new MongoClient(uri);
    let array
    let channels;
    try {
        await client.connect()
        const database = client.db('userDb')
        const usersdb = database.collection(db)
        channels = await usersdb.find({
            BannerChannel: {$ne: 0 }
        })
        array = await channels.toArray()
    }finally {
        client.close()
    }
    return array

}
module.exports = {
    getChannel: () => {
        return getArray()
    }
}