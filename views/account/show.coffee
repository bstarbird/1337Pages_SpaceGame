h2 -> 'Update Account'
div @error if @error?
form action: '/account', method: 'post', ->
	input type: 'hidden', name: '_method', value: 'put'
	div ->
		label for: 'Name', 'Name:'
		input id:'Name', name:'name', value:@accountData.name || ''
	div ->
		label for: 'Email', 'Email:'
		input id:'Email', name:'email', value:@accountData.email || ''
	div ->
		label for: 'CurrentPassword', 'Current password:'
		input type: 'password', id:'CurrentPassword', name:'currentPassword'
	div ->
		label for: 'Password', 'New password:'
		input type: 'password', id:'Password', name:'password'
	div ->
		button 'Update account'