var facilityModal = function(objectId){
	var dialog;
	var opened;
	
	var displayModal = function(){
		$.modal("Loading...", {
				onOpen : onOpenModal,
				onClose : onCloseModal
			});
	}
	
	var onOpenModal = function(instance){
		dialog = instance
		dialog.overlay.fadeIn(100, function () {
			dialog.container.fadeIn(100, function(){
				dialog.data.fadeIn(100, function(){
					$.get("/facility", {objectId : objectId}, function(html){
						animateOpen(html)
					});
				});
			});
		});
	}
	
	var onCloseModal = function(){
		dialog.data.fadeOut(100, function(){
			dialog.container.fadeOut(100, function(){
				dialog.overlay.fadeOut(100, function(){
					$.modal.close()
				});
			});
		});
	}
	
	var animateOpen = function(content, error){
		var startWidth = dialog.container.width()
		var startHeight = dialog.container.height()
		
		var targetHeight = 400
		var targetWidth = 500
				
		var leftMovement = (targetWidth - startWidth) / 2
		var targetLeft = dialog.container.css("left").replace(/px/, "") - leftMovement
		
		var topMovement = (targetHeight - startHeight) / 2
		var targetTop = dialog.container.css("top").replace(/px/, "") - topMovement
	
		dialog.container.animate({width: targetWidth, height: targetHeight, left : targetLeft, top : targetTop }, function(){
			dialog.data.html(content)
			if(error){
				dialog.data.find("#Error").text(error)
			}
			
			$("#CompleteBuildFacility").click(function(e){
				e.preventDefault()
				var objectId = $("#ObjectId").val();
				var facilityTypeId = $('input[name=facilityId]:checked').val();
				requestFacilityBuild(objectId, facilityTypeId);
			})
		})
	}
	
	var requestFacilityBuild = function(objectId, facilityTypeId){
		cachedDialog = dialog.data.html();
		dialog.data.html("Loading...")
	
		$.post("/facility", {
				objectId:objectId,
				facilityTypeId: facilityTypeId
			}, facilityBuildResponse, "json")
	}
	
	var facilityBuildResponse = function(data, textStatus, jqXHR){
		if(!data.success){
			animateOpen(cachedDialog, data.error);
		}
		else{
			$.modal.close()
			location.href = location.href;
		}
	}
	
	return {
		displayModal : displayModal
	}
}