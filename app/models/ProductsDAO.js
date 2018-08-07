function ProductsDAO(connection) {
	this._connection = connection;
}

ProductsDAO.prototype.list = function(callback) {
	this._connection.query('SELECT * FROM products', callback);
}

ProductsDAO.prototype.searchById = function(id, callback) {
	this._connection.query('SELECT * FROM products WHERE `id`=?', id, callback);
}

ProductsDAO.prototype.add = function(product, callback) {
	var insert = "INSERT INTO products (name, description, suggested_price) values ";
	insert += "('" + product.productName + "',";
	insert += "'" + product.productDescription + "',";
	insert += product.productPrice + ")";
	this._connection.query(insert, callback);
}

ProductsDAO.prototype.truncate = function(callback) {
	this._connection.query("TRUNCATE TABLE products", callback);
}

module.exports = function() {
  return ProductsDAO;
}
