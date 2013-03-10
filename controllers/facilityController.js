module.exports = function(facilities, buildFacilitiesViewModelBuilder){
	return {
		init: function(app, template) {
		},
		
		index: function(req, res, next) {
			var objectId = req.query.objectId;
			
			buildFacilitiesViewModelBuilder.build(objectId, function(err, viewModel){
				if(err){
					res.status(500);
					res.render('500');
					return
				}
				viewModel.layout = null;
				res.render('facilities', viewModel);
			})
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
	}
};