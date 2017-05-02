let express = require('express');
let app = express();

app.get('/', function(req, res){
	console.log("Index");
	res.end();
})

var server = app.listen(8000, function(){
	var host = server.address().address
	var port = server.address().port

	console.log("Server listening at http://%s:%s", host, port);
})