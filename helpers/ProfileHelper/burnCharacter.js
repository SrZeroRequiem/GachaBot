function burn(userId, nameWaifu, linkWaifu) {
    const mongo = require('../../mongo')
    const userSchema = require('../../schemas/user-schema')
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log(`connected to mongoDB`)
                        await userSchema.findOneAndUpdate({
                            id: userId,
                        }, {
                            $inc: {"personajes.$[item].repes": -10},
                        }, {
                            arrayFilters: [{
                                "item.nameWaifu": nameWaifu, "item.linkWaifu": linkWaifu
                            }]
                        })
                        await userSchema.findOneAndUpdate({
                            id: userId,
                        }, {
                            $inc: {tiradasRestantes: 5},
                        })


            } finally {
            }
        })
    }
    connectToMongoDB().then()

}

module.exports = {
    burn: (userId, nameWaifu, linkWaifu) => {
        return burn(userId, nameWaifu, linkWaifu)
    }
}