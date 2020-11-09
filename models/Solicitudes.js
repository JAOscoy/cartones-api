// Solicitud.js
/** Clase que representa una solicitud de operaciones
class Solicitud {
    constructor(id, idOperacion, fechaDeCreacion, idUsuarioSolicitante, estatus, fechaDeCierre) {
      this.id = id;
      this.idOperacion = idOperacion;
      this.fechaDeCreacion = fechaDeCreacion;
      this.idUsuarioSolicitante = idUsuarioSolicitante;
      this.estatus = estatus;
      this.fechaCierre = fechaDeCierre;
    }
  
  }
  
  module.exports = Solicitud;*/

const mongoose = require("mongoose");

var SolicitudSchema = new mongoose.Schema(
  {
    idOperacion: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Operacion",
    },
    idUsuarioSolicitante: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    fechaCierre: {
      type: Date
    },
    estado: { type: String, enum: ["aceptada", "cancelada", "pendiente"] },
  },
  { collection: "solicitudes", timestamps: true }
);

mongoose.model('Solicitudes', SolicitudSchema)