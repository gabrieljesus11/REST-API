/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route');
var courses = require('./api/course.route')
var contracts = require('./api/contract.route')
var comments = require('./api/comment.route')
var contacts = require('./api/contact.route')

router.use('/users', users);
router.use('/courses', courses);
router.use('/contracts', contracts);
router.use('/comments', comments);
router.use('/contact', contacts)


module.exports = router;
