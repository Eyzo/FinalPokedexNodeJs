let router = require('express').Router();

let TypeModel = require('../models/Type');

router.get('/',(req,res) => {

    TypeModel.find((err,types)=> {

        if (err) return console.error(err);

        res.render('types/index.html',{
            types:types
        });

    });

});

module.exports = router;