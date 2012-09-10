module.exports = function(app,express) {
		
	app.set('db-uri', 'mongodb://localhost/mvc-test');
	app.set('spaceGameEndpoint', "gentle-lightning-5362.herokuapp.com")
	app.set('sessionKey', "SuperSecretTestKey")
	
    app.use(express.errorHandler({ dumpExceptions: true, showStack: false }));
}
