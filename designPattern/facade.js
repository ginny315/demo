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
            return new ActiveXObject('Microsoft.XMLHTTP');
        }catch(e){}

        throw new Error('Ajax not support in this browser.');
    }()),
    STATE_LOADED = 4,
    STATUS_OK = 200;

    xhr.onreadystatechange = function(){
        if(xhr.readyState !== STATE_LOADED)
            return;

        if(xhr.status === STATUS_OK)
            callback(xhr.responseText)
    };
    xhr.open(type.toUpperCase(),url);
    xhr.send(data);
}

//调用
ajaxCall('get','/user/123456',function(response){
    alert('HTTP GET response received. User data:'+response);
});

ajaxCall('post','/user/123456',function(response){
    alert('HTTP POST response received. New user data:'+response);
},'name=ginny');