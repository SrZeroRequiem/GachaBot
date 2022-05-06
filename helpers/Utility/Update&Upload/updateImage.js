const mongo = require('../../../mongo')
const userSchema = require('../../../schemas/user-schema')
const waifuSchema = require('../../../schemas/waifu-schema')
const connectToMongoDB = async () => {
    const linkWaifu = "https://i.imgur.com/TzQdqfR.png"
    const stars = 5
    console.log(linkWaifu)
    const nameWaifu = "Theoto Rikka"
    await mongo().then(async (mongoose) => {
        try {
            await userSchema.updateMany({tiradasRestantes: {$gte: 0}}, {
                "personajes.$[item].linkWaifu": linkWaifu
            }, {
                arrayFilters: [{
                    "item.nameWaifu": nameWaifu, "item.stars": stars
                }]
            })
            console.log('Done')


        } finally {
        }
    })
}
connectToMongoDB().then()
