function createDistribution(array, weights, size) {
    const distribution = [];
    const sum = weights.reduce((a, b) => a + b);
    const quant = size / sum;
    for (let i = 0; i < array.length; ++i) {
        const limit = quant * weights[i];
        for (let j = 0; j < limit; ++j) {
            distribution.push(i);
        }
    }
    return distribution;
}

const randomIndex = (distribution) => {
    const index = Math.floor(distribution.length * Math.random());  // random index
    return distribution[index];
};
const createWeights = (array,piti) => {
    const weights = [];
    console.log(piti)
    if (Number(piti) >= 50){
        for (let i = 0; i < array.length; ++i) {
            let prob
            switch (array[i].stars) {
                case 8 : {
                    prob = 0
                    break;
                }
                case 7 : {
                    prob = 50
                    break;
                }
                case 6 : {
                    prob = 50
                    break;
                }
                case 5: {
                    prob = 0
                    break
                }
                case 4: {
                    prob = 0
                    break;
                }
                case 3: {
                    prob = 0
                    break;
                }
                case 1: {
                    prob = 0
                    break;
                }
                case 0: {
                    prob = 0
                    break;
                }

            }
            weights.push(prob);
        }
    }else{
    for (let i = 0; i < array.length; ++i) {
        let prob
        switch (array[i].stars) {
            case 8 : {
                prob = 0
                break;
            }
            case 7 : {
                prob = 0.2
                break;
            }
            case 6 : {
                prob = 1
                break;
            }
            case 5: {
                prob = 20
                break
            }
            case 4: {
                prob = 30
                break;
            }
            case 3: {
                prob = 10
                break;
            }
            case 1: {
                prob = 0
                break;
            }
            case 0: {
                prob = 0
                break;
            }

        }
        weights.push(prob);
    }
    }
    return weights;

};

async function getIndex(user) {
    const piti = await require("../../Utility/getPiti").getPiti(user)
    const waifuList = await require("./getArraySeason").getArray();
    const weights = createWeights(waifuList,piti);
    const distribution = createDistribution(waifuList, weights, 1000000);
    return randomIndex(distribution);
}

function getThumb(index) {
    const anime = waifuList[index].anime;
    let linkThumb;
    for (let i = 0; i < animeList.length; ++i) {
        if (anime == animeList[i].name) {
            linkThumb = animeList[i].linkURL;
        }
    }
    return linkThumb;
}

module.exports = {
    getIndex: (user) => {
        return getIndex(user);
    }, getThumbnail: (index) => {
        return getThumb(index);
    }
};