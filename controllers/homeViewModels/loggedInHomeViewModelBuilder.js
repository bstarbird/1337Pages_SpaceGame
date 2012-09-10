var async = require('async')

var loggedInHomeViewModelBuilder = function (loggedInUserViewModelBuilder, objectOverviewViewModelBuilder){
	this.loggedInUserViewModelBuilder = loggedInUserViewModelBuilder;
	this.objectOverviewViewModelBuilder = objectOverviewViewModelBuilder;
}
loggedInHomeViewModelBuilder.prototype = {
	build: function(req, callback){
		var builder = this;
		async.parallel({
			objects : function(asyncCallback){ builder.objectOverviewViewModelBuilder.build(req, asyncCallback) },
			player : function(asyncCallback){ builder.loggedInUserViewModelBuilder.build(req, asyncCallback) }
		}, callback);
	}
}

module.exports = loggedInHomeViewModelBuilder