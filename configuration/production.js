module.exports = function(app,express) {
		
	app.set('db-uri', process.env.MONGOHQ_URL);
	app.set('spaceGameEndpoint', "gentle-lightning-5362.herokuapp.com")
	app.set('sessionKey', "SuperSecretProductionKey")
	
    app.use(express.errorHandler({ dumpExceptions: false, showStack: false }));
}
