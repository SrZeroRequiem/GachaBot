const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
module.exports = {
    category: 'Gacha',
    description: 'Send the banner to the channel',
    slash: false,
    ownerOnly: true,
    testOnly: false,
    callback: async ({message, client}) => {
        const init = message.content.lastIndexOf("!setBanner") + ("!setBanner").length + 4
        const subChannel = message.content.substr(init)
        const channelLenght = subChannel.length - 1
        const channelsSended = subChannel.substr(0, channelLenght)
        console.log(channelsSended)
        const channelBanner = client.channels.cache.get(channelsSended)
        const rows = new MessageActionRow()
            .addComponents(new MessageButton()
                .setCustomId('register')
                .setLabel('Registrarse')
                .setStyle('SUCCESS'))
            .addComponents(new MessageButton()
                .setCustomId('wis')
                .setEmoji('✨')
                .setLabel('Tirada')
                .setStyle('PRIMARY'))
            .addComponents(new MessageButton()
                .setCustomId('wis_ten')
                .setEmoji('✨')
                .setLabel('Tirada x 5')
                .setStyle('PRIMARY'))
        const embedDatos = new MessageEmbed()
            .setTitle("Banner Mayo 2022")
            .setColor(0x00FFFF)
            .setImage('https://i.imgur.com/ez3uwvo.png');
        try{
        await channelBanner.send({
            embeds: [embedDatos], components: [rows]
        })
        }catch (e){
            await message.reply("Ese canal no existe")
        }


    }
}
