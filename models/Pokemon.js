let mongoose = require('mongoose');

let pokemonSchema = new mongoose.Schema({
    name: String,
    number: Number,
    description: String,
    picture: String,
    types: [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'Type'
        }
    ]
});

pokemonSchema.methods.parler = function() {

    let phrase = this.name ? 'mon nom est ' +  this.name : "je n'ai pas de nom";

    console.log(phrase);

};

let Pokemon = mongoose.model('Pokemon',pokemonSchema);

module.exports = Pokemon;