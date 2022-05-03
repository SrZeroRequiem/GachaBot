const {MongoClient} = require("mongodb")
const uri = "mongodb+srv://Zero:7yGPYph1U7ZJOBLW@cluster0.rft44.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const {
    MessageEmbed,
    MessageActionRow,
    Interaction,
    Message,
    MessageButton,
    InteractionCollector,
    ButtonInteraction,
    MessageSelectMenu
} = require("discord.js");

async function getArray(userId) {
    const client = new MongoClient(uri);
    let fin;
    try {
        await client.connect()
        const database = client.db('userDb')
        const usersdb = database.collection('usersdbs')
        const tiradas = await usersdb.findOne({
            id: userId,
        });
        if (tiradas != null) {
            fin = tiradas.personajes;
        } else {
            fin = 50;
        }
    } finally {
    }
    return fin
}

module.exports = {

    category: 'Gacha', description: 'Send the banner to the channel', slash: true, testOnly: false,ownerOnly: true,

    callback: async ({user, message, interaction, channel, client}) => {
        const tiradas = await require("../helpers/ProfileHelper/getTiradas").getTiradas(user.id)
        if (tiradas == -1) {
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
                .setDescription('Tiradas restantes : ' + tiradas /*+ "\n" + "5 Estrellas : " + 5*/)
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
                        reply.edit({
                            embeds: [embedProfileUser], components: [rowProfileUser]
                        })
                        await interaction.deferUpdate()
                    }
                }
                    await require('../helpers/ProfileHelper/bannerListAdmin').bannerList(id, interaction, reply)
                await require('../helpers/ProfileHelper/myList').userList(id, interaction, reply, embedProfileUser)
            })
        }
    }
}