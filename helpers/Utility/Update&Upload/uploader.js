const mongo = require('../../../mongo')
const waifuList = require("../../../files/toUpload/dbWaifusHusbandos.json");
const waifuSchema = require('../../../schemas/waifu-schema')
const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try {
            console.log(`connected to mongoDB`)
            for (let i = 0;i<waifuList.length;i++){
                const user = {
                    nameWaifu: waifuList[i].name,
                    linkWaifu: waifuList[i].link,
                    anime: waifuList[i].anime,
                    stars: waifuList[i].stars,
                }
                await new waifuSchema(user).save()
            }
            
        } finally {
        }
    })
}
connectToMongoDB().then()