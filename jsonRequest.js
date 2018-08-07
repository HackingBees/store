var http = require('http');

var settings = {
	hostname: 'localhost',
	port: 8080,
	path: '/products',
	headers: {
		'Accept': 'application/json'
	}
};

http.get(settings, function(res){
	console.log("Status Code: " + res.statusCode);
	res.on('data',function(body){
		console.log('Body: '+body);
	});
});