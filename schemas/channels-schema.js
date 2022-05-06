const mongoose = require('mongoose')
const db = process.env.MONGO_DB
const channelSchema = mongoose.Schema({
    Server: String,
    BannerSeasonChannel: Object,
    BannerChannel: Object,
    TiradasSeasonChannel: Object,
    TiradasChannel: Object,
})
module.exports = mongoose.model(db, channelSchema)