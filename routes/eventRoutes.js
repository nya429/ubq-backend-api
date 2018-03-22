const express = require('express');
const router = express.Router({mergeParams: true});

const trackerDao = require('../dao/trackerDao');

// search trackers
router.get('/trackers/search?', function(req, res, next) {
	trackerDao.searchByKeyword(req, res, next);
});

router.get('/trackers/valid?', function(req, res, next) {
	trackerDao.isTrackerValid(req, res, next);
});

//exist?
router.get('/trackers/:id', function(req, res, next) {
	trackerDao.getOne(req, res, next);
});



//isSigned?



module.exports = router;
