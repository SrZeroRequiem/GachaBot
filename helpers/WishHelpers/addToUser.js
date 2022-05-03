const userSchema = require("../../schemas/user-schema");

function addUser(userId, nameWaifu, linkWaifu, anime, stars) {
    const mongo = require('../../mongo')
    const userSchema = require('../../schemas/user-schema')
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log(`connected to mongoDB`)
                const results = await userSchema.find({
                    id: userId,
                })
                //Cretes new UserEntry if there is no user with this userId
                if (results == "") {
                    const user = {
                        id: userId, tiradasRestantes: 150,piti: 0, personajes: [{
                            nameWaifu: nameWaifu, linkWaifu: linkWaifu, anime: anime, repes: 0, stars: stars,
                        }]
                    }
                    await new userSchema(user).save()
                    //Update the actual entry of the user
                } else {
                    const resultWaifu = await userSchema.find({
                        id: userId, "personajes.nameWaifu": nameWaifu, "personajes.linkWaifu": linkWaifu
                    })
                    if (resultWaifu == "") {
                        await userSchema.findOneAndUpdate({
                            id: userId,
                        }, {
                            $inc: {tiradasRestantes: -1}, $push: {
                                personajes: {
                                    nameWaifu: nameWaifu, linkWaifu: linkWaifu, anime: anime, repes: 0, stars: stars,
                                }
                            }
                        })
                        await userSchema.findOneAndUpdate({
                            id: userId,
                        }, {
                            $inc: {piti: 1},
                        })
                    } else {
                        await userSchema.findOneAndUpdate({
                            id: userId,
                        }, {
                            $inc: {"personajes.$[item].repes": 1},
                        }, {
                            arrayFilters: [{
                                "item.nameWaifu": nameWaifu, "item.linkWaifu": linkWaifu
                            }]
                        })
                        await userSchema.findOneAndUpdate({
                            id: userId,
                        }, {
                            $inc: {tiradasRestantes: -1},
                        })
                        await userSchema.findOneAndUpdate({
                            id: userId,
                        }, {
                            $inc: {piti: 1},
                        })
                    }
                    const piti = await require("../Utility/getPiti").getPiti(userId)
                    if (piti>=51){
                        await userSchema.findOneAndUpdate({
                            id: userId,
                        }, {
                            piti: 0,
                        })
                    }
                }
            } finally {
            }
        })
    }
    connectToMongoDB().then()

}

module.exports = {
    addUser: (userId, nameWaifu, linkWaifu, anime, stars) => {
        return addUser(userId, nameWaifu, linkWaifu, anime, stars)
    }
}