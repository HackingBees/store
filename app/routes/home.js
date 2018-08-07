module.exports = function(app) {
    app.get('/', function (req,res,next) {
     	var connection = app.infra.dbConnectionFactory();
     	var productsDAO = new app.models.ProductsDAO(connection);

	    productsDAO.list(function(err, results){
	    	if (err) {
	    		return next(err);
	    	}
	    	res.render('home/index',{products:results});		
	        
	    });
      	connection.end();
	});
}