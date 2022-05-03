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
    console.log("Estoy listo!");

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