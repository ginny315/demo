var textField,
    emailField;

function Field(type,displayText){
    this.type = type || '';
    this.displayText = displayText || '';
}

Field.prototype = {
    getElement:function(){
        var field = document.createElement('input');
        field.setAttribute('type',this.type);
        field.setAttribute('placeholder',this.displayText);
        return field;
    }
};
textField = new Field('text','enter your address');
emailField = new Field('email','enter your email');

window.addEventListener('load',function(){
    var bodyElement = document.body;
    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
},false);

