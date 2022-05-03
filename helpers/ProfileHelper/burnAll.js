const userSchema = require("../../schemas/user-schema");

async function burn(userid, message) {
    let n = 0;
    const names = []
    const link = []
    const repes = []
    const mongo = require('../../mongo')
    const userSchema = require('../../schemas/user-schema')
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log(`connected to mongoDB`)
                const resultWaifu = await userSchema.findOne({
                    id: userid
                })
                const personajes = resultWaifu.personajes
                for (let i = 0; i < personajes.length; ++i) {
                    if (personajes[i].repes >= 11) {
                        n = (Math.floor(personajes[i].repes / 10)) + n
                        names.push(personajes[i].nameWaifu)
                        link.push(personajes[i].linkWaifu)
                        repes.push(Math.floor(personajes[i].repes / 10))
                    }
                }
                for (let j = 0; j < names.length; ++j) {
                    await userSchema.updateOne({
                        id: userid
                    }, {
                        $inc: {"personajes.$[item].repes": -10 * repes[j]},
                    }, {
                        arrayFilters: [{
                            "item.nameWaifu": names[j], "item.linkWaifu": link[j]
                        }]
                    })
                }
                for (let i = 0; i<n;++i){
                await userSchema.findOneAndUpdate({
                    id: userid,
                }, {
                    $inc: {tiradasRestantes: 5},
                })
                }
                message.reply("Has obtenido "+(n*5)+" tiradas")
            } finally {
            }
        })
    }
    connectToMongoDB().then()

}

module.exports = {
    burn: (userId, message) => {
        return burn(userId, message)
    }
}

