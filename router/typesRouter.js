let router = require('express').Router();

let TypeModel = require('../models/Type');

router.get('/:type',(req,res) => {

    TypeModel.findOne({ name: req.params.type }).populate('pokemons').then((type) => {

        if (!type) res.status(404).send('Type introuvable');

        res.render('types/show.html',{
            type: type,
            pokemons: type.pokemons
        });

    })

});

module.exports = router;