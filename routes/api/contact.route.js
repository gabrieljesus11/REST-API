var express = require('express')
var router = express.Router()
var ContactController = require('../../controllers/contact.controller');

router.post('/createContact', ContactController.createContact)

// Export the Router
module.exports = router;