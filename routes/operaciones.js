const router = require('express').Router();
const {
  crearOperaciones,
  obtenerOperaciones,
  modificarOperaciones,
  eliminarOperaciones
} = require('../controllers/operaciones')
var auth = require('./auth');

router.get('/', obtenerOperaciones)
router.get('/:id', obtenerOperaciones)// nuevo endpoint con todos los detalles de operaciones
router.post('/', crearOperaciones)
router.put('/:id', modificarOperaciones)
router.delete('/:id',eliminarOperaciones)

module.exports = router;