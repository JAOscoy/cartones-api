// Operaciones.js
/** Clase que representa las caracteristicas del servicio ofrecido */
const mongoose = require("mongoose");

const OperacionesSchema = new mongoose.Schema({
  nombre: {type: String, required: true}, // nombre de la mascota (o titulo del anuncio)
  tipoOperacion: {type: String, enum: ['compra de corrugado', 'servicio de asesoria'] }, // perro | gato | otro
  fotos: [String], // links a las fotografías
  descripcion: {type:String, required: true}, // descripción del anuncio // contacto con la persona que anuncia al animalito
  beneficios: {type:String, required: true},// muy importante
}, { timestamps: true })

mongoose.model('Operaciones', OperacionesSchema)