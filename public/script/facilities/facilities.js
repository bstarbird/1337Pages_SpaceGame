var FacilityController = function(){
	var facilityBuildResponse = function(data, textStatus, jqXHR){
	}

	this.attachBuildHandler = function(){
		$(".buildFacility").click(function(){
			var target = $(this)
			var objectId = target.closest("li").attr("data-objectId")
			$.post("/facility", {
					objectId:objectId,
					facilityTypeId: 2
				}, facilityBuildResponse, "json")
		});
	}
}

FacilityController.prototype.init = function(){
	this.attachBuildHandler();
}