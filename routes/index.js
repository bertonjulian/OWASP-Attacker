var ErrorHandler = require("./error").errorHandler;
var HttpLogHandler = require("./httpLogger");

var exports = function(app, db) {

    "use strict";

    var httpLogHandler = new HttpLogHandler(db);


    app.get("/", httpLogHandler.displayHomePage);

    app.get("/home", httpLogHandler.displayHomePage);

    app.get("/logs", httpLogHandler.createUniqueLogsPage);

    app.get("/logs/:id", httpLogHandler.getLogsForId);

    app.get("/logs/:id/save", httpLogHandler.logHttpRequest, httpLogHandler.getLogsForId);

    app.post("/logs/:id/save", httpLogHandler.logHttpRequest, httpLogHandler.getLogsForId);



    // Error handling middleware
    app.use(ErrorHandler);
};

module.exports = exports;
