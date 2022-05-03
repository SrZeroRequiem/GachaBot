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
            stars : {$lt: 8},
            anime : {$nin: ["Shigatsu wa Kimi no Uso Moments","Go-Toubun no Hanayome","Komi-san wa, Komyushou desu","Paripi Koumei","Kawaii dake ja Nai Shikimori-san","Love After World Domination","Spy x Family","Eight Six","Shoujo☆Kageki Revue Starlight",
                    "Kaguya-sama wa Kokurasetai"]}
        },{sort : {anime : 1, stars : 1},projection : {_id: 0, nameWaifu:1,linkWaifu:1,anime:1,stars:1}})
        array = await tiradas.toArray()
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