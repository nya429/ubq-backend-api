/*jslint esversion:6 */
const company = {
	insert:'insert into company(name, info, address, contact_name, contact_phone, avatar_uri, create_time, update_time) VALUES(?,?,?,?,?,?,?,?)',
	update:'update company set name=?, info=?, address=?, contact_name=?, contact_phone=?, avatar_uri=?, update_time=? where company_id=?',
	delete: 'delete from company where company_id=?',
	queryById: 'select * from company where company_id=?',
	queryAll: 'select * from company',
	queryAllCnt: 'select count(*) from company',
	queryByKeyword: "select * from company where (name like ?) or (contact_name like ?) or (address like ?)"
};

module.exports = company;
