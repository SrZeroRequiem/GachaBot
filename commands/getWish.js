module.exports = {
    category: 'Gacha',
    description: 'Add Wish to all users',
    cooldown: '24h',

    callback: async ({user,message}) => {
        const amount = 10
        await require('../helpers/Utility/getWish').increaseWish(user.id, amount);
        message.reply(":sparkles: Has obtenido 10 tiradas :sparkles:")
    }
}