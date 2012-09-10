h2 -> 'Create Account'
div @error if @error?
form action: '/account', method: 'post', ->
	div ->
		label for: 'Name', 'Name:'
		input id:'Name', name:'name', value:@name || ''
	div ->
		label for: 'Email', 'Email:'
		input id:'Email', name:'email', value:@email || ''
	div ->
		label for: 'Password', 'Password:'
		input type: 'password', id:'Password', name:'password'
	div ->
		button 'Create account'