module.exports.login = function (req, email, password, callback){
	createToken(email, password, function(err, token){
		if(err){
			callback(err);
			return;
		}
		
		updateSession(req, email, token)

		callback(null);
	});
}

module.exports.logout = function (req){
	clearSession(req);
}

module.exports.renew = function(req, callback){
	if(!(req.session && req.session.email)){
		req.isLoggedIn = false;
		callback();
		return;
	}

	if(req.session.tokenExpires < new Date()){
		renewToken(req.session.email, function(err, token){
			if(err)
			{
				req.isLoggedIn = false;
				clearSession(req);
				callback(err);
				return;
			}
			
			req.isLoggedIn = true;
			updateSession(req, req.session.email, token);
			callback(null)
		})
		return;
	}
	
	req.isLoggedIn = true;
	callback(null)
}

var clearSession = function(req) {
	updateSession(req, null, null)
}

var updateSession = function(req, email, token){
	var tokenLifetime = 30 / 2;
	var expiration = new Date();
	expiration.setMinutes(expiration.getMinutes() + tokenLifetime);
	
	req.session.email = email;
	req.session.token = token;
	req.session.tokenExpires = expiration;
}

var createToken = function(email, password, callback){
	Remote.token.create({email: email, password: password}, function(err, response){
		if(err)
			callback(err)
		else
			callback(null, response.token);
	});
}

var renewToken = function(email, callback){
	Remote.token.renew({email: email}, function(err, response){
		if(err)
			callback(err)
		else
			callback(null, response.token);
	});
}