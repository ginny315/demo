var myData = {};

/**
 * 这是ajax模块，通过添加的方式将其加入到myData命名空间
 * 命名空间是作为参数传入的，一旦该命名空间被加入了新的方法，最后就返回此命名空间，
 * 使用此新的、添加了新内容的命名空间重写原来的命名空间
 */
myData = (function(myNamespace,undefined){
    myNamespace.ajax = {
        get:function(url,callback){
            var xhr = new XMLHttpRequest(),
                STATE_LOADED = 4,
                STATUS_OK = 200;

            xhr.onreadystatechange = function(){
                if(xhr.readyState !== STATE_LOADED)
                    return;
                if(xhr.status === STATUS_OK)
                    callback(xhr.responseText);
            };
            xhr.open('GET',url);
            xhr.send();
        }
    };
    return myNamespace;
}(myData || {}));

myData = (function(myNamespace,undefined){
    myNamespace.cookies = {
        get:function(name){
            var output = '',
                escapedName = escape(name),
                start = document.cookie.indexOf(escapedName+'='),
                end = document.cookie.indexOf(';',start);

            end = end === -1 ? (document.cookie.length - 1) : end;

            if(start >= 0)
                output = document.cookie.substring(start + escapedName.length + 1, end);

            return unescape(output);
        },
        set:function(name,value){
            document.cookie = escape(name) + '=' + escape(value);
        }
    };
    return myNamespace;
}(myData || {}));