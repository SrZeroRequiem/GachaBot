module.exports = {
    category: 'Gacha',
    description: 'Add Wish to all users',
    ownerOnly: true,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<number>',

    callback: async (args) => {
        const amount = parseInt(args.text)
        await require('../helpers/Utility/getWish').increaseWish("a", amount);
        console.log(amount)
    }
}