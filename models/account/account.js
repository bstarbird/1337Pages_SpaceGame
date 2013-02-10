module.exports.createAccount = function(name, email, password, callback){
	Remote.player.create({name: name, email: email, password: password}, callback);
};

module.exports.getAccount = function(token, callback){
	Remote.player.get({token: token}, function(err, data){
		if(err)
		{
			callback(err)
		}
		else
		{
			callback(null, data.data);
		}
	});
};

module.exports.update = function(token, name, email, currentPassword, password, callback){
	Remote.player.update({
		token: token, 
		name: name, 
		email: email, 
		oldPassword: currentPassword, 
		newPassword: password 
		}, callback);
};