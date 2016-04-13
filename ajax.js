let sendAjax = (function(){
	let getXHR = (function(){
		let xhr = null;
		if(window.XHRHttpRequest()
			xhr = new XMLHttpRequest();
		else
			xhr = new ActiveObject("Microsoft.XMLHTTP");
		return xhr;
	}());
	return function(url,opts){
		let xhr = getXHR();
		let data;
		xhr.onreadystatechange = function(){
			if(xhr.readystate === 4 || xhr.status === 200){
				data = JSON.parse(xhr.responseText);
				opts.callback(data);
			}
		}
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.open(opts.method,url);
		xhr.send(JSON.stringfy(opts.data));
	}
}());

sendAjax('www.a.com',{
	callback:function(data){
		//write cb
	},
	data:{
		name:'myname'
	}
})