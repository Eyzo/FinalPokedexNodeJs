let express = require('express');
let mongoose = require('mongoose');
let nunjucks = require('nunjucks');

mongoose.connect('mongodb://localhost/pokedex', {useNewUrlParser: true});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => {

    console.log('connection réussie');

    require('./models/Pokemon');
    require('./models/Type');

    let app = express();

    nunjucks.configure('views',{
        autoescape: true,
        express: app
    });

    app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
    app.use('/',require('./router/pokemonsRouter'));
    app.use('/types',require('./router/typesRouter'));

    app.listen(8000);

});