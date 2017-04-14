var proxiedGet = myData.cookies.get;
myData.cookies.get = function() {
    var value = proxiedGet.apply(this,arguments);
    value = value.toUpperCase();
    return value;
};