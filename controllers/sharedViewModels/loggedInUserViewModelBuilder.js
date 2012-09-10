module.exports.build = function(req, callback){
	callback(null, {
		isLoggedIn: req.isLoggedIn
	});
}