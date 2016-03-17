var Deffered = function() {
	this.promise = new Promise();
}

Deffered.prototype.resolve = function(obj) {
	var promise = this.promise;
	var handler;
	while(handler = promise.queue.shift()) {
		if(handler && handler.fulfilled) {
			var ret = handler.fulfilled(obj);
			if(ret && ret.isPromise){
				ret.queue = promise.queue;
				this.promise = ret;
				return;
			}
		}
	}
}

Deffered.prototype.reject = function(err) {
	var promise = this.promise;
	var handler;
	while(handler = promise.queue.shift()){
		if(handler && handler.error){
			var ret = handler.error(err);
			if(ret && ret.isPromise){
				ret.queue = promise.queue;
				this.promise = ret;
				return;
			}
		}
	}
}

Deffered.prototype.callback = function() {
	var that = this;
	return function(err,file) {
		if(err)
			return that.reject(err);
		that.resolve(file);
	}
}

var Promise = function() {
	this.queue = [];
	this.isPromise = true;
}

Promise.prototype.then = function(fulfilledHandler,errorHandler,progressHandler) {
	var handler = {};
	if(typeof fulfilledHandler === 'function')
		handler.fulfilled = fulfilledHandler;
	if(typeof errorHandler === 'function')
		handler.error = errorHandler;
	this.queue.push(handler);
	return this;
}

var readFile1 = function(file,encoding) {
	var deffered = new Deffered();
	fs.readFile(file,encoding,deffered.callback());
	return deffered.promise;
}

var readFile2 = function(file,encoding) {
	var deffered = new Deffered();
	fs.readFile(file,encoding,deffered.callback());
	return deffered.promise;
}