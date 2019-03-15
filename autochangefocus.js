(function(){
    function tabForward(evebt){
        event = EventUtil.getTarget(event);
        var target = EventUtil.getTarget(event);

        if(target.value.length == target.maxLength){
            var form = target.form;

            for(var i=0, len=form.elements.length ; i<len ;i++){
                if(form.elements[i] == target){
                    if(form.elements[i+1]){
                        form.elements[i+1].focus();
                    }
                    return;
                }
            }
        }
    }
    var textbox1 = document.getElementById('txtTel1');
    var textbox2 = document.getElementById('txtTel2');
    var textbox3 = document.getElementById('txtTel3');

    EventUtil.addHandler(textbox1,'keyup',tabForward);
    EventUtil.addHandler(textbox2,'keyup',tabForward);
    EventUtil.addHandler(textbox3,'keyup',tabForward);    
})();