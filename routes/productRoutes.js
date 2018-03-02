const express = require('express');
const router = express.Router({mergeParams: true});

const productDao = require('../dao/productDao');

router.post('/new', function(req, res, next) {
	productDao.add(req, res, next);
});

// router.get('/search?', function(req, res, next) {
// 	console.log('here')
// 	productDao.searchByKeyword(req, res, next);
// });

router.get('/list', function(req, res, next) {
	productDao.getAll(req, res, next);
});

router.get('/list?', function(req, res, next) {
	productDao.getByproductById(req, res, next);
});

router.get('/:id', function(req, res, next) {
	productDao.getOne(req, res, next);
});

router.delete('/:id', function(req, res, next) {
	productDao.delete(req, res, next);
});

router.patch('/:id', function(req, res, next) {
	productDao.update(req, res, next);
});




module.exports = router;
