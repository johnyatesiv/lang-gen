var Sequelize = require("sequeilize");
var sqlz = new Sequelize();

sqlz.define("NounRoots", {});
sqlz.define("Nouns", {});
sqlz.define("VerbRoots", {});
sqlz.define("Verbs", {});
sqlz.define("AdjectiveRoots", {});
sqlz.define("Adjectives", {});

sqlz.define("Syntax", {});

function start() {
    var core = {
        Verbs: {
            toBe: generateRandomAlpha(3),
            toGo: generateRandomAlpha(3),
            toCome: generateRandomAlpha(3),
            toSpeak: generateRandomAlpha(3),
            toConsume: generateRandomAlpha(3),
            toRest: generateRandomAlpha(3)
        },
        Nouns: {
            Person: generateRandomAlpha(6),
            Object: generateRandomAlpha(6),
            TimeUnit: generateRandomAlpha(6),
            Consumable: generateRandomAlpha(6)
        },
        Adjectives: {
            Good: generateRandomAlpha(8),
            Bad: generateRandomAlpha(8),
            More: generateRandomAlpha(8),
            Less: generateRandomAlpha(8)
        }
    };

    console.log(core);
}

function generateRandomAlpha(lim) {
    return Math.random().toString(36).replace(/[0-9.]+/g, '');
}

start();