var express = require('express')
var router = express.Router()
var CommentController = require('../../controllers/comments.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/contract.routes');
  });
router.post('/createComment', CommentController.createComment)
router.post('/commentsForCourse', Authorization, CommentController.getCommentsForCourse)
router.put('/update', Authorization, CommentController.updateComment)
router.delete('/delete', Authorization, CommentController.removeComment)



// Export the Router
module.exports = router;


