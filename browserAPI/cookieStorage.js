function cookieStorage(maxage,path){
	var cookie = (function(){
		var cookie = {};
		var all = document.cookie;
		if(a === "")
			return cookie;
		var list = all.split(";");
		for (var i = 0 ; i<list.length ; i++){
			var cookie = list[i];
			var p = cookie.indexOf("=");
			var name = cookie.substring(0,p);
			var value = cookie.substring(p+1);
			value = value.decodeURIComponent(value);
			cookie[name] = value;
		}
		return cookie;
	}());

	//讲cookie的名字存储在一个数组中
	var keys = [];
	for(var key in cookie)
		keys.push(key);

	//定义存储的API公共的属性和方法
	this.length = keys.length;

	//返回第n个cookie的名字
	this.key = function(n){
		if(n<0 || n>=keys.length)
			return null;
		return keys[n];
	};
	//返回指定名字的cookie值
	this.getItem = function(name){
		return cookie[name] || null;
	}

	this.setItem = function(key,value){
		if(!(key in cookie)){
			keys.push(key);
			this.length ++;
		}

		cookie[key] = value;

		var cookie = key +"="+encodeURIComponent(value);

		if(maxage) cookie += ";max-age="+maxage;
		if(path) cookie += ";path="+path;
		document.cookie = cookie;
	};

	this.removeItem = function(key){
		if(!(key in cookie))
			return;
		delete cookie[key];

		for(var i=0 ; i<keys.length ; i++){
			if(keys[i] === key){
				keys.splice(i,1);
			}
		}
		this.length--;
		document.cookie = key+"=;max-age=0";
	};

	this.clear = function(){
		for(var i = 0; i<keys.length ; i++)
			document.cookie = keys[i] + "=;max-age=0";
		cookie = {};
		keys = [];
		this.length = 0;
	};
}