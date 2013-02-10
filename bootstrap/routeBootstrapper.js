var typeResolver;

module.exports.boot = function(app, resolutionFunction, callback) {
	typeResolver = resolutionFunction;
	app.get("/:controller?", router);	// Index

	app.post("/:controller", router);	// Create
	app.put("/:controller", router);	// Update
	app.del("/:controller", router);	// Delete all

	
	app.get("/:controller/:action?/:id", router);	// Show/edit
	app.put("/:controller/:id", router);			// Update
	app.del("/:controller/:id", router);			// Delete
	
	callback();
}

function router(req, res, next) {
	var controllerName = req.params.controller ? req.params.controller : '';
	var action = req.params.action ? req.params.action : '';
	var id = req.params.id ? req.params.id : ''
	var method = req.method.toLowerCase();
	var fn = 'index';
	
	// Default route
	if(controllerName.length == 0) {
		controllerName = "home"
	}		
	
	switch(method) {
		case 'get':
			if(action.length > 0) {
				fn = action;
			} else if(id.length > 0) {
				fn = 'show';
			}
			break;
		case 'post':
			fn = 'create';
			break;
		case 'put':
			fn = 'update';
			break;
		case 'delete':
			fn = 'destroy';
			break;		
	}
		
	
	getController(controllerName, function(err, controller){
		if(err){
			console.log(err);
			res.render('500');
		}
		try {
			if(controller && typeof controller[fn] === 'function') {
				controller[fn](req,res,next);		
			} else {
				res.render('404');
			}	
		} catch (e) {
			res.render('500');
			throw(e)
		}
	});
};

function getController(controllerName, callback){
	typeResolver(controllerName.toLowerCase() + 'Controller', callback)
}