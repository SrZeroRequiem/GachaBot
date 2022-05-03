const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require("discord.js");
const waifuNumber = []
async function filterArray(stars, array) {
    let result = []
    switch (stars) {
        case 6 : {
            for (let b = 0; b < array.length; ++b) {
                let starsA = array[b].stars
                if (stars === starsA || 7 === starsA || 8 === starsA) {
                    result.push(array[b])
                }
            }
            break;
        }
        case 5 : {
            for (let b = 0; b < array.length; ++b) {
                let starsA = array[b].stars
                if (stars === starsA) {
                    result.push(array[b])
                }
            }
            break;
        }
        case 4 : {
            for (let b = 0; b < array.length; ++b) {
                let starsA = array[b].stars
                if (stars === starsA || 3 === starsA) {
                    result.push(array[b])
                }
            }
            break;
        }
        case 0 : {
            for (let b = 0; b < array.length; ++b) {
                let starsA = array[b].stars
                if (stars === starsA) {
                    result.push(array[b])
                }
            }
            break;
        }
    }
    return result
}
module.exports = {

    category: 'Gacha', description: 'Send the banner to the channel', slash: 'both', testOnly: false,

    callback: async ({user, message, interaction}) => {
        if (waifuNumber[0] === undefined){
            const waifuList = await require("../helpers/Utility/Admin/getArrayAdmin").getArray();
            for (i = 0; i < 7; ++i){
                let tempArray = await filterArray(i,waifuList)
                waifuNumber.push(tempArray.length)
                console.log(waifuNumber)
            }


        }
        let tiradas = await require("../helpers/ProfileHelper/getTiradas").getTiradas(user.id)
        let piti = await require("../helpers/Utility/getPiti").getPiti(user.id)
        if (tiradas === -1) {
            await message.reply({
                ephemeral: true, content: "Aun no estas registrado"
            })
        } else {
            const id = user.id
            const rowProfileUser = new MessageActionRow()
                .addComponents(new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions([{
                        emoji: '❄️',
                        label: 'Personajes del Banner',
                        description: 'Muestra los personajes en el Banner Actual',
                        value: 'first_option',
                    }, {
                        emoji: '✨',
                        label: 'Mis Personajes',
                        description: 'Ver mis personajes y elegir el que se muestra en el perfil',
                        value: 'second_option',
                    }, {
                        emoji: '👤', label: 'Perfil', description: 'Ir al perfil', value: 'third_option',
                    }]),);
            const embedProfileUser = new MessageEmbed()
                .setAuthor({
                    name: user.username, iconURL: user.displayAvatarURL()
                })
                .setImage(await require('../helpers/ProfileHelper/setAndGetFavorite').getFavorite(id))
                .setColor(0x00FFFF)
                .setDescription('Tiradas restantes : ' + tiradas +"\nPiti: "+ piti)
            let reply
            if (message) {
                reply = await message.reply({
                    embeds: [embedProfileUser], components: [rowProfileUser]
                })
            } else if (!message) {
                reply = await user.send({
                    embeds: [embedProfileUser], components: [rowProfileUser]
                })
                await interaction.reply({
                    ephemeral: true, content: 'Enviado'
                })
            }
            const filter = (i) => i.user.id === user.id
            const time = 1000 * 1200
            let collector = reply.createMessageComponentCollector({filter, time})
            collector.on('collect', async interaction => {
                if (interaction.values) {
                    if (interaction.values[0] === 'third_option') {
                        tiradas = await require("../helpers/ProfileHelper/getTiradas").getTiradas(user.id);
                        piti = await require("../helpers/Utility/getPiti").getPiti(user.id)
                        embedProfileUser.setDescription('Tiradas restantes : ' + tiradas +"\nPiti: "+ piti)
                        reply.edit({
                            embeds: [embedProfileUser], components: [rowProfileUser]
                        })
                        await interaction.deferUpdate()
                    }
                }
                await require('../helpers/ProfileHelper/bannerList').bannerList(id, interaction, reply)
                await require('../helpers/ProfileHelper/myList').userList(user, interaction, reply, embedProfileUser,waifuNumber)
            })
        }
    }
}