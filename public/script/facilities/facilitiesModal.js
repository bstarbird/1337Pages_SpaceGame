var facilityModal = function(objectId){
	var dialog;
	
	var displayModal = function(){
		$.modal("Loading...", {
				onOpen : onOpenModal
			});
		
		$.get("/facility", {objectId : objectId}, function(html){
			animateOpen(html)
		});
	}
	
	var onOpenModal = function(instance){
		dialog = instance
		dialog.overlay.fadeIn(100, function () {
			dialog.container.fadeIn(500);
			dialog.data.fadeIn(100);
		});
		$(".completeBuildFacility").click(function(e){
			e.preventDefault()
			var objectId = $("#ObjectId").val();
			var facilityTypeId = $('input[name=facilityId]:checked').val();
			requestFacilityBuild(objectId, facilityTypeId);
		})
	}
	
	var animateOpen = function(content){
		$.modal.close()
		$.modal(content, {
				onOpen : onOpenModal
			});
	}
	
	var requestFacilityBuild = function(objectId, facilityTypeId){
		$.post("/facility", {
				objectId:objectId,
				facilityTypeId: facilityTypeId
			}, facilityBuildResponse, "json")
	}
	
	var facilityBuildResponse = function(data, textStatus, jqXHR){
		alert(data);
	}
	
	return {
		displayModal : displayModal
	}
}