/*jslint esversion:6 */
const vendor = {
	insert:'insert into vendor(name, info, address, contact_name, contact_phone, avatar_uri, create_time, update_time) VALUES(?,?,?,?,?,?,?,?)',
	update:'update vendor set name=?, info=?, address=?, contact_name=?, contact_phone=?, avatar_uri=?, update_time=? where vendor_id=?',
	delete: 'delete from vendor where vendor_id=?',
	queryById: 'select * from vendor where vendor_id=?',
	queryAll: 'select * from vendor',
	queryAllCnt: 'select count(*) from vendor',
	queryByKeyword: "select * from vendor where (name like ?) or (contact_name like ?) or (address like ?)"
};

module.exports = vendor;
