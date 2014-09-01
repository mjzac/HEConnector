/**
 *      heapi.js
 *      HackerEarth API connector 
 *      v0.1
 *      Melson Zacharias (jmelson7@gmail.com)
 *      1st September, 2014
 **/


var querystring = require('querystring');
var http = require('http');


var he = HE.prototype;

/*  Initialize the required parameters */
function HE(options){
    console.log(options);
    this._client_secret = options.client_secret === undefined? null : options.client_secret;
    this._time_limit = options.time_limit === undefined ? 5 : options.time_limit > 5 ? 5 : options.time_limit;
    this._memory_limit = options.memory_limit === undefined ? 262144 : options.memory_limit;
    this._async = options.async === undefined ? 0 : options.async;
    
    /*  Compile url */
    this.COMPILE_URL = '/code/compile/';

    /* Run url */
    this.RUN_URL = '/code/run/';
}

/* Initialize the payload */
he.setParams  = function(options) {
    params = {
        client_secret: this._client_secret,
        source: options.source === undefined?null:options.source,
        lang: options.lang,
        time_limit: this._time_limit,
        memory_limit: this._memory_limit,
        async: this._async,
    };
    /* url encode the payload */
    return querystring.stringify(params);
};

/* Execute the request */
he.makeRequest = function(action, params, callback) { 
    var post_options = {
        host: 'api.hackerearth.com',
        port: '80',
        path: action,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': params.length
        }
    };
    // Set up the request
    var post_req = http.request(post_options, function(res) {
        var response = '';
        res.setEncoding('utf8');
        res.on('error', function(err){
            return callback(err, null);
        });
        res.on('data', function (chunk) {
        
            response += chunk;
        });
        res.on('end', function(err, res){
            if (err){
                return callback(err, null);
            }
            return callback(null, response);
        });
    }).on('error',function(err){
    	callback(err,null);
    });
    console.log(params);
    post_req.write(params);
    post_req.end();
};

/* compile method */
he.compile = function(options, callback){
    var params = this.setParams(options);
    // POST Request and callback response
    this.makeRequest(this.COMPILE_URL, params, callback);
};

/* run method */
he.run = function(options, callback){
    var params = this.setParams(options);
    // POST Request and callback response
    this.makeRequest(this.RUN_URL, params, callback);  
};
module.exports  = HE;