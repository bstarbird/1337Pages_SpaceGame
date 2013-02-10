var fs = require('fs'), 
	async = require('async')

module.exports.boot = function(renderingEngine, startPath, callback) {
	console.log("Loading partials from ", startPath)
	loadFolder(renderingEngine, startPath, '', callback)
}

var loadFolder = function(renderingEngine, path, item, callback){
		var fileName = path + "/" + item;

		fs.stat(fileName, function(err, stats){
			if(err){
				console.log(err)
				callback(err)
				return;
			}
			
			if(stats.isDirectory()){
				fs.readdir(fileName, function(err, dirContents){
					if(err){
						callback(err)
						return;
					}
					async.forEach(dirContents, 
						function(contents, iteratorCallback){
							loadFolder(renderingEngine, fileName, contents, iteratorCallback);
						}, 
						function(err){
							callback(err)
						});
				});
			}
			else {
				var partialName = fileName.replace(/.html$/gi, '');
				partialName = partialName.replace(/.*[\/\\]/gi, '');
			
				if(partialName.indexOf('_') != 0){
					callback()
					return;
				}
				
				partialName = partialName.replace(/^\_/, '')
			
				fs.readFile(fileName, "utf-8", function (err, data) {
					if (err){
						callback(err)
						return
					}
					
					renderingEngine.registerPartial(partialName, data);
					console.log("  Loaded partial: ", partialName)
					callback()
				});
		}
		})
	};