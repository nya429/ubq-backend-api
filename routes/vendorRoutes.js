const express = require('express');
const router = express.Router({mergeParams: true});

const vendorDao = require('../dao/vendorDao');

// add vendor
router.post('/new', function(req, res, next) {
	vendorDao.add(req, res, next);
});

router.get('/list？', function(req, res, next) {
	vendorDao.getAll(req, res, next);
});

router.get('/search?', function(req, res, next) {
	vendorDao.searchByKeyword(req, res, next);
});

router.get('/:id', function(req, res, next) {
	vendorDao.getOne(req, res, next);
});

router.delete('/:id', function(req, res, next) {
	vendorDao.delete(req, res, next);
});

router.patch('/:id', function(req, res, next) {
	vendorDao.update(req, res, next);
});


module.exports = router;
