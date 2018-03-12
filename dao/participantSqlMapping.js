/*jslint esversion:6 */
const participant = {
	insert:'insert into participant(company_id, tag_id, first_name, last_name, company_name, job_title, email, phone, avatar_uri, priority_status, create_time, update_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
	update:'update participant set company_id=?, tag_id=?, first_name=?, last_name=?, company_name=?, job_title=?, email=?, phone=?, avatar_uri=?, priority_status=?, update_time=? where participant_id=?',
	delete: 'delete from participant where participant_id=?',
	queryById: 'select * from participant where participant_id=?',
	queryAll: "select * from participant limit ? offset ? ",
	queryAllOrderASC: "select * from participant order by ?? limit ? offset ? ",
	queryAllOrderDESC: "select * from participant order by ?? DESC limit ? offset ? ",
	queryAllCnt: 'select count(*) from participant',
	queryByCid: 'select * from participant where company_id=?',
	queryByCidCnt: 'select count(*) from participant where company_id=?',
	queryByKeyword: "select * from participant where (name like ?) or (contact_name like ?) or (address like ?)"
};

module.exports = participant;
