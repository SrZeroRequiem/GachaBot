const {MongoClient} = require("mongodb");

function setFavorite(userId, nameWaifu,linkWaifu) {
    const mongo = require('../../mongo')
    const userSchema = require('../../schemas/user-schema')
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log(`connected to mongoDB`)
                await userSchema.findOneAndUpdate({
                    id: userId,
                },{
                    nameFavorite : nameWaifu,
                    linkFavorite : linkWaifu
                })
            } finally {
                mongoose.connection.close()
            }
        })
    }
    connectToMongoDB().then()

}
async function getFavorite(userId) {
    const {MongoClient} = require("mongodb")
    const uri = "mongodb+srv://Zero:UIyJVkUJk4E7hozM@cluster0.rft44.mongodb.net/userDb?retryWrites=true&w=majority"
    const client = new MongoClient(uri);
    let fin;
    try {
        await client.connect()
        const database = client.db('userDb')
        const usersdb = database.collection('usersdbs')
        const userProfile = await usersdb.findOne({
            id: userId,
        });
        if(userProfile !=null) {
            fin = userProfile.linkFavorite;
            console.log(fin)
        }else {
            fin = " ";
        }
    }finally {
        await client.close();
    }
    return fin
}
module.exports = {
    setFavorite: (userId, nameWaifu,linkWaifu) => {
        return setFavorite(userId, nameWaifu,linkWaifu)
    },
    getFavorite: (userId) => {
        return getFavorite(userId)
    }
}