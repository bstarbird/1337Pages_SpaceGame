var async = require('async');
var loggedInUserViewModelBuilder = require('../sharedViewModels/loggedInUserViewModelBuilder');
var accountInformationViewModelBuilder = require('./accountInformationViewModelBuilder');

module.exports.build = function(req, callback){
    async.parallel({
		accountData : function(asyncCallback){ accountInformationViewModelBuilder.build(req, asyncCallback) },
		player : function(asyncCallback){ loggedInUserViewModelBuilder.build(req, asyncCallback) }
	}, callback);
};