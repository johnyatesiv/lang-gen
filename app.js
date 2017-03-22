/** https://en.wikipedia.org/wiki/Semantic_primes **/

var Sequelize = require("sequelize");
var NodeNeuralNetwork = require('node-neural-network'); // this line is not needed in the browser

var sqlz = new Sequelize();

var Neuron = NodeNeuralNetwork.Neuron,
    Layer = NodeNeuralNetwork.Layer,
    Network = NodeNeuralNetwork.Network,
    Trainer = NodeNeuralNetwork.Trainer,
    Architect = NodeNeuralNetwork.Architect;

sqlz.define("Roots", {
    type: {},
    morpheme: {}
});

sqlz.define("Words", {
    type: {},
    root: {},
    morpheme: {},
    modifier: {}
});

sqlz.define("Modifiers", {

});

function Word(type, root, morpheme, modifier) {
    this.type = type;
    this.root = root;
    this.morpheme = morpheme;
    this.modifier = modifier;
}

function Clause(structure, subject, verb, object) {
    this.content = [];

    for(var s in structure) {
        if(structure[s] == "subject") {
            this.content[s] = subject;
        } else if(structure[s] == "object") {
            this.content[s] = object;
        } else {
            this.content[s] = verb+" ";
        }
    }
}

function Sentence(clauses, junctions) {
    this.content = [];

    if(clauses.length < junctions.length) {
        throw new Error("Invalid Sentence structure.");
    } else {
        for(var c in clauses) {
            if(junctions[c]) {
                this.content[c] = clauses[c]+junctions[c]+" ";
            } else {
                this.content[c] = clauses[c]+" ";
            }
        }
    }
}

function Language() {
    this.alphabet = null;
    this.structure = null;
    this.verbs = {};
    this.nouns = {};

    this.createAlphabet = function() {
        var alphabet = Math.random().toString(36).replace(/[0-9.]+/g, '').split('');
        var filtered = [];

        for(var letter in alphabet) {
            if(filtered.indexOf(alphabet[letter]) == -1) {
                filtered.push(alphabet[letter]);
            }
        }

        this.alphabet = filtered;
    };

    this.createVerbs = function() {
        var keys = ["toBe", "toGo", "toDo", "toEat", "toDrink", "toLive", "toDie", "toHeal", "toKill"];

        for(var k in keys) {
            this.verbs[k] = this.createWord(keys[k], "Verb");

            for(var v in this.verbs) {
                if(this.verbs[k] == this.verbs[v] && v != k) {
                    this.verbs[v] = this.createWord(keys[k], "Verb");
                }
            }
        }
    };

    this.createNouns = function() {
        var keys = ["Person", "Food", "Beverage"];

        for(var k in keys) {
            this.nouns[k] = this.createWord(keys[k], "Noun");

            for(var n in this.nouns) {
                if(this.verbs[k] == this.verbs[n] && n != k) {
                    this.verbs[n] = this.createWord(keys[k], "Noun");
                }
            }
        }
    };

    this.createWord = function(root, type) {
        var length = Math.floor((Math.random()+0.5) * 5);
        var word = "";

        for(var i=0; i<length;i++) {
            word += this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
        }

        return new Word(type, root, word, null);
    };

    this.createClause = function(subject, verb, object) {
        return new Clause(this.structure, subject, verb, object);
    };

    this.createSentence = function(clauses, junctions) {
        return new Sentence(clauses, junctions);
    };

    this.createSyntaxRules = function() {
        this.structure = ["subject", "object", "verb"];

        var j, x, i;
        for (i = this.structure.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = this.structure[i - 1];
            this.structure[i - 1] = this.structure[j];
            this.structure[j] = x;
        }
    };

    this.createAlphabet();
    this.createSyntaxRules();
    this.createVerbs();
    this.createNouns();

    console.log(this.structure);
    console.log(this.verbs);
    console.log(this.nouns);
};


module.exports = new Language();