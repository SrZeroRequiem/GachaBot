const mongoose = require('mongoose')
const channelSchema = mongoose.Schema({
    Server: String,
    BannerSeasonChannel: String,
    BannerChannel: String,
    TiradasSeasonChannel: String,
    TiradasChannel: String,
})
module.exports = mongoose.model('channeldb', channelSchema)