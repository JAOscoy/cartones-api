// Solicitud.js
/** Clase que representa una solicitud de operaciones*/
class Solicitud {
    constructor(id, idOperacion, fechaDeCreacion, idUsuarioSolicitante, estatus, fechaDeCierre) {
      this.id = id;
      this.idOperacion = idOperacion;
      this.fechaDeCreacion = fechaDeCreacion;
      this.idUsuarioAnunciante = idUsuarioAnunciante;
      this.idUsuarioSolicitante = idUsuarioSolicitante;
      this.estatus = estatus;
      this.fechaDeCierre = fechaDeCierre;
    }
  
  }
  
  module.exports = Solicitud;