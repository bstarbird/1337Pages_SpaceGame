var session = require('./models/session');

module.exports = function (req, res, next){
	session.renew(req, function(err){
		if(err)
			res.redirect('/');
		else
			next();
	});
};