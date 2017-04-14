function FormBuilder(){}
FormBuilder.prototype = {
    fields:[],
    addField:function(type,displayText){
        var field;
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
                throw new Error('Invalid field type specified:'+type);
        }
        this.fields.push(field);
    },
    getForm:function(){
        var form = document.createElement('form'),
            index = 0,
            numFields = this.fields.length,
            field;

        for( ; index < numFields ; index++){
            field = this.fields[index];
            form.appendChild(field.getElement());
        }
        return form;
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

//使用生成器模式
var formBuilder = new FormBuilder(),
    form;

formBuilder.addField('text','enter your address');
formBuilder.addField('email','enter your email');
formBuilder.addField('button','Submit');

form = formBuilder.getForm();

window.addEventListener('load',function(){
    document.body.appendChild(form);
},false)

