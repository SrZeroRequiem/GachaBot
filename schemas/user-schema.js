const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    id: String,
    tiradasRestantes: Number,
    nameFavorite: String,
    linkFavorite: String,
    lastGift: Number,
    piti: Number,
    personajes: [{
        nameWaifu: String,
        linkWaifu: String,
        anime: String,
        repes: Number,
        stars: Number,
    }]
})
module.exports = mongoose.model('usersdb', userSchema)