// Estructura del CRUD
const router = require('express').Router();
const {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion
} = require('../controllers/usuarios')
const auth = require('./auth');

router.get('/', obtenerUsuarios)
router.get('/:id', obtenerUsuarios);
router.post('/', crearUsuario)
router.post('/entrar', iniciarSesion)
router.put('/:id', modificarUsuario)
router.delete('/:id', eliminarUsuario)

module.exports = router;