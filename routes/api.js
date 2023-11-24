/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route');
var courses = require('./api/course.route')

router.use('/users', users);
router.use('/courses', courses);

module.exports = router;
