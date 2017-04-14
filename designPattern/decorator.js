var FormField = function(type,displayText){
    this.type = type || 'text';
    this.displayText = displayText || '';
};

FormField.prototype = {
    createElement:function(){
        this.element = document.createElement('input');
        this.element.setAttribute('type',this.type);
        this.element.setAttribute('placeholder',this.displayText);
        return this.element;
    },
    isValid:function(){
        return this.element.value !== '';
    }
};
var FormFieldDecorator = function(formField){
    this.formField = formField;
}
FormFieldDecorator.prototype = {
    createElement:function(){
        this.formField.createElement();
    },
    isValid:function(){
        return this.formField.isValid();
    }
};

var MaxLengthFieldDecorator = function(formField,maxLength){
    FormFieldDecorator.call(this,formField);
    this.maxLength = maxLength || 100;
}
MaxLengthFieldDecorator.prototype = new FormFieldDecorator();
MaxLengthFieldDecorator.prototype.createElement = function(){
    var element = this.formField.createElement();
    element.setAttribute('maxlength',this.maxLength);
    return element;
};
var AutoCompleteDecorator = function(formField,autocomplete){
    FormFieldDecorator.call(this,formField);
    this.autocomplete = autocomplete || 'on';
};
AutoCompleteDecorator.prototype = new FormFieldDecorator();
AutoCompleteDecorator.prototype.createElement = function(){
    var element = this.formField.createElement();
    element.setAttribute('autocomplete',this.this.autocomplete);
    return element;
}
//使用
var form = document.createElement('form'),
    formField = new FormField('search','enter your search term');

formField = new MaxLengthFieldDecorator(formField,225);
formField = new AutoCompleteDecorator(formfield,'off');

form.appendChild(formField.createElement());
form.addEventListener('submit',function(e){
    e.preventDefault();
    if(formField.isValid()){
        form.submit();
    }else{
        alert('Please correct the issues in the form field');
    }
},false);

window.addEventListener('load',function(){
    document.body.appendChild(form);
},false);