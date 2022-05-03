const mongo = require('../../mongo')
const userSchema = require('../../schemas/user-schema')
const waifuSchema = require('../../schemas/waifu-schema')
const connectToMongoDB = async () => {
    const linkWaifu = "https://cdn.donmai.us/sample/e8/18/__kiss_shot_acerola_orion_heart_under_blade_monogatari_and_1_more_drawn_by_hxxg__sample-e818aaee9a33fbbc69c96800f5976576.jpg"
    const stars = 5
    console.log(linkWaifu)
    const nameWaifu = "Kiss-shot Acerola-Orion Heart-Under-Blade"
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
