var anonymousUserViewModelBuilder = require('../sharedViewModels/anonymousUserViewModelBuilder')

module.exports.build = function(req, callback){
	return {
		player: anonymousUserViewModelBuilder.build(req, callback)
	}
}