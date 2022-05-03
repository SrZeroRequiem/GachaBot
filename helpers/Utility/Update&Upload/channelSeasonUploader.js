const mongo = require('../../../mongo')
const channelSchema = require('../../../schemas/channels-schema')
function channelUploader(bannerSeason, tiradasSeason,serverID) {
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log(`connected to mongoDB`)
                const results = await channelSchema.find({
                    Server: serverID,
                })
                if (results == "") {
                    const server = {
                        Server: serverID,
                        BannerSeasonChannel: bannerSeason,
                        BannerChannel: "",
                        TiradasSeasonChannel: tiradasSeason,
                        TiradasChannel: "",
                    }
                    await new channelSchema(server).save()
                }else {
                    await channelSchema.findOneAndUpdate({
                        Server: serverID,
                    },{
                        BannerSeasonChannel: bannerSeason,
                        TiradasSeasonChannel: tiradasSeason,
                    })
                }


            } finally {
            }
        })
    }
    connectToMongoDB().then()
}
module.exports = {
    channelUploader: (bannerSeason, tiradasSeason,server) => {
        return channelUploader(bannerSeason, tiradasSeason,server)
    }
}
