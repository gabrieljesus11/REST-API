var express = require('express')
var router = express.Router()
var CourseController = require('../../controllers/courses.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/allCourses',Authorization, CourseController.getCourses)
router.post('/createCourse', CourseController.createCourse)
router.post('/coursesByResponsible', Authorization, CourseController.getCoursesForResponsible)
router.put('/update', Authorization, CourseController.updateCourse)
router.delete('/delete', Authorization, CourseController.removeCourse)



// Export the Router
module.exports = router;


