/*jslint esversion:6 */
const tracker = {
	insert:'insert into tracker(tracker_id) VALUES(?)',
	update:'update tracker set tracker_id=?',
	delete: 'delete from tracker where tracker_ix=?',
	queryByIx: 'select * from tracker where tracker_ix=?',
	queryById: 'select * from tracker where tracker_id=?',
	queryAll: 'select * from tracker',
	queryByKeyword: 'select T.tracker_id, count(participant.tag_id) as p_cnt from (select * from tracker where tracker.tracker_id like ?) as T left join participant on T.tracker_id = participant.tag_id group by T.tracker_id order by p_cnt, T.tracker_id limit ?',
	isSigned: 'select count(*) from participant where tag_id = ?',
	queryLastActive: 'select customer_id, max(unix_timestamp(time)) as time from simulation_data_1 group by customer_id order by time DESC limit ?',
};

module.exports = tracker;
