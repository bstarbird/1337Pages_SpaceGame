module.exports = function(app,express) {
		
	app.set('db-uri', 'mongodb://localhost/mvc-development');
    
    //If we're in cloudnine for development then we should use the "test" endpoint
    if(process.env.C9_PORT){
        app.set('spaceGameEndpoint', "gentle-lightning-5362.herokuapp.com");
    }
    else{
	    app.set('spaceGameEndpoint', "localhost");
        app.set('spaceGamePort', "3001");
    }
	app.set('sessionKey', "SuperSecretDevKey");
	
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
