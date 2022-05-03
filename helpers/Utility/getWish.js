const mongo = require("../../mongo");
const userSchema = require("../../schemas/user-schema");

function increaseWish(id, n) {
    const mongo = require('../../mongo')
    const userSchema = require('../../schemas/user-schema')
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                if (id === "a") {
                    await userSchema.updateMany({tiradasRestantes: {$gte: 0}}, {
                        $inc: {tiradasRestantes: n}
                    })
                } else {
                    await userSchema.findOneAndUpdate({
                        id: id
                    }, {
                        $inc: {tiradasRestantes: n}
                    })
                }


            } finally {
            }
        })
    }
    connectToMongoDB().then()

}

module.exports = {
    increaseWish: (id, n) => {
        return increaseWish(id, n);

    }

}
