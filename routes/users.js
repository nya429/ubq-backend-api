var express = require('express');
var router = express.Router({mergeParams: true});

var userDao = require('../dao/userDao');

// add user
router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});

router.get('/', function(req, res, next) {
	userDao.getAll(req, res, next);
});


module.exports = router;
