module.exports.getFacilityTypes = function(callback){
	//Types don't change very often, so we can maintain a cached reference to the facilities
	if(Remote.facility.facilities){
		callback(null, Remote.facility.facilities);
		return;
	}
	
	Remote.facility.list({}, function(err, data){
		if(err){
			callback(err);
		}
		
		//Populate the cache
		Remote.facility.facilities = reIndexFacilitiesBasedOnType(data.facilities)
		callback(null, Remote.facility.facilities);
	})
}

var reIndexFacilitiesBasedOnType = function (facilities){
	return facilities.reduce(function(prev, current){
		prev[current.type] = current;
		return prev;
	}, []);
}

module.exports.build = function(token, objectId, facilityTypeId, callback){
	Remote.facility.build({token: token, facilityTypeId: facilityTypeId, objectId: objectId}, function(err, data){
		if(err){
			callback(err);
			return;
		}
		
		callback(null, data);
	})
}

module.exports.availableFacilitiesForObject = function (objectId, callback){
	Remote.facility.list({objectId : objectId}, function(err, data){
		if(err){
			callback(err);
			return;
		}
		
		callback(null, data.facilities);
	});
}