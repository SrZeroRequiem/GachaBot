const mongoose = require('mongoose')
const waifuSchema = mongoose.Schema({
        nameWaifu: String,
        linkWaifu: String,
        anime: String,
        stars: Number,
        prob: String,
})
module.exports = mongoose.model('waifudb', waifuSchema)