module.exports = function(session, account){

	var displayCreateAccountForm = function(req, res) {
		if(req.isLoggedIn)
			displayAccountUpdateForm(req, res);
		else
			res.render('account');
	}

	var displayAccountUpdateForm = function(req, res) {
		require("./accountViewModels/updateAccountFormViewModelBuilder").build(req, function(err, viewModel){
			if(err){
				res.render('500');
				return;
			}
			res.render('account/show', viewModel);
		});
	};

	var createAccount = function(req, res){
		account.createAccount(req.body.name, req.body.email, req.body.password, function(err){
			if(err)
			{
				res.render('account', {
					error: err, 
					name: req.body.name, 
					email: req.body.email,
					password: req.body.password});
				return;
			}

			session.login(req, req.body.email, req.body.password, function(err){
				if(err){
					res.render('account', {error: 'Unable to log in'});
					return;
				}
				
				res.redirect('/');
			});
		});
	};

	var updateAccount = function(req, res){
		if(!req.isLoggedIn) {
			displayCreateAccountForm(req, res);
		}
		else {
			account.update(req.session.token, req.body.name, req.body.email, req.body.currentPassword, req.body.password, function(err){
				if(err){
					displayAccountUpdateForm(req, res)
				}
				else{
					res.redirect('/account');
				}
			});
		}
	}
	
	return {
		index: displayCreateAccountForm,
		
		show: displayAccountUpdateForm,
		
		update: updateAccount,
		  
		create: createAccount
	}
};