//Load configurations
process.env.NODE_ENV = process.env.NODE_ENV || "development";


var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var swig = require("swig");
var app = express();
var config = require("./config/config"); // Application config properties
var MongoClient = require("mongodb").MongoClient; // Driver for connecting to MongoDB



MongoClient.connect(config.db, function(err, db) {

	"use strict";

	if (err) throw err;


	// all environments
	app.set('port', process.env.PORT || 3000);


	// Register templating engine
	app.engine('html', swig.renderFile);
	app.set("view engine", "html");
	app.set('views', path.join(__dirname, 'views'));


	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	routes(app, db);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

	swig.setDefaults({
	root: __dirname + "/views",
	});



	http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
	});

});
