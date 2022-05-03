async function getPiti(userId) {
    const {MongoClient} = require("mongodb")
    const uri = "mongodb+srv://Zero:UIyJVkUJk4E7hozM@cluster0.rft44.mongodb.net/userDb?retryWrites=true&w=majority"
    const client = new MongoClient(uri);
    let fin;
    try {
        await client.connect()
        const database = client.db('userDb')
        const usersdb = database.collection('usersdbs')
        const tiradas = await usersdb.findOne({
            id: userId,
        });
        if(tiradas !=null) {
            fin = tiradas.piti;
        }else {
            fin = 1;
        }
    }finally {
        await client.close();
    }
    return fin
}
module.exports = {
    getPiti: (userId) => {
        return getPiti(userId)
    }
}