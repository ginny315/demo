var elements = {
    get:function(tag){
        var elems = document.getElementsByTagName(tag),
            elemsIndex = 0,
            elemsLength = elems.length,
            output = [];

        for( ; elemsIndex < elemsLength ; elemsIndex++){
            output.push(elems[elemsIndex]);
        }
        return output.length === 1 ? output[0] : output;
    },
    //定义一个组合方法，用于为一个或多个元素添加class标签特性
    //无论在执行时有多少个元素被传入都可实现
    addClass:function(elems,newClassName){
        var elems = document.getElementsByTagName(tag),
            elemsIndex = 0,
            elemsLength = elems.length,
            elem;

        if(Object.prototype.toString.call(elems) === '[object Array]'){
            for( ; elemsIndex < elemsLength ; elemsIndex++){
                elem = elems[elemIndex];
                elem.className += (elem.className === '' ? '' : ' ')+newClassName;
            }
        }else{
            elems.className += (elems.className === '' ? '' : ' ')+newClassName;
        }
    }
};

var body = elements.get('body'),
    links = elements.get('a');

elements.addClass(body,'has-js');
elements.addClass(links,'custom-link');