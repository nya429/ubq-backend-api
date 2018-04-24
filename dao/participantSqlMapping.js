/*jslint esversion:6 */
const participant = {
	insert:'insert into participant(company_id, tag_id, first_name, last_name, company_name, job_title, email, phone, avatar_uri, priority_status, create_time, update_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
	update:'update participant set company_id=?, tag_id=?, first_name=?, last_name=?, company_name=?, job_title=?, email=?, phone=?, avatar_uri=?, priority_status=?, update_time=? where participant_id=?',
	updateCompanyNameBatch:'update participant set company_name=? where company_id = ?',
	delete: 'delete from participant where participant_id=?',
	queryById: 'select * from participant where participant_id=?',
	queryAll: "select * from participant order by create_time DESC limit ? offset ?",
	queryAllOrderASC: "select * from participant order by ?? limit ? offset ? ",
	queryAllOrderDESC: "select * from participant order by ?? DESC limit ? offset ? ",
	queryAllCnt: 'select count(*) from participant',
	queryByCid: 'select * from participant where company_id=?',
	queryByCidOrderASC: 'select * from participant where company_id=?',
	queryByCidOrderDESC: 'select * from participant where company_id=?',
	queryByCidCnt: 'select count(*) from participant where company_id=?',
	queryByKeywordCnt: "select count(*) from participant where (first_name like ?) or (last_name like ?) or (company_name like ?) or (email like ?) or (phone like ?)",
	queryByKeyword: "select * from participant where (first_name like ?) or (last_name like ?) or (company_name like ?) or (email like ?) or (phone like ?) limit ? offset ?",
	queryByKeywordOrderASC: "select * from participant where (first_name like ?) or (last_name like ?) or (company_name like ?) or (email like ?) or (phone like ?)  order by ?? limit ? offset ?",
	queryByKeywordOrderDESC: "select * from participant where (first_name like ?) or (last_name like ?) or (company_name like ?) or (email like ?) or (phone like ?) order by ?? DESC limit ? offset ?",
	queryByFilterCntPrefix: "select count(*) from participant where ((first_name like ?) or (last_name like ?))",
  queryByFilterPrefix: "select * from participant where ((first_name like ?) or (last_name like ?))",
};

module.exports = participant;
