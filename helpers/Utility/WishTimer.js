const {MongoClient} = require("mongodb")
const uri = "mongodb+srv://Zero:UIyJVkUJk4E7hozM@cluster0.rft44.mongodb.net/userDb?retryWrites=true&w=majority"
async function getArray() {
    const client = new MongoClient(uri);
    let array
    let tiradas;
    try {
        await client.connect()
        const database = client.db('userDb')
        const usersdb = database.collection('waifudbs')
        tiradas = await usersdb.find({
            id : id,
            lastGift
        })
    }finally {
        client.close()
    }
    return array

}
module.exports = {
    getArray: () => {
        return getArray()
    }
}