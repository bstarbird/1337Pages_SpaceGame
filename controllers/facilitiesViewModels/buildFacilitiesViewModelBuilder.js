module.exports = function(facilities){
	return {
		build : function(objectId, callback){
			var viewModel = {}
			facilities.availableFacilitiesForObject(objectId, function(err, facilities){
				if(err){
					callback(err)
					return;
				}
				
				viewModel.availableFacilities = facilities
				viewModel.objectId = objectId
				
				callback(null, viewModel)
			})
		}
	}
}