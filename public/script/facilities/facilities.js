var facilityController = function(){
	$(".buildFacility").click(function(e){
		e.preventDefault();
	
		var target = $(this)
		var objectId = target.closest("li").attr("data-objectId")
		
		var modal = facilityModal(objectId);
		modal.displayModal();
	});
}