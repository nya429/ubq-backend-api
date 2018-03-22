/*jslint esversion:6 */
const tracker = {
	insert:'insert into tracker(tracker_id) VALUES(?)',
	update:'update tracker set tracker_id=?',
	delete: 'delete from tracker where tracker_ix=?',
	queryByIx: 'select * from tracker where tracker_ix=?',
	queryById: 'select * from tracker where tracker_id=?',
	queryAll: 'select * from tracker',
	queryByKeyword: 'select * from tracker where (tracker_id like ?) order by tracker_id limit ?',
	isSigned: 'select count(*) from participant where tag_id = ?'
};

module.exports = tracker;
