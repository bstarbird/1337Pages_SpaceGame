script src: '/script/facilities/facilities.js'

h2 -> 'Overview'
div @error if @error
ul ->
	for i in @objects
		li 'data-objectId': i._id, -> 
			text i.name 
			ul ->
				for x in i.facilities
					li x.name
				button class: 'buildFacility', -> 'Build Facility'

coffeescript ->
	new FacilityController().init()