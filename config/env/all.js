// default app configuration
var defaultConfig = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URL || "mongodb://nodegoat:owasp@widmore.mongohq.com:10000/owaspAttacker",
};

module.exports = defaultConfig;
