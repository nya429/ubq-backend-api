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

router.post('/tracker/locs/span', function(req, res, next) {
	trackerDao.getTrackerLocsByTime(req, res, next);
});

router.post('/tracker/locs/current', function(req, res, next) {
	trackerDao.getLastLoctionsByIds(req, res, next);
});

router.get('/tracker/lastActive', function(req, res, next) {
	trackerDao.getLastActivedTrackers(req, res, next);
});

//exist?
router.get('/tracker/:id', function(req, res, next) {
	trackerDao.getOne(req, res, next);
});



//isSigned?



module.exports = router;
