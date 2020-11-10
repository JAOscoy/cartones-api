const router = require('express').Router();
const {
  crearSolicitud,
  obtenerSolicitud,
  modificarSolicitud,
  eliminarSolicitud
} = require('../controllers/solicitudes')
var auth = require('./auth');

router.get('/', obtenerSolicitud)
router.get('/:id', obtenerSolicitud)
router.post('/', crearSolicitud)
//router.put('/:id', modificarSolicitud)
//router.delete('/:id', eliminarSolicitud)

module.exports = router;