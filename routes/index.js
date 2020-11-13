var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('Bienvenidos a cartones Hidalgo');
});

router.use('/usuarios', require('./usuarios'));
router.use('/operaciones', require('./operaciones'));
router.use('/solicitudes', require('./solicitudes'));


module.exports = router;