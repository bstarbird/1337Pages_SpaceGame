var facilities = require("./facilities")

module.exports.getAllPlayerBodies = function(token, callback){

	Remote.object.list({token: token}, function(err, data){
		if(err){
			callback("Error loading objects")
			return;
		}

		//The API doesn't return the name of the facility, only its type id, so we'll add the name here
		facilities.getFacilityTypes(function(err, facilityTypes){
			data.objects.forEach(function(obj){
				obj.facilities.forEach(function(facility){
					facility.name = facilityTypes[facility.type].name
				})
			})
		
			callback(null, data.objects);
		});
	});
}