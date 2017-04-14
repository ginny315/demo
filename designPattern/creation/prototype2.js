var field = {
    type:'',
    displayText:'',
    getElement:function(){
        var field = document.createElement('input');
        field.setAttribute('type',this.type);
        field.setAttribute('placeholder',this.displayText);
        return field;
    }
},
textField = Object.create(field,{
    type:{
        value:'text',
        enumberable:true
    },
    displayText:{
        value:'enter your address',
        enumerable:true
    }
}),
emailField = Object.create(field,{
    type:{
        value:'email',
        enumerable:true
    },
    displayText:{
        value:'enter your email',
        enumerable:true
    }
});

window.addEventListener('load',function(){
    var bodyElement = document.body;
    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
    bodyElement.appendChild(buttonField.getElement());
},false);