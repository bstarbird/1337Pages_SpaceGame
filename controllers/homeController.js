var homeController = function(loggedInHomeViewModelBuilder){
	
	this.renderLoggedInView = function(req, res){
		loggedInHomeViewModelBuilder.build(req, function(err, viewmodel){
			if(err){
				res.render('home/loggedIn', {error : err});
				return;
			}

			res.render('home/loggedIn', viewmodel);
		})
	}
}

homeController.prototype = {
	index : function(req, res, next) {
		if(req.isLoggedIn)
			this.renderLoggedInView(req, res);
		else
			res.render('home/anonymous')
	}
}

module.exports = homeController;