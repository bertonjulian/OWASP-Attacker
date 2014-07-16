
/* The RequestDAO must be constructed with a connected database object */
function RequestDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof RequestDAO)) {
        console.log("Warning: RequestDAO constructor called without 'new' operator");
        return new RequestDAO(db);
    }

    var requestsDB = db.collection("requests");


    this.storeRequest = function(id, req, callback){
        var body = req.body || {};
        var query = req.query || {};
        var params = req.params || {};
        var headers = req.headers || {};
        var originalUrl = req.originalUrl || "";

        var requestToStore = {
            id : id,
            created : new Date(),
            originalUrl :  originalUrl,
            queryString : query,
            params : params,
            body : body,
            headers : headers
        };

        requestsDB.insert(requestToStore, function(err, inserted){
            if(err) return callback(err);
            return callback(null);
        });

    };

    this.getById = function(id, callback) {

        // toArray could have memory issues so limit it to 100 most recent requests
        requestsDB
        .find({
            id: id
        })
        .toArray(function(err, requests) {
            if (err) return callback(err, null);
            callback(null, requests);
        });
    };
}

module.exports.RequestDAO = RequestDAO;
