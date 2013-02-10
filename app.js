var fs = require('fs')
	, express = require('express')
	, authenticationRequestWrapper = require('./authenticationRequestWrapper')
	, nodeDi = require('nodey')
	, async = require('async')

var path = __dirname;

exports.boot = function(){

	async.waterfall([
			registerContainer,
			importConfigurationSettings,
			initializeMiddleware,
			initializeViewEngine,
			bootstrapRoutes,
			bootstrapApiDependency,
			startListening
		],
		function(err, result){
			if(err){
				console.log("App died...")
				console.error(err)
				process.exit()
				return;
			}
		}
	)
};

var registerContainer = function(callback){
	nodeDi.register(path, ["controllers", "models", "bootstrap"], function(err){
		if(err){
			callback(err)
			return;
		}
		callback(null, express());
	});
}

var importConfigurationSettings = function(app, callback){
    require(path + '/configuration/configuration.js')(app, express);
	callback(null, app);
};

var initializeViewEngine = function (app, callback){
    app.set('views', path + '/views');
    app.set('view engine', 'html');
    var hbs = require('hbs')
    app.engine('html', hbs.__express);
	
	bootstrapPartialViews(hbs, function(err){
		callback(err, app);
	})
};

var initializeMiddleware = function (app, callback) {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret: app.set('sessionKey') }));
	app.use(express.static(path + '/public'));
	app.use(authenticationRequestWrapper); // Before route to force authentication before controllers act
	app.use(app.router);
	
	callback(null, app);
};

var bootstrapRoutes = function(app, callback){
	nodeDi.resolve("routeBootstrapper", function(err, bootstrapper){
		if(err){
			callback(err)
			return;
		}
		bootstrapper.boot(app, nodeDi.resolve, function(err){
			callback(err, app)
		});
	})
}

var bootstrapApiDependency = function(app, callback){
	nodeDi.resolve("apiRequestBootstrapper", function(err, bootstrapper){
		if(err){
			callback(err)
			return;
		}
		bootstrapper.boot(app, function(err){
			callback(err, app)
		});
	})
}

var bootstrapPartialViews = function(renderer, callback){
	nodeDi.resolve("partialViewBoostrapper", function(err, bootstrapper){
		if(err){
			callback(err)
			return;
		}
		bootstrapper.boot(renderer, path + '\\views', function(err){
			callback(err)
		});
	})
}

var startListening = function(app, callback){
    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log("Express server %s in %s listening on port %d", express.version, app.settings.env, port);
	callback();
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