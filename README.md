A Node js wrapper for hackerearth api.

usage:

var hackerApi = require('./heapi');
var options = {
	client_secret : 'client secret',
	/* Optional */
	/*
	time_limit : 3, 		// Default is 5
	memory_limit: 262144,	// Default is 262144
	async: 0, 				// Default is 0
	*/
}

var handle = new hackerApi(options);
var prog_data = {
	source: 'print "May the force be with you!"',
	lang: 'PYTHON' 
}
handle.compile(prog_data, function(err, res){
	if(err)
		console.log(err);
	else
		console.log(res);
});

/*
handle.run(prog_data, function(err, res){
	if(err)
		console.log(err);
	else
		console.log(res);
});
*/ 
