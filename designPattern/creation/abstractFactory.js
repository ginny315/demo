//定义一个基础工厂类，用于创建表单域，其他更明确的表单域创建工厂类将继承于此类
function FormFieldFactory(){
    this.availableTypes = {
        TEXT:'text',
        EMAIL:'email',
        BUTTON:'button'
    };
}
FormFieldFactory.prototype = {
    //此方法被子类利用多态性进行重写，因此该方法不应该在此父类中
    makeField:function(){
        throw new Error('This method should not be called directly');
    }
};

function Html5FormFieldFactory(){}
Html5FormFieldFactory.prototype = new FormFieldFactory();
Html5FormFieldFactory.prototype.makeField = function(options){
    var options = options || {},
    type = options.type || this.availableTypes.TEXT,
    displayText = options.displayText || '',
    field;

    switch(type){
            case this.availableTypes.TEXT:
                field = new Html5TextField(displayText);
                break;
            case this.availableTypes.EMAIL:
                field = new Html5EmailField(displayText);
                break;
            case this.availableTypes.BUTTON:
                field = new ButtonField(displayText);
                break;
            default:
                throw new Error('Invaild field type specific:'+type);
        }
        return field;
};

function Html4FormFieldFactory(){}
Html4FormFieldFactory.prototype = new FormFieldFactory();

Html4FormFieldFactory.prototype.makeField = function(options){
    var options = options || {},
    type = options.type || this.availableTypes.TEXT,
    displayText = options.displayText || '',
    field;

    switch(type){
            case this.availableTypes.TEXT:
            case this.availableTypes.EMAIL:
                field = new Html4TextField(displayText);
                break;
            case this.availableTypes.BUTTON:
                field = new ButtonField(displayText);
                break;
            default:
                throw new Error('Invaild field type specific:'+type);
        }
        return field;
}

function Html5TextFieldFactory(displayText){
    this.displayText = displayText || '';
}
Html5TextField.prototype.getElement = function(){
    var textField = document.createElement('input');
    textField.setAttribute('type','text');
    textField.setAttribute('placeholder',this.displayText);
    return textField;
}

function Html4TextField(displayText){
    this.displayText = displayText || '';
}
Html4TextField.prototype.getElement = function(){
    var wrapper = document.createElement('div'),
        textField = document.createElement('input'),
        textFieldId = 'text-field-'+Math.floor(Math.random()*999),
        label = document.createElement('label');
        labelText = document.createTextNode(this.displayText);

        textField.setAttribute('type',text);
        textField.setAttribute('id',textFieldId);

        label.setAttribute('for',textField);
        label.appendChild(labelText);

        wrapper.appendChild(textField);
        wrapper.appendChild(label);

        return wrapper;
}

function Html5EmailField(displayText){
    this.displayText = displayText;
}

Html5EmailField.prototype.getElement = function(){
    var emailField = document.createElement('input');
    emailField.setAttribute('type','email');
    emailField.setAttribute('placeholder',this.displayText);
    return emailField;
}

function ButtonField(displayText){
    this.displayText = displayText;
}
ButtonField.prototype.getElement = function(){
    var button = document.createElement('button');
    button.setAttribute('type','submit');
    button.innerHTML = this.displayText;
    return button;
}
//检查浏览器是否支持html5
var supportsHtml5FormFields = (function(){
    var field = document.createElement('input');
    field.setAttribute('type','email');
    return field.type === 'email';
}()),

formFieldFactory = supportsHtml5FormFields ? new Html5FormFieldFactory() : new Html4FormFieldFactory(),

textField = formFieldFactory.makeField({
    type:'text',
    displayText:'enter your address'
}),

emailField = formFieldFactory.makeField({
    type:'email',
    displayText:'enter your email'
}),

buttonField = formFieldFactory.makeField({
    type:formFieldFactory.availableTypes.BUTTON,
    displayText:'Submit'
});

window.addEventListener('load',function(){
    var bodyElement = document.body;
    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
    bodyElement.appendChild(buttonField.getElement());
},false);


