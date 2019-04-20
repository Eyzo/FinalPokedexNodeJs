let router = require('express').Router();

let PokemonModel = require('../models/Pokemon');
let TypesModel = require('../models/Type');

router.get('/',(req,res) => {

    PokemonModel.find({}).populate('types').then((pokemons) => {

        res.render('pokemons/index.html',{
            pokemons: pokemons
        })

    }).catch()
});

router.get('/new',(req,res) => {

    TypesModel.find({}).then((types) => {

        let pokemon = new PokemonModel();

        res.render('pokemons/edit.html',{
            pokemon: pokemon,
            types: types,
            endpoint: '/'
        });

    }).catch();
});

router.get('/edit/:id',(req,res) => {

    TypesModel.find({}).then((types) => {
        PokemonModel.findById(req.params.id).then((pokemon) => {
            res.render('pokemons/edit.html',{
                pokemon:pokemon,
                types:types,
                endpoint: '/' + pokemon._id.toString()
            });
        });
    }).catch();
});

router.get('/delete/:id',(req,res) => {

    PokemonModel.findOneAndRemove({ _id: req.params.id}).then(() => {

        res.redirect('/');

    })

});

router.get('/:id',(req,res) => {

    PokemonModel.findById(req.params.id).populate('types').then((pokemon)=> {

        res.render('pokemons/show.html',{
            pokemon:pokemon
        })

    }).catch();
});

router.post('/:id?',(req,res) => {

    new Promise((resolve,reject) => {
        if (req.params.id) {
            PokemonModel.findById(req.params.id).then(resolve,reject)
        } else {
            resolve(new PokemonModel());
        }
    }).then((pokemon) => {
        pokemon.name = req.body.name;
        pokemon.description = req.body.description;
        pokemon.number = req.body.number;
        pokemon.types = req.body.types;

        if (req.file) pokemon.picture = req.file.filename;

        return pokemon.save();
    }).then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
    });

});


module.exports = router;