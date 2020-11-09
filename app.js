var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

// Objeto global de la app
var app = express();

// configuración de middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://introabd:introabd1234@cluster0.yx5qd.mongodb.net/cartonesHidalgo"
);
mongoose.set("debug", true);

// Aquí se importarán el resto de los modelos cuando esten listos.

require("./models/Usuario");
require('./config/passport');
require('./models/Operaciones');
require('./models/Solicitudes');
// Agregamos el código de nuestro router (routes/index.js)
app.use('/v1', require('./routes'));

// Manejando los errores 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Iniciando el servidor...
var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Escuchando en el puerto ' + server.address().port);
});

