var http = {
    makeRequest:function(type,url,callback,data){
        var xhr = new XMLHttpRequest(),
            STATE_LOADED = 4,
            STATUS_OK = 200;
        xhr.onreadystatechange = function(){
            if(xhr.readyState !== STATE_LOADED){
                return;
            }
            if(xhr.status === STATUS_OK){
                callback(xhr.responseText);
            }
        };
        xhr.open(type.toUpperCase(),url);
        xhr.send(data);
    }
};

//调用
http.makeRequest('get','/user/123456',function(response){
    alert('HTTP GET response received. User data:'+response);
});
http.makeRequest('post','/user/123456',function(response){
    alert('HTTP POST response received. New user data:'+response);
},'name=ginny');



