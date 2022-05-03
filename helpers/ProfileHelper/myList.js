const {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} = require("discord.js");
const {MongoClient} = require("mongodb")
const {getTiradas} = require("./getTiradas");
const uri = "mongodb+srv://Zero:UIyJVkUJk4E7hozM@cluster0.rft44.mongodb.net/userDb?retryWrites=true&w=majority"
const pagesList = {} // {userId :pagesBannerNumber}
const embedList = {}
const tiradasList = {}
const optionsList = {}

function starsToNumber(starsE) {
    let lastindex = starsE.indexOf("\n");
    let stars = starsE.substring(0, lastindex)
    if (stars == "💫💫💫💫💫💫") {
        return 6;
    } else if (stars == "💫💫💫💫💫💫💫" || stars == "🌸🌸🌸🌸🌸🌸🌸") {
        return 7;
    } else if (stars == "🌟🌟🌟🌟🌟") {
        return 5;
    } else if (stars == "⭐⭐⭐⭐") {
        return 4;
    } else if (stars == "⭐⭐⭐") {
        return 3;
    } else if (stars == "¿⭐?") {
        return 0;
    } else {

    }

}
function descToName(desc){
    let index = desc.indexOf("\n")
    return desc.substring(index)
}

const rowProfileUser = new MessageActionRow()
    .addComponents(new MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('Nothing selected')
        .addOptions([{
            emoji: '💫',
            label: '6 y 7 Estrellas',
            description: 'Muestra los personajes de 6 y 7 estrellas en posesion',
            value: 'six_stars',
        }, {
            emoji: '🌟',
            label: '5 Estrellas',
            description: 'Muestra los personajes de 5 estrellas en posesion',
            value: 'five_stars',
        }, {
            emoji: '⭐',
            label: '3 y 4 Estrellas',
            description: 'Muestra los personajes de 3 y 4 estrellas en posesion',
            value: 'four_stars',
        }, {
            emoji: '❓', label: 'Sin Estrellas', description: 'Muestra los personajes Raros', value: 'no_stars',
        }, {
            emoji: '👤', label: 'Perfil', description: 'Ir al perfil', value: 'third_option',
        }]),);

async function getArray(userId) {
    const client = new MongoClient(uri);
    let fin;
    try {
        await client.connect()
        const database = client.db('userDb')
        const usersdb = database.collection('usersdbs')
        const tiradas = await usersdb.findOne({
            "id": userId,

        });
        if (tiradas != null) {
            fin = tiradas.personajes;
        } else {
            fin = [];
        }
    } finally {
        await client.close()
    }
    return fin
}

async function filterArray(stars, array) {
    let result = []
    switch (stars) {
        case 6 : {
            for (let b = 0; b < array.length; ++b) {
                let starsA = starsToNumber(array[b].description)
                if (stars === starsA || 7 === starsA || 8 === starsA) {
                    result.push(array[b])
                }
            }
            break;
        }
        case 5 : {
            for (let b = 0; b < array.length; ++b) {
                let starsA = starsToNumber(array[b].description)
                if (stars === starsA) {
                    result.push(array[b])
                }
            }
            break;
        }
        case 4 : {
            for (let b = 0; b < array.length; ++b) {
                let starsA = starsToNumber(array[b].description)
                if (stars === starsA || 3 === starsA) {
                    result.push(array[b])
                }
            }
            break;
        }
        case 0 : {
            for (let b = 0; b < array.length; ++b) {
                let starsA = starsToNumber(array[b].description)
                if (stars === starsA) {
                    result.push(array[b])
                }
            }
            break;
        }
    }
    return result
}

const getRowBanner = async (id, array) => {
    const rowBanner = new MessageActionRow()
    rowBanner.addComponents(new MessageButton()
        .setCustomId('prevUser_pj')
        .setStyle('SECONDARY')
        .setLabel('   ')
        .setEmoji('⏮️')
        .setDisabled(pagesList[id] === 0))
    rowBanner.addComponents(new MessageButton()
        .setCustomId('nextUser_pj')
        .setStyle('SECONDARY')
        .setEmoji('⏭️')
        .setDisabled(pagesList[id] === array.length - 1)||interaction.values[0] === 'second_option')
    rowBanner.addComponents(new MessageButton()
        .setCustomId('set_Favorite')
        .setStyle('SUCCESS')
        .setEmoji('❤️'))
    return rowBanner;
}
const rowPerfil = new MessageActionRow()
    rowPerfil.addComponents(new MessageButton()
        .setCustomId('burn_Character')
        .setStyle('DANGER')
        .setLabel('Quemar Todo')
        .setEmoji('🔥')
    )


