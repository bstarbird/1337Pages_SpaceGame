module.exports = function(app, express) {
	app.configure('development', function() {
	  require("./development.js")(app,express);
	});

	app.configure('test', function() {
		require("./test.js")(app,express);
	});
	
	app.configure('production', function() {
		require("./production.js")(app,express);
	});		
}