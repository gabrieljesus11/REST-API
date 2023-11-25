var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/contracts.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/contract.routes');
  });
router.post('/createContract', UserController.createContract)
router.get('/contracts',Authorization, UserController.getContracts)
router.post('/contractsForCourse', Authorization, UserController.getUsersByMail)
router.put('/update', Authorization, UserController.updateContract)
router.delete('/delete', Authorization, UserController.removeContract)



// Export the Router
module.exports = router;


