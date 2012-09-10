var session = require("../models/session")

var logInViewModelBuilder = require("./loginViewModels/loginViewModel");

module.exports = {
	
	index: function(req, res, next) {
		renderLoginPage(req, res);
	},
	
	create: function(req, res, next){
		session.login(req, req.body.email, req.body.password, function(err){
			if(err){
				renderLoginPage(req, res, err);
				return;
			}
			
			res.redirect("/");
		});
	},
	
	loadForm: function(req, res, next){
		logInViewModelBuilder.build("", "", function(err, viewModel){
			res.partial("login", viewModel)
		})
	}
};


function renderLoginPage(req, res, err){
	logInViewModelBuilder.build(req.body.email, err, function(err, viewModel){
		res.render("login", viewModel)
	})
}