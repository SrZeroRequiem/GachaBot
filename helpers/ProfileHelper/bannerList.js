const {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} = require("discord.js");
const embedBanner = []
const pagesBanner = {} // {userId :pagesBannerNumber}
const optionsBanner = {}
const getRowBanner = (id, array) => {
    const rowBanner = new MessageActionRow()
    rowBanner.addComponents(new MessageButton()
        .setCustomId('prev_pj')
        .setStyle('SECONDARY')
        .setEmoji('⏮️')
        .setDisabled(pagesBanner[id] === 0))
    rowBanner.addComponents(new MessageButton()
        .setCustomId('next_pj')
        .setStyle('SECONDARY')
        .setEmoji('⏭️')
        .setDisabled(pagesBanner[id] === array.length - 1))
    return rowBanner;
}
const rowProfileUser = new MessageActionRow()
    .addComponents(new MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('Nothing selected')
        .addOptions([{
            emoji: '🌟',
            label: '5 Estrellas',
            description: 'Muestra los personajes de 5 estrellas en el banner',
            value: 'five_starsB',
        }, {
            emoji: '⭐',
            label: '3 y 4 Estrellas',
            description: 'Muestra los personajes de 3 y 4 estrellas en el banner',
            value: 'four_starsB',
        }, {
            emoji: '❓', label: 'Sin Estrellas', description: 'Muestra los personajes Raros', value: 'no_starsB',
        }, {
            emoji: '👤', label: 'Perfil', description: 'Ir al perfil', value: 'third_option',
        }]),);

function starsToNumber(starsE) {
    let lastindex = starsE.indexOf("\n");
    let stars = starsE.substring(0, lastindex)
    if (stars === "🌟🌟🌟🌟🌟") {
        return 5;
    } else if (stars === "⭐⭐⭐⭐") {
        return 4;
    } else if (stars === "⭐⭐⭐") {
        return 3;
    } else if (stars === "¿⭐?") {
        return 0;
    } else {

    }

}

async function filterArray(stars, array) {
    let result = []
    if (stars === 5) {
        {
            for (let b = 0; b < array.length; ++b) {
                let starsA = starsToNumber(array[b].description)
                if (stars === starsA) {
                    result.push(array[b])
                }
            }

        }
    } else if (stars === 4) {
        {
            for (let b = 0; b < array.length; ++b) {
                let starsA = starsToNumber(array[b].description)
                if (stars === starsA || 3 === starsA) {
                    result.push(array[b])
                }
            }

        }
    } else if (stars === 0) {
        {
            for (let b = 0; b < array.length; ++b) {
                let starsA = starsToNumber(array[b].description)
                if (stars === starsA) {
                    result.push(array[b])
                }
            }

        }
    }
    return result
}


async function bannerList(id, interaction, reply) {
    if (embedBanner.length === 0) {
        const waifuList = await require("../WishHelpers/Permanent/getArray").getArray();
        for (let a = 0; a < waifuList.length; ++a) {
            let footer;

            if (waifuList[a].stars === 5) {
                footer = "🌟🌟🌟🌟🌟"
            } else if (waifuList[a].stars === 4) {
                footer = "⭐⭐⭐⭐"
            } else if (waifuList[a].stars === 3) {
                footer = "⭐⭐⭐"
            } else if (waifuList[a].stars === 6) {
                footer = "💫💫💫💫💫💫"
            } else if (waifuList[a].stars === 7 ||waifuList[a].stars === 8) {
                footer = "💫💫💫💫💫💫💫"
            } else {
                footer = "¿⭐?"
            }
            const embedDatos = new MessageEmbed()
                .setTitle(waifuList[a].nameWaifu)
                .setColor(0x00FFFF)
                .setImage(waifuList[a].linkWaifu)
                .setDescription(footer + "\n" + waifuList[a].anime);
            embedBanner.push(embedDatos)
        }
    }
    optionsBanner[id] = optionsBanner[id]
    let tempUserArray = await filterArray(optionsBanner[id], embedBanner)
    pagesBanner[id] = pagesBanner[id]
    if (interaction.values) {
        if (interaction.values[0] === 'first_option') {
            await interaction.deferUpdate()
            optionsBanner[id] = 5
            pagesBanner[id] = 0
        } else if (interaction.values[0] === 'five_starsB') {
            await interaction.deferUpdate()
            optionsBanner[id] = 5
            pagesBanner[id] = 0
        } else if (interaction.values[0] === 'four_starsB') {
            await interaction.deferUpdate()
            optionsBanner[id] = 4
            pagesBanner[id] = 0
        } else if (interaction.values[0] === 'no_starsB') {
            await interaction.deferUpdate()
            optionsBanner[id] = 0
            pagesBanner[id] = 0
        }
        if (interaction.values[0] === 'no_starsB' || interaction.values[0] === 'four_starsB' || interaction.values[0] === 'five_starsB' || interaction.values[0] === 'first_option') {
            console.log(optionsBanner[id])
            tempUserArray = await filterArray(optionsBanner[id], embedBanner)
            await reply.edit({
                embeds: [tempUserArray[pagesBanner[id]]],
                components: [await getRowBanner(id, tempUserArray), rowProfileUser]
            })
        }
    }
    if (interaction.customId === 'prev_pj' && pagesBanner[id] > 0) {
        --pagesBanner[id]
    } else if (interaction.customId === 'next_pj' && pagesBanner[id] < tempUserArray.length - 1) {
        ++pagesBanner[id]
    }
    if (interaction.customId === 'prev_pj' || interaction.customId === 'next_pj') {
        reply.edit({
            embeds: [tempUserArray[pagesBanner[id]]], components: [getRowBanner(id, tempUserArray), rowProfileUser]
        })
        await interaction.deferUpdate()
    } else {

    }
}


module.exports = {
    bannerList: (id, interaction, reply) => {
        return bannerList(id, interaction, reply)
    }
}