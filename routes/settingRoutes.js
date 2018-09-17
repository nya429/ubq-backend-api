const express = require('express');
const router = express.Router({mergeParams: true});

const settingDao = require('../dao/settingDao');

router.post('/new', function(req, res, next) {
	settingDao.add(req, res, next);
});

router.get('/list', function(req, res, next) {
	settingDao.getAll(req, res, next);
});

router.get('/:id', function(req, res, next) {
	settingDao.getOne(req, res, next);
});

router.post('/iskeytake', function(req, res, next) {
	settingDao.isKeyTaken(req, res, next);
});

router.delete('/:id', function(req, res, next) {
	settingDao.delete(req, res, next);
});

router.patch('/:id', function(req, res, next) {
	settingDao.update(req, res, next);
});

module.exports = router;
