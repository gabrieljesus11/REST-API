var express = require('express')
var router = express.Router()
var ContractController = require('../../controllers/contracts.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/contract.routes');
  });
router.post('/createContract', ContractController.createContract)
router.get('/contracts',Authorization, ContractController.getContracts)
router.post('/contractsForCourse', Authorization, ContractController.getContractsForCourse)
router.put('/update', Authorization, ContractController.updateContract)
router.delete('/delete', Authorization, ContractController.removeContract)



// Export the Router
module.exports = router;


