h1 -> @loginHeader
div @error if @error?
form action: '/login', method: 'post', ->
	div ->
		label for: 'Email', @emailFieldName
		input id:'Email', name:'email', value:@email || ''
	div ->
		label for: 'Password', @passwordFieldName
		input type: 'password', id:'Password', name:'password'
	div ->
		button @loginHeader
p -> 
	text @createText
	a href: '/account', -> @createLink
