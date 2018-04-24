const express = require('express');
const router = express.Router({mergeParams: true});

const participantDao = require('../dao/participantDao');

router.post('/new', function(req, res, next) {
	participantDao.add(req, res, next);
});

router.post('/list/filter', function(req, res, next) {
	participantDao.searchByFilters(req, res, next);
});

router.get('/lookup?', function(req, res, next) {
	participantDao.searchByKeyword(req, res, next);
});

router.get('/list', function(req, res, next) {
	participantDao.getAll(req, res, next);
});

router.get('/list?', function(req, res, next) {
	participantDao.getByParticipantByCompanyId(req, res, next);
});

router.get('/:id', function(req, res, next) {
	participantDao.getOne(req, res, next);
});

router.delete('/:id', function(req, res, next) {
	participantDao.delete(req, res, next);
});

router.patch('/:id', function(req, res, next) {
	participantDao.update(req, res, next);
});




module.exports = router;
