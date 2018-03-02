/*jslint esversion:6 */
const product = {
	insert:'insert into product(vendor_id, product_id, name, info, avatar_uri, create_time, update_time) VALUES(?,?,?,?,?,?,?)',
	update:'update product set vendor_id=?, product_id=?, name=?, info=?, avatar_uri=?, update_time=? where product_ix=?',
	delete: 'delete from product where product_ix=?',
	queryById: 'select * from product where product_ix=?',
	queryAll: 'select * from product',
	queryAllCnt: 'select count(*) from product',
	queryByVid: 'select * from product where vendor_id=?',
	queryByVidCnt: 'select count(*) from product where vendor_id=?'
};

module.exports = product;
