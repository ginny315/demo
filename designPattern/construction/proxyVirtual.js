//定义一个“类”，用于构建一个对象，来表示一个简单表单域
function FormField(type,displayText){
    this.type = type || 'text';
    this.displayText = displayText || '';
    this.element = document.createElement('input');
    this.element.setAttribute('type',this.type);
    this.element.setAttribute('placeholder',this.displayText);
}

FormField.prototype = {
    getElement:function(){
        return this.element;
    },
    isValid:function(){
        return this.element.value !== '';
    }
};

/**
 * 使用实现了相同方法的代理来替换FormField“类”，
 * 它会延迟调用原来的构造函数，直至这些方法被真正调用，节省内存并提升了性能
 * 根据需要，可使用模块模式来使该代理“类”的作用域实现局部化，传入原来的FormField“类”并翻译它所经过的代理的版本
 */
FormField = (function(FormField){
    function FormFieldProxy(type,displayText){
        this.type = type || 'text';
        this.displayText = displayText || '';
    }
    FormFieldProxy.prototype = {
        formField:null,
        innitialize:function(){
            if(!this.formField){
                this.formField = new FormField(this.type,this.displayText);
            }
        },
        getElement:function(){
            this.innitialize();
            return this.formField.getElement();
        },
        isValid:function(){
            this.innitialize();
            return this.formField.isValid();
        }
    };
    return FormFieldProxy();
}(FormField));

/**
 * 创建两个对象实例，它们实际调用的都是代理“类”而不是原来的“类”
 * 这意味着，在此阶段DOM元素不会被创建，节省了内存占用并提升了性能
 */
var textField = new FormField('text','enter your address');
    emailField = new FormField('email','enter your email');

document.addEventListener('load',function(){
    document.body.appendChild(textField.getElement());
    document.body.appendChild(emailField.getElement());
},false);

alert(emailField.isValid())//false

