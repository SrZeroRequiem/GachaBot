const mongo = require('../../../mongo')
const channelSchema = require('../../../schemas/channels-schema')
function channelUploader(banner,tiradas,serverID) {
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log(`connected to mongoDB`)
                const results = await channelSchema.find({
                    Server: serverID,
                })
                console.log(serverID)
                if (results == "") {
                    const server = {
                        Server: serverID,
                        BannerChannel: banner,
                        BannerSeasonChannel: "",
                        TiradasChannel: tiradas,
                        TiradasSeasonChannelSeason:"",
                    }
                    await new channelSchema(server).save()
                }else {
                    await channelSchema.findOneAndUpdate({
                        Server: serverID,
                    },{
                        BannerChannel: banner,
                        TiradasChannel: tiradas,
                    })
                }


            } finally {
            }
        })
    }
    connectToMongoDB().then()
}
module.exports = {
    channelUploader: (banner,tiradas,server) => {
        return channelUploader(banner,tiradas,server)
    }
}