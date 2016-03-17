defer.prototype.makeNodeResolver = function() {
	var self = this;
	return function(error,value) {
		if(error)
			self.reject(error);
		else if(arguments.length > 2) 
			self.resolve(array_slice(arguments,1));
		else
			self.resolve(value);
	}
}

var readFile = function(file,encoding) {
	var deffered = Q.defer();
	fs.readFile(file,encoding,deffered.makeNodeResolver());
	return deffered.promise;
}

readFile('foo.txt','utf-8').then(function(data) {
	//Success case
},function(err){
	//Fail case
})