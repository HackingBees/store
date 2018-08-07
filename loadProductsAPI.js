var http = require('http');

var settings = {
	hostname: 'localhost',
	port: 8080,
	path: '/products',
	method: 'post',
	headers: {
		'Accept': 'application/json',
		'Content-type': 'application/json'
	}
};

var client = http.request(settings, function(res){
	console.log("Status Code: " + res.statusCode);
	res.on('data',function(body){
		console.log('Body: '+body);
	});
});

var product = {
	productName: '',
	productDescription: 'Yet another product now',
	productPrice: '123G'
};

client.end(JSON.stringify(product));
