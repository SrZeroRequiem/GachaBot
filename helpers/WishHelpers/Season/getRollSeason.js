const {MessageEmbed} = require("discord.js");

async function getRoll(username,id) {
    const waifuList = await require("./getArraySeason").getArray();
    let index = await require("./getIndexSeason").getIndex(id);
    let footer;

    if (waifuList[index].stars == 5) {
        footer = "🌟🌟🌟🌟🌟"
    } else if (waifuList[index].stars == 4) {
        footer = "⭐⭐⭐⭐"
    } else if (waifuList[index].stars == 3) {
        footer = "⭐⭐⭐"
    } else if (waifuList[index].stars == 6) {
        footer = "💫💫💫💫💫💫"
    } else if (waifuList[index].stars == 7) {
        footer = "💫💫💫💫💫💫💫"
    } else if (waifuList[index].stars == 8){
        footer = "🌸🌸🌸🌸🌸🌸🌸"
    }else {
        footer = "¿⭐?"
    }
    const embedDatos = new MessageEmbed()
        .setTitle(waifuList[index].nameWaifu)
        .setColor(0x00FFFF)
        .setImage(waifuList[index].linkWaifu)
        .setDescription(footer + "\n" + waifuList[index].anime)
        .setFooter(username.username);
    return embedDatos
}

module.exports = {
    getRoll: (username,id) => {
        return getRoll(username,id)
    }
}