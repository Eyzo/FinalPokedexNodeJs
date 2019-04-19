let router = require('express').Router();

let PokemonModel = require('../models/Pokemon');
let TypesModel = require('../models/Type');

router.get('/',(req,res) => {

    PokemonModel.find({}).populate('types').then((pokemons) => {

        res.render('pokemons/index.html',{
            pokemons: pokemons
        })

    })
});

router.get('/new',(req,res) => {

    TypesModel.find({}).then((types) => {

        let pokemon = new PokemonModel();

        res.render('pokemons/edit.html',{
            pokemon: pokemon,
            types: types
        });

    });
});

router.get('/edit/:id',(req,res) => {

    TypesModel.find({}).then((types) => {
        PokemonModel.findById(req.params.id).then((pokemon) => {
            res.render('pokemons/edit.html',{
                pokemon:pokemon,
                types:types
            });
        });
    });
});

router.get('/:id',(req,res) => {

    PokemonModel.findById(req.params.id).populate('types').then((pokemon)=> {

        res.render('pokemons/show.html',{
            pokemon:pokemon
        })

    })
});

module.exports = router;