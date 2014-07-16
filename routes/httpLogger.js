var crypto = require('crypto');
var _ = require("underscore");
//TODO: do better handling of errors

var RequestDAO = require("../data/httpRequests-dao").RequestDAO;

// randomly picked length
var LENGTH_OF_TOKEN = 20;
var NUMBER_OF_BYTES = 255;

var HttpLogHandler = function(db){

	var requestDAO = new RequestDAO(db);

	// get all the http logs for a specific id and render them newest request first  
	this.getLogsForId = function(req, res, next){
		var id = req.params.id;

		if(!id) return res.render("logs");

		requestDAO.getById(id, function(err, requests){
			if(err) return res.send("Error occurred" + err);

			// adds spacing to the JSON output to make it look nice
			_(requests).each(function(req, index, list){
				req.pretty = JSON.stringify(req,null,4);
			});

			return res.render("logs", {id:id, host:req.get('host'), requests:requests.length ? requests : undefined});
		});
	};

	this.logHttpRequest = function(req, res, next){
		var id = req.params.id;
		requestDAO.storeRequest(id, req, function(err){
			if(err) return next(err);
			next();
			
		});
	};

	this.displayHomePage = function(req, res, next){
		return res.render("home");
	};

	this.createUniqueLogsPage = function(req, res, next){
		// generate a random token and redirect to that page
		crypto.randomBytes(NUMBER_OF_BYTES, function(err, buf) {
  			if(err) return res.send("Error: Token generation failed");
  			var token = encodeURIComponent(buf.toString('base64').slice(0, LENGTH_OF_TOKEN));
  			res.redirect('/logs/' + token);
		});
	};
};

module.exports = HttpLogHandler;