//定义工厂类
var FormFieldFactory = {
    makeField:function(options){
        var options = options || {},
        type = options.type || 'text',
        displayText = options.displayText || '',
        field;

        switch(type){
            case 'text':
                field = new TextField(displayText);
                break;
            case 'email':
                field = new EmailField(displayText);
                break;
            case 'button':
                field = new ButtonField(displayText);
                break;
            default:
                field = new TextField(displayText);
        }
        return field;
    }
};

function TextField(displayText){
    this.displayText = displayText;
}

TextField.prototype.getElement = function(){
    var textField = document.createElement('input');
    textField.setAttribute('type','text');
    textField.setAttribute('placeholder',this.displayText);
    return textField;
}

function EmailField(displayText){
    this.displayText = displayText;
}

EmailField.prototype.getElement = function(){
    var emailField = document.createElement('input');
    emailField.setAttribute('type','email');
    emailField.setAttribute('placeholder',this.displayText);
    return emailField;
}

function ButtonField(displayText){
    this.displayText = displayText;
}

Button.prototype.getElement = function(){
    var button = document.createElement('button');
    button.setAttribute('type','submit');
    button.innnerHTML = this.displayText;
    return button;
}

//工厂类使用
var textField = FormFieldFactory.makeField({
        type:'text',
        displayText:'Enter your address'
    }),
    emailField = FormFieldFactory.makeField({
        type:'email',
        displayText:'Enter your email address'
    }),
    buttonField = FormFieldFactory.makeField({
        type:'button',
        displayText:'Submit'
    });

window.addEventListener('load',function(){
    var bodyElement = document.body;
    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
    bodyElement.appendChild(buttonField.getElement());
},false);