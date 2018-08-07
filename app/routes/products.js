module.exports = function(app) {
    app.get('/products', function (req,res,next) {
     	var connection = app.infra.dbConnectionFactory();
     	var productsDAO = new app.models.ProductsDAO(connection);

	    productsDAO.list(function(err, results){
	    	if (err) {
	    		return next(err);
	    	}
	    	res.format({
	    		html: function() {
	    			res.render('products/list',{list:results});		
	    		},
	    		json: function() {
	    			res.json(results);
	    		}
	    	});
	        
	    });
      	connection.end();
    });
	
	app.get('/products/newProduct', function (req,res) {
		res.render('products/form',{validationErrors:{}, product:{}});
	});

	app.post('/products', function (req,res,next) {
     	var product = req.body;

     	req.assert('productName','Name is a required attribute').notEmpty();
     	req.assert('productPrice','Price is a numeric attribute').isFloat();

     	var errors = req.validationErrors();
     	if (errors) {
	    	res.format({
	    		html: function() {
		     		res.status(400).render('products/form',{validationErrors:errors, product:product});
	    		},
	    		json: function() {
	    			res.status(400).json(errors);
	    		}
	    	});
     		return;
     	}

     	var connection = app.infra.dbConnectionFactory();
     	var productsDAO = new app.models.ProductsDAO(connection);

	    productsDAO.add(product, function(err, results){
	    	if (err) {
	    		return next(err);
	    	}
	    	res.redirect('/products');
	    });
 
	});
}
