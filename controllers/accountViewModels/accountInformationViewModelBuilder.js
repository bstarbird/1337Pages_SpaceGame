var account = require('../../models/account/account');

module.exports.build = function(req, callback){
    account.getAccount(req.session.token, callback)
};
