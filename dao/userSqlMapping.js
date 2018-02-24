/*jslint esversion:6 */
const user = {
	insert:'INSERT INTO user(email, password, create_time, update_time) VALUES(?,?,?,?)',
	update:'update user set first_name=?, last_name=? where user_id=?',
	delete: 'delete from user where user_id=?',
	queryById: 'select * from user where user_id=?',
	queryAll: 'select * from user'
};

module.exports = user;
