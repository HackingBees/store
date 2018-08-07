module.exports = function(app) {
    app.get('/promo/form', function (req,res,next) {
     	var connection = app.infra.dbConnectionFactory();
     	var productsDAO = new app.models.ProductsDAO(connection);

	    productsDAO.list(function(err, results){
	    	if (err) {
	    		return next(err);
	    	}
	    	res.render('promo/form',{list:results});

	    });
      	connection.end();
    });

    app.post('/promo', function (req,res,next) {
        var promo = req.body;
        var io = app.get('io');

        var connection = app.infra.dbConnectionFactory();
     	var productsDAO = new app.models.ProductsDAO(connection);
        productsDAO.searchById(promo.product.id, function(err, results){
	    	if (err) {
	    		return next(err);
	    	}
            var promoRecord = { message: promo.message, product: results[0].name };
            io.emit('newPromo',promoRecord);
            res.redirect('promo/form');
	    });
        connection.end();
    });
}
