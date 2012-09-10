var facilities = require("../models/facilities");

module.exports = {

	init: function(app, template) {
	},
	
	index: function(req, res, next) {
		res.send({})
	},
	
	create: function(req, res, next) {
		facilities.build(req.session.token, req.body.objectId, req.body.facilityTypeId, function(err){
			if(err){
				res.send({success: false, error: err});
			}
			else{
				res.send({success: true});
			}
		});
	}
};