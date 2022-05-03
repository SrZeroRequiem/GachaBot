module.exports = {
    category: 'Gacha',
    description: 'Add Wish to all users',
    ownerOnly: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<number>',

    callback: async ({args, message}) => {
        const amount = parseInt(args)
        console.log(amount)
        await message.reply("Se han agregado "+amount+" tiradas a todos los usuarios")
        await require('../helpers/Utility/getWish').increaseWish("a", amount);
    }
}