async function userList(user, interaction, reply, profileUser,number) {
    const id = user.id
    const tiradas = await require("./getTiradas").getTiradas(id)
    if (tiradas === -1) {
        if (reply && (interaction.customId === 'prevUser_pj' || interaction.customId === 'nextUser_pj')) {
            await reply.reply({ephemeral: true, content: "Aun no tienes personajes"})
        } else {

        }
    } else {
        embedList[id] = embedList[id] || []
        tiradasList[id] = tiradasList[id] || 0
        if (embedList[id].length === 0 || tiradasList[id] !== tiradas ) {
            tiradasList[id] = tiradas
            embedList[id] = []
            const waifuUserList = await getArray(id);
            for (let a = 0; a < waifuUserList.length; ++a) {
                let footer;

                if (waifuUserList[a].stars == 5) {
                    footer = "🌟🌟🌟🌟🌟"
                } else if (waifuUserList[a].stars == 4) {
                    footer = "⭐⭐⭐⭐"
                } else if (waifuUserList[a].stars == 3) {
                    footer = "⭐⭐⭐"
                } else if (waifuUserList[a].stars == 6) {
                    footer = "💫💫💫💫💫💫"
                } else if (waifuUserList[a].stars == 7) {
                    footer = "💫💫💫💫💫💫💫"
                } else if (waifuUserList[a].stars == 8){
                    footer = "🌸🌸🌸🌸🌸🌸🌸"
                }else {
                    footer = "¿⭐?"
                }
                const embedListEachCharacter = new MessageEmbed()
                    .setTitle(waifuUserList[a].nameWaifu)
                    .setColor(0x00FFFF)
                    .setImage(waifuUserList[a].linkWaifu)
                    .setDescription(footer + "\n" + waifuUserList[a].anime)
                    .setFooter(""+waifuUserList[a].repes);
                embedList[id].push(embedListEachCharacter)
            }
        }
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor({ name: user.username, iconURL:user.displayAvatarURL  })
            .setDescription('Personajes en Posesion')
            .addFields(

                { name: 'Personajes de 0 y 1 ', value: (await filterArray(0,embedList[id])).length +"/"+number[0]+2, inline: true },
                { name: 'Personajes de 3 y 4', value: (await filterArray(4,embedList[id])).length +"/"+number[4], inline: true },
                { name: 'Personajes de 5', value: (await filterArray(5,embedList[id])).length +"/"+number[5], inline: true },
                { name: 'Personajes de 6 y 7', value: (await filterArray(6,embedList[id])).length +"/"+number[6], inline: true },
            )

        optionsList[id] = optionsList[id] || 0
        let tempUserArray = await filterArray(optionsList[id], embedList[id])
        pagesList[id] = pagesList[id] || 0
        if (interaction.values) {
            if (interaction.values[0] === 'second_option') {
                await interaction.deferUpdate()
                await reply.edit({
                    embeds: [exampleEmbed],
                    components: [rowPerfil, rowProfileUser]
                })
                pagesList[id] = 0
            } else if (interaction.values[0] === 'six_stars') {
                await interaction.deferUpdate()
                optionsList[id] = 6
                pagesList[id] = 0

            } else if (interaction.values[0] === 'five_stars') {
                await interaction.deferUpdate()
                optionsList[id] = 5
                pagesList[id] = 0
            } else if (interaction.values[0] === 'four_stars') {
                await interaction.deferUpdate()
                optionsList[id] = 4
                pagesList[id] = 0
            } else if (interaction.values[0] === 'no_stars') {
                await interaction.deferUpdate()
                optionsList[id] = 0
                pagesList[id] = 0
            }
            if (interaction.values[0] === 'no_stars' || interaction.values[0] === 'four_stars'||interaction.values[0] === 'five_stars' || interaction.values[0] === 'six_stars') {
                tempUserArray = await filterArray(optionsList[id], embedList[id])
                await reply.edit({
                    embeds: [tempUserArray[pagesList[id]]],
                    components: [await getRowBanner(id, tempUserArray), rowProfileUser]
                })
            }
        }
        if (interaction.customId === 'prevUser_pj' && pagesList[id] > 0) {
            --pagesList[id]
        } else if (interaction.customId === 'nextUser_pj' && pagesList[id] < tempUserArray.length - 1) {
            ++pagesList[id]
        }
        if (interaction.customId === 'prevUser_pj' || interaction.customId === 'nextUser_pj') {
            await interaction.deferUpdate()
            await reply.edit({
                embeds: [tempUserArray[pagesList[id]]],
                components: [await getRowBanner(id, tempUserArray), rowProfileUser]
            })
        } else if (interaction.customId === 'set_Favorite') {
            const waifuUrl = tempUserArray[pagesList[id]].image.url
            const waifuName = tempUserArray[pagesList[id]].title
            await require('./setAndGetFavorite').setFavorite(id, waifuName, waifuUrl)
            profileUser.setImage(waifuUrl)
            await interaction.deferUpdate()
        } else if (interaction.customId === 'burn_Character') {
            await interaction.deferUpdate()
            const sure = new MessageEmbed()
                .setDescription('¿Estas seguro?')
            const row = new MessageActionRow()
                .addComponents(new MessageButton()
                    .setCustomId('SI_ERASE')
                    .setLabel('Si')
                    .setStyle('SUCCESS'))
                .addComponents(new MessageButton()
                    .setCustomId('NO_ERASE')
                    .setLabel('NO')
                    .setStyle('DANGER'))
            await reply.edit({
                embeds: [sure], components: [row]
            })
        }else if(interaction.customId === 'SI_ERASE'){
            await interaction.deferUpdate()
            await require('./burnAll').burn(id, reply)
            await reply.edit({
                embeds: [exampleEmbed],
                components: [rowPerfil, rowProfileUser]
            })
        }else if(interaction.customId ==='NO_ERASE'){
            await interaction.deferUpdate()
            await reply.edit({
                embeds: [exampleEmbed],
                components: [rowPerfil, rowProfileUser]
            })
        }
    }
}


module.exports = {
    userList: (id, interaction, reply, profileUser,number) => {
        return userList(id, interaction, reply, profileUser,number)
    }
}