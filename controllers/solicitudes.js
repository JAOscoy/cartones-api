const mongoose = require("mongoose");
const Usuario = mongoose.model('Usuario')
const Solicitud = mongoose.model('Solicitudes')
const Operaciones = mongoose.model('Operaciones')
mongoose.set('useFindAndModify', false);

function crearSolicitud(req, res, next) { // POST v1/solicitudes?mascota_id=021abo59c96b90a02344...
  // Buscamos la mascota a solicitar
  Operaciones.findById(req.query.operaciones_id, async (err, operaciones) => {
    if (!operaciones || err) {
      return res.sendStatus(404)
    }
    // si está dispobible o pendiente podemos crear la solicitud
    const solicitud = new Solicitud()
    solicitud.operaciones = req.query.operaciones_id
    solicitud.solicitante = req.usuario.id
    solicitud.estado = 'Pendiente'
    solicitud.fechaCierre = Today()
    //solicitud.save().then(async s => {
      // antes de devolver respuesta actualizamos el tipo de usuario a anunciante
      //await Usuario.findOneAndUpdate({_id: req.usuario.id}, {tipo: 'cliente'})
      //res.status(201).send(s)
    }).catch(next)
  }

function obtenerSolicitud(req, res, next) {
  if (req.params.id){
  Solicitud.findOne({ _id: req.params.id, usuario: req.usuario.id})
      .then(async (solicitud) => {
        // añadimos información sobre la mascota
        await solicitud.populate('operaciones').execPopulate()
        if (solicitud.estado === 'Aceptada') {
          // Si la solicitud ha sido aceptada, se mostrará la información de contacto
          await solicitud.populate('usuarios', 'username nombre apellido bio foto telefono email').execPopulate()
          await solicitud.populate('usuarios', 'username nombre apellido bio foto telefono email').execPopulate()
          res.send(solicitud)
        } else {
          res.send(solicitud)
        }
      }).catch(next)
  } else {
    Solicitud.find().populate('solicitud', 'idOperacion, idSolicitante, estado').then(solicitud=>{
      res.send(solicitud)
    }).catch(next)
  }}

module.exports = {
  crearSolicitud,
  obtenerSolicitud
}