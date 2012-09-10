var session = require("../models/session")

module.exports = {

	init: function(app, template) {
	},
	
	index: function(req, res, next) {
		session.logout(req);
		res.redirect('/')
	}
};