var fs = require('fs')
	, express = require('express')
	, coffeekup = require('coffeekup')
	, routeBootstrapper = require('./routeBootstrapper')
	, apiRequestBootstrapper = require('./apiRequestBootstrapper')
	, authenticationRequestWrapper = require('./authenticationRequestWrapper')
	, nodeDi = require('nodey')

var path = __dirname;

exports.boot = function(){
	nodeDi.register(path, ["controllers", "models", "views"], function(err){
		if(err){
			callback(err)
			return;
		}

		var app = express.createServer();	
		importConfigurationSettings(app);
		initializeMiddleware(app);
		initializeViewEngine(app);
		addErrorHandling(app);
		routeBootstrapper.boot(app, nodeDi.resolve);
		apiRequestBootstrapper.boot(app, function(err){
			if(err){
				callback(err)
				return;
			}
			startListening(app);
		});
	});
};

var importConfigurationSettings = function(app){
    require(path + '/configuration/configuration.js')(app, express);
};

var initializeViewEngine = function (app){
    app.set('views', path + '/views');
    app.register('.coffee', require('coffeekup').adapters.express);
	app.set('view engine', 'coffee');
};

var initializeMiddleware = function (app) {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret: app.set('sessionKey') }));
	app.use(express.static(path + '/public'));  // Before router to enable dynamic routing
	app.use(authenticationRequestWrapper); // Before route to force authentication before controllers act
	app.use(app.router);
};

var addErrorHandling = function (app){
    app.error(function(err, req, res){
        console.log('Internal Server Error: ' + err.message);
        console.log(err.stack);
        res.render('500');
    });

    // Generally a horrible idea...
    process.on('uncaughtException', function (err) {
        console.log(err.stack);
    });
};

var startListening = function(app){
    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log("Express server %s in %s listening on port %d", express.version, app.settings.env, port);
};

if (!module.parent) {
	exports.boot(function(err, app){
		if(err)
		{
			console.log("Error booting application: " + err)
			process.exit(1);
		}
	
		var port = process.env.PORT || 3000;
		app.listen(port);
		console.log("Express server %s in %s listening on port %d", express.version, app.settings.env, port)
	});
};