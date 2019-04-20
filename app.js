let express = require('express');
let mongoose = require('mongoose');
let nunjucks = require('nunjucks');
let bodyParser = require('body-parser');
let multer = require('multer');

let storage = multer.diskStorage({

    destination: function (req,file,cb) {
        cb(null,__dirname + '/uploads');
    },

   filename: function (req,file,cb) {
       cb(null, file.fieldname + '-' + Date.now() + '.png');
   }

});

let upload = multer({
    storage: storage
});

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

    app.use(bodyParser.urlencoded());
    app.use(upload.single('file'));
    app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
    app.use('/',require('./router/pokemonsRouter'));
    app.use('/types',require('./router/typesRouter'));
    app.use('/uploads',express.static(__dirname + '/uploads'));


    app.listen(8000);

});