var celestialBodies = require("../../models/celestialBodies")

module.exports.build = function(req, callback){

	celestialBodies.getAllPlayerBodies(req.session.token, function(err, data){
		if(err){
			callback("Error loading objects")
			return;
		}
		
		callback(null, data);
	});
}