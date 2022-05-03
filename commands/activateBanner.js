const {ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");

function starsToNumber(stars) {
    if (stars === "💫💫💫💫💫💫") {
        return 6;
    } else if (stars === "💫💫💫💫💫💫💫") {
        return 7;
    }else if (stars === "🌟🌟🌟🌟🌟") {
        return 5;
    } else if (stars === "⭐⭐⭐⭐") {
        return 4;
    } else if (stars === "⭐⭐⭐") {
        return 3;
    } else if (stars === "¿⭐?") {
        return 0;
    } else return 1

}

module.exports = {
    category: 'Gacha',
    description: 'Set channel where the rolls go and activate the banner',
    ownerOnly: true,
    slash: false,
    testOnly: false,
    callback: async ({channel, message, client}) => {
        const init = message.content.lastIndexOf("!activateBanner")+("!activateBanner").length+4
        const subChannel = message.content.substr(init)
        const channelLenght = subChannel.length-1
        const channelsSended = subChannel.substr(0,channelLenght)
        const collector = channel.createMessageComponentCollector()
        const channelTirada = client.channels.cache.get(channelsSended);
        message.delete()
        collector.on('collect', async i => {
                const tiradas = await require("../helpers/ProfileHelper/getTiradas").getTiradas(i.user.id);
                if (i.customId === 'wis' && tiradas >= 1 && tiradas != -1) {
                    const embedWaifu = await require("../helpers/WishHelpers/Permanent/getRoll").getRoll(i.user,i.user.id)
                    let lastindex = (embedWaifu.description).indexOf("\n")
                    let stars = starsToNumber((embedWaifu.description).substring(0, lastindex))
                    let anime = embedWaifu.description.substring(lastindex + 1)
                    let nameW = embedWaifu.title;
                    let linkWaifu = embedWaifu.image.url;
                    require("../helpers/WishHelpers/addToUser").addUser(i.user.id, nameW, linkWaifu, anime, stars);
                    channelTirada.send({
                        embeds: [embedWaifu]
                    });
                    await i.deferUpdate();
                } else if (i.customId === 'wis_ten' && tiradas >= 5 && tiradas != -1) {
                    let user = i.user
                    let id = i.user.id
                    await i.deferUpdate();
                    for (let i = 0; i < 5; ++i) {
                        const embedWaifu = await require("../helpers/WishHelpers/Permanent/getRoll").getRoll(user,id)
                        let lastindex = (embedWaifu.description).indexOf("\n")
                        let stars = starsToNumber((embedWaifu.description).substring(0, lastindex))
                        let anime = embedWaifu.description.substring(lastindex + 1)
                        let nameW = embedWaifu.title;
                        let linkWaifu = embedWaifu.image.url;
                        require("../helpers/WishHelpers/addToUser").addUser(id, nameW, linkWaifu, anime, stars);
                        channelTirada.send({
                            embeds: [embedWaifu]
                        });
                    }
                } else if (i.customId === 'register' && tiradas == -1) {
                    let id = i.user.id
                    require("../helpers/WishHelpers/addToUser").addUser(id, "Pagina de inicio", i.user.avatar_url, "", 6);
                    i.reply({
                        ephemeral: true,
                        content: "Has sido registrado",
                    })
                } else if (i.customId === 'register' && tiradas != -1){
                    i.reply({
                        ephemeral:true,
                        content:"Ya estas registrado"
                    })
                }else if ((i.customId == 'wis'||i.customId == 'wis_ten')&&(tiradas < 5&& tiradas !=-1)) {
                    i.reply({
                        ephemeral:true,
                        content: "No "
                    })
                } else {return}

            }
        )

    }
}