var loggingMixin = {
    logs:[],
    log:function(message){
        this.logs.push(message);
    },
    readLog:function(){
        return this.logs.join('\n');
    }
},
element,
header,
textField,
emailField;

function extendObj(obj1,obj2){
    var obj2Key;
    for(obj2Key in obj2){
        if(obj2.hasOwnProperty(obj2Key)){
            obj1[obj2Key] = obj1[obj2Key];
        }
    }
    return obj1;
}

element = {
    allElements:[],
    create:function(type){
        var elem = document.createElement(type);
        this.allElements.push(elem);

        if(typeof this.log === 'function'){
            this.log('Created an element of type'+type);
        }
        return elem;
    },
    getAllElements:function(){
        return this.allElements;
    }
};

//定义一个简单“类”，我们将应用该mixin于其上
function Field(type,displayText){
    this.type = type || '';
    this.displayText = displayText || '';
    //确保该mixin的log()方法存在才调用
    if(typeof this.log === 'function'){
        this.log('Created an instance of Field');
    }
}

Field.prototype = {
    getElement: function(){
        var field = document.createElement('input');
        field.setAttribute('type',this.type);
        field.setAttribute('placeholder',this.displayText);
        if(typeof this.log === 'function'){
            this.log('Created a DOM element with placeholder text:'+this.displayText);
        } 
        return field;
    }
};

//直接应用该mixin至element对象，实质是从该mixin复制各方法和属性至该单例
element = extendObj(element,loggingMixin);

//应用该mixin至Field"类"的prototype，使得该mixin的方法为每一个从该“类”实例化出来的对象所拥有
Field.prototype = extendObj(Field.prototype,loggingMixin);

//使用element.create()方法来创建一个新的DOM元素
header = element.create('header');

//创建两个对象实例，两者都从prototype中获得了getElement方法
textField = new Field('text','enter your address');
emailField = new Field('email','enter your email');

//将这些对象中所保存的元素添加至当前页面
document.body.appendChild(textField.getElement());
document.body.appendChild(emailField.getElement());

//输出通过该mixin所保存的日志记录
alert(loggingMixin.readLog());