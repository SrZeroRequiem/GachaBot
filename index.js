const path = require('path');
const Discord = require('discord.js')
const {Intents} = Discord
const WOKCommands = require('wokcommands');
const mongoose = require('mongoose')
require('dotenv').config()


const  client = new Discord.Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on("ready", async() => {
    const channels = await require("./helpers/Utility/Downloader/channelGet.js").getChannel()
    console.log("Estoy listo!");
    for (let i = 0; i<channels.length;++i){
    let channelTiradas = client.channels.cache.get(channels[i].TiradasChannel);
    let channelBanner = client.channels.cache.get(channels[i].BannerChannel);
    let channelTiradasSeason = client.channels.cache.get(channels[i].TiradasSeasonChannel);
    let channelBannerSeason = client.channels.cache.get(channels[i].BannerSeasonChannel);
    require("./helpers/Utility/Activators/Activator.js").activator(channelTiradas,channelBanner)
    require("./helpers/Utility/Activators/SeasonActivator.js").activatorSeason(channelTiradasSeason,channelBannerSeason)
    }
    new WOKCommands(client, {
commandsDir: path.join(__dirname, 'commands'),
        typeScript : false,
        testServers: "724005567169036378",
        mongoUri: process.env.MONGO_URI,
        dbOptions:{
            keepAlive: true
        }
    })
        .setBotOwner(['523650886761709620',"303153220522344448","292332554852237312","927521263210098738"])
})
client.login("OTU5NjEzNDE2NDU1MTY4MDIw.G3Tb58.afYbhuWg8Bq1jS6eOkW5r2jcir9t9UFNousiIs");