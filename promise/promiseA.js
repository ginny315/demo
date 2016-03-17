/**
 * promiseA 
 */
var Promise = function () {
	EventEmitter.call(this);
}

util.inherits(Promise,EventEmitter);

Promise.prototype.then = function(fulfilledHandler,errorHandler,progressHandler) {
	if(typeof fulfilledHandler === 'function')
		this.once('success',fulfilledHandler);
	if(typeof errorHandler === 'function')
		this.once('error',errorHandler);
	if(typeof progressHandler === 'function')
		this.once('progress',progressHandler);
	return this;
}

var Deffered = function() {
	this.state = 'unfulfilled';
	this.promise = new Promise();
}

Deffered.prototype.resolve = function(obj) {
	this.state = 'fulfilled';
	this.promise.emit('success',obj);
}

Deffered.prototype.reject = function(err) {
	this.state = 'failed';
	this.promise.emit('error',err);
}

Deffered.prototype.progress = function(data) {
	this.state = 'progress';
	this.promise.emit('progress',data)
}

/**
 * 对响应对象进行封装
 */
res.setEncoding('uft-8');
res.on('data',function(chunk) {
	console.log('BODY:'+chunk);
});
res.on('end',function() {
	//Done
});
res.on('err',function() {
	//error
});
//转换为
res.then(function(){
	//Done
},function(err){
	//Error
},function(chunk){
	console.log('BODY:'+chunk);
});

var promisify = function(res) {
	var deferred = new Deffered();
	var result = '';
	res.on('data',function(chunk) {
		result += chunk;
		deferred.progress(chunk);
	})
	res.on('end',function(){
		deferred.resolve(result);
	})
	res.on('error',function(err){
		deferred.reject(err);
	});
	return deferred.promise;
}

promisify(res).then(function(){
	//Done
},function(err){
	//Error
},function(chunk){
	console.log('BODY:'+chunk);
};)
