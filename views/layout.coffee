doctype 5
html ->
	head ->
		meta charset: 'utf-8'
		title (@title or 'Space Game')
		#link rel: 'stylesheet', href: '/css/app.css'
		script src: '/script/external/jquery.js'
		script src: '/script/external/jquery.simplemodal.js'
body ->
	header -> 
		partial('loggedInHeader', @player) if (@player && @player.isLoggedIn)
		partial('anonymousHeader') if !(@player && @player.isLoggedIn)
	@body