// Usuario.js
/*
db.usuarios.insertOne({
        internalId: 1,
      username: "Admin",
      nombre: "José Alberto",
      apellido: "Oscoy Calderon",
      email: "oscoyja@gmail.com",
      password: "VOab!996",
      razonSocial: "Cartones de Hidalgo",
      taxId: "23",
      ubicacion: "Estado de México",
      telefono: 5546403495,
      nivelAcceso: 5
    })
    */
/** Clase que representa a un usuario de la plataforma
class Usuario {
    constructor(id, username, nombre, apellido, email, password, razonSocial, taxId, ubicacion, telefono) {
      this.username = username;
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.password = password;
      this.razonSocial = razonSocial;
      this.taxId = taxId;
      this.ubicacion = ubicacion;
      this.telefono = telefono;
      this.nivelAcceso = 1;
    }
  }
  
  module.exports = Usuario;*/

  // Usuario.js
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const UsuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/^[a-zA-Z0-9]+$/, "es inválido"],
      index: true,
    },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/\S+@\S+\.\S+/, "es inválido"],
      index: true,
    },
    ubicacion: String,
    razonSocial: String,
    taxId: String,
    telefono: {type: Number, required: true},
    nivelAcceso: { type: String, enum: ['cliente', 'administrador'] },
    hash: String, //este campo se utilizará para la sesión
    salt: String, //este campo se utilizará para la sesión
  },
  { timestamps: true }
);

// usando plugin de validación para que no se repitan correos ni usernames
UsuarioSchema.plugin(uniqueValidator, { message: "Ya existe" });

UsuarioSchema.methods.crearPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex"); // generando una "salt" random para cada usuario
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex"); // generando un hash utilizando la sal
  };
  
  /**
   * Recibe el password, genera y compara el has con el de la base de datos
   */
  UsuarioSchema.methods.validarPassword = function (password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
    return this.hash === hash;
  };
  
  UsuarioSchema.methods.generarJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60); // 60 días antes de expirar
  
    return jwt.sign({
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };
  
  /**
   * Devuelve la representación de un usuario después de autenticar
   */
  UsuarioSchema.methods.toAuthJSON = function(){
    return {
      username: this.username,
      email: this.email,
      token: this.generarJWT()
    };
  };
  
  /*
  * Devuelve la representación de un usuario, sólo datos públicos
  
  UsuarioSchema.methods.publicData = function(){
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      bio: this.bio,
      foto: this.foto,
      tipo: this.tipo,
      ubicacion: this.ubicacion,
      telefono: this.telefono,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  };*/
  
  mongoose.model("Usuario", UsuarioSchema);