var element = {
    allElements:[],
    //通过元素的id获取对该元素的引用并保存它
    get:function(id){
        var elem = document.getElementById(id);
        this.allElements.push(elem);
        return elem;
    },
    //根据给定的类型创建一个新元素，并保存它
    create:function(type){
        var elem = document.createElement(type);
        this.allElements.push(elem);
        return elem;
    },
    //返回所有保存的元素
    getAllElements:function(){
        return this.allElements;
    }
},
//使用
header = element.get('header'),
input = element.create('input'),
allElements = element.getAllElements(); 