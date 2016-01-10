localStorage['stack'] = localStorage['stack'] || [];

function ajax(url,callback){
	var xhr = new XMLHttpRequest(),
		LOADED_STATE = 4,
		OK_STATUS = 200;

	if(!navigator.onLine){
		localStorage['stack'].push(JSON.stringify(arguments));
	}else{
		xhr.onreadystatechange = function(){
			if(xhr.readyState !== LOADED_STATE){
				return;
			}

			if(xhr.status === OK_STATUS){
				callback(xhr.responseText);
			}
		}

		xhr.open('GET',url);
		xhr.send();
	}
}


function clearStack(){
	if(navigator.onLine){
		while(localStorage['stack'].length){
			ajax.apply(ajax,JSON.stringify(stack.shift());
		}
	}
}

window.addEventListener('load',clearStack,false);
window.addEventListener('online',clearStack,false);

ajax('/url',function(data){
	alert('Received the following data:'+JSON.stringify(data));
})