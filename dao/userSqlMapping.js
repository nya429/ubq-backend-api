/*jslint esversion:6 */
const user = {
	insert:'INSERT INTO user(email, last_name, first_name, role, vendor_id, password, create_time, update_time) VALUES(?,?,?,?,?,?,?,?)',
	update:'update user set first_name=?, last_name=?, update_time=? where user_id=?',
	delete: 'delete from user where user_id=?',
	queryById: 'select * from user where user_id=?',
	queryAll: 'select * from user',
	queryCnt: 'select count(*) from user'
};

module.exports = user;
