const mongoose = require('mongoose')
const channelSchema = mongoose.Schema({
    Server: String,
    BannerSeasonChannel: Object,
    BannerChannel: Object,
    TiradasSeasonChannel: Object,
    TiradasChannel: Object,
})
module.exports = mongoose.model('channeldb', channelSchema)