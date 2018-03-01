const express = require('express');
const router = express.Router({mergeParams: true});

const companyDao = require('../dao/companyDao');

router.post('/new', function(req, res, next) {
	companyDao.add(req, res, next);
});

router.get('/search?', function(req, res, next) {
	companyDao.searchByKeyword(req, res, next);
});

router.get('/list?', function(req, res, next) {
	companyDao.getAll(req, res, next);
});

router.get('/:id', function(req, res, next) {
	companyDao.getOne(req, res, next);
});

router.delete('/:id', function(req, res, next) {
	companyDao.delete(req, res, next);
});

router.patch('/:id', function(req, res, next) {
	companyDao.update(req, res, next);
});




module.exports = router;
