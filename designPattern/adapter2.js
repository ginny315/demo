//现在假设对项目进行重构，引入一个新的结构，使用命名空间，并把makeRequest()
//方法划分为两个独立的方法来发出HTTP GET和POST请求
var myproject = {
    data:{
        ajax:(function(){
            function createRequestObj(callback){
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
            return xhr;
        }     
        return {
            get:function(url,callback){
                var requestObj = createRequestObj(callback);
                requestObj.open('GET',url);
                requestObj.send();
            },
            post:function(url,data,callback){
                var requestObj = createRequestObj(callback);
                requestObj.open('POST',url);
                requestObj.send(data);
            }
        }
        }())
    }
}
//调用
myProject.data.ajax.get('/user/123456',function(response){
    alert('Refactored HTTP GET response received. User data:'+response);
});

myproject.data.ajax.post('/user/123456','name=ginny',function(response){
    alert('Refactored HTTP POST response received. New user data:'+response);
});

//为了避免在代码库中的其余部分充血每一个http.makeRequest()方法的调用
//可以创建一个适配器来映射旧接口至该新方法
//适配器需要使用与所要替换掉的原方法输入相同的输入参数，并在适配器内部调用新方法
function httpToAjaxAdapter(type,url,callback,data){
    if(type.toLowerCase() === 'get'){
        myproject.data.ajax.get(url,callback);
    }else if(type.toLowerCase() === 'post'){
        myproject.data.ajax.post(url,data,callback);
    }
}

http.makeRequest = httpToAjaxAdapter;

http.makeRequest('get','/user/123456',function(response){
    alert('Adapter HTTP GET response received. User data:'+response);
});

http.makeRequest('post','/user/123456',function(response){
    alert('Adapter HTTP POST response received. New user data:'+response);
},'name=ginny');