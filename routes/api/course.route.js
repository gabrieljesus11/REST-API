var express = require('express')
var router = express.Router()
var CourseController = require('../../controllers/courses.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/allCourses',Authorization, CourseController.getCourses)
router.post('/createCourse', CourseController.createCourse)
/*router.post('/userByMail', Authorization, CourseController.getUsersByMail)
router.put('/update', Authorization, CourseController.updateUser)
router.delete('/delete', Authorization, CourseController.removeUser)*/



// Export the Router
module.exports = router;


