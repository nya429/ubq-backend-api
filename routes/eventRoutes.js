const express = require('express');
const router = express.Router({mergeParams: true});

const trackerDao = require('../dao/trackerDao');

// search trackers
router.get('/tracker/lookup?', function(req, res, next) {
	trackerDao.searchByKeyword(req, res, next);
});

router.get('/tracker/valid?', function(req, res, next) {
	trackerDao.isTrackerValid(req, res, next);
});

//exist?
router.get('/tracker/:id', function(req, res, next) {
	trackerDao.getOne(req, res, next);
});



//isSigned?



module.exports = router;
