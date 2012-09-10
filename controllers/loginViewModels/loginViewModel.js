module.exports.build = function(email, err, callback){

	var viewModel = {
		email : email,
		loginHeader : "Log in",
		emailFieldName : "Email",
		passwordFieldName : "Password",
		createLink : 'Create one',
		createText : 'Don\'t have an account? '
	};
	
	if(err)
		viewModel.error = err

	callback(null, viewModel);
}