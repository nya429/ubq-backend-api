const express = require('express');
const router = express.Router({mergeParams: true});

const userDao = require('../dao/userDao');
const userService = require('../dao/userService');
// add user
router.post('/', function(req, res, next) {
	userService.add(req, res, next);
});

router.get('/', function(req, res, next) {
	userDao.getAll(req, res, next);
});

router.get('/:id', function(req, res, next) {
	userDao.getOne(req, res, next);
});

router.delete('/:id', function(req, res, next) {
	userDao.delete(req, res, next);
});

router.patch('/:id', function(req, res, next) {
	userDao.update(req, res, next);
});


module.exports = router;
