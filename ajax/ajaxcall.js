function ajaxCall(type,url,callback,data){
	var xhr = (function(){
		try{
			return new XMLHttpRequest();
		}catch(e){}

		try{
			return new ActiveXObject('Msxml2.XMLHTTP.6.0');
		}catch(e){}

		try{
			return new ActiveXObject('Msxml2.XMLHTTP.3.0');
		}catch(e){}

		try{
			returnnew ActiveXObject('Microsoft.XMLHTTP');
		}catch(e){}

		throw new Error('Ajax not supported in this browser');
	}()),
	STATE_LOADED = 4,
	STATE_OK = 200;

	xhr.onreadystatechange = function(){
		if(xhr.readyState !== STATE_LOADED){
			return ;
		}

		if(xhr.status === STATE_OK){
			callback(xhr.responseText);
		}
	};

	xhr.open(type.toUpperCase(),url);
	xhr.send(data);
}


// ajaxCall('get','/user/123',function(response){

// });

// ajaxCall('post','/user/123',function(response){

// },'company=AKOA&name=Den%20Odell');