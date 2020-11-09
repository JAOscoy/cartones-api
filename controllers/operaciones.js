const mongoose = require('mongoose')
const Operaciones = mongoose.model('Operaciones')

function crearOperaciones(req, res, next) {
  var operacion = new Operaciones(req.body)
  operacion.anunciante = req.usuario.id
  operacion.estado = 'disponible'
  operacion.save().then(operacion => {
    res.status(201).send(operacion)
  }).catch(next)
}

function obtenerOperaciones(req, res, next) {
    if(req.params.id){
      Operaciones.findById(req.params.id)
              .populate('anunciante', 'username nombre apellido bio foto').then(operaciones => {
            res.send(operaciones)
          }).catch(next)
    } else {
      Operaciones.find().then(operaciones=>{
        res.send(operaciones)
      }).catch(next)
    }}

function modificarOperaciones(req, res, next) {
        console.log(req.operaciones)
        operaciones.findById(req.operaciones.id).then(operaciones => {
          if (!operaciones) { return res.sendStatus(401); }
          let nuevaInfo = req.body
          if (typeof nuevaInfo.nombre !== 'undefined')
            operaciones.nombre = nuevaInfo.nombre
          if (typeof nuevaInfo.tipoOperacion !== 'undefined')
            operaciones.tipoOperacion = nuevaInfo.tipoOperacion
          if (typeof nuevaInfo.fotos !== 'undefined')
          operaciones.fotos = nuevaInfo.fotos
          if (typeof nuevaInfo.email !== 'undefined')
          operaciones.email = nuevaInfo.email
          if (typeof nuevaInfo.razonSocial !== 'undefined')
          operaciones.razonSocial = nuevaInfo.razonSocial
          if (typeof nuevaInfo.taxId !== 'undefined')
          operaciones.taxId = nuevaInfo.taxId
          if (typeof nuevaInfo.ubicacion !== 'undefined')
          operaciones.ubicacion = nuevaInfo.ubicacion
          if (typeof nuevaInfo.telefono !== 'undefined')
          operaciones.telefono = nuevaInfo.telefono
          if (typeof nuevaInfo.password !== 'undefined')
          operaciones.crearPassword(nuevaInfo.password)
          operaciones.save().then(updatedUser => {
            res.status(201).json(updatedUser.publicData())
          }).catch(next)
        }).catch(next)
      }
      
    function eliminarOperaciones(req, res) {
        // únicamente borra a su propio usuario obteniendo el id del token
        Operaciones.findOneAndDelete({ _id: req.operaciones.id }).then(r => {
          res.status(200).send(`Operacion ${req.params.id} eliminado: ${r}`);
        })
      }


module.exports = {
    crearOperaciones,
    obtenerOperaciones,
    modificarOperaciones,
    eliminarOperaciones
  }