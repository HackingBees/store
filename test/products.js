var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProductsController',function(){

	beforeEach(function(done){
		var connection = express.infra.dbConnectionFactory();
     	var productsDAO = new express.models.ProductsDAO(connection);
	    productsDAO.truncate(function(err, results){
	    	if (!err) {
	    		done();
	    	}
	    });
	});

	it('#List Products returning json', function(done){
		request.get('/products')
			.set('Accept','application/json')
			.expect('Content-type',/json/)
			.expect(200,done);
	});

	it('#List Products returning html', function(done){
		request.get('/products')
			.set('Accept','text/html')
			.expect('Content-type',/html/)
			.expect(200,done);
	});

	it('#New product with empty name',function(done){
		request.post('/products')
			.send({productName : '', productDescription : 'a description'})
			.expect(400,done);
	});

	it('#New product with invalid price',function(done){
		request.post('/products')
			.send({productName : 'a product', productDescription : 'a description', productPrice : '100$'})
			.expect(400,done);
	});

	it('#New product with valid information',function(done){
		request.post('/products')
			.send({productName : 'a product', productDescription : 'a description', productPrice : 100})
			.expect(302,done);
	});

});