function Bucket (){
    var self = this;
    this.index = null;
    this.state = 0;
    this.rule = {
        active:'./destActive.png',
        success:'./destSuccess.png',
        error:'./destError.png',
        default:'./destDefault.png',
    };
    this.init = function(container,index){
        //var dist = name;
        self.index = index;
        var o = document.createElement('li');
        var img = document.createElement('img');
        img.setAttribute('src',self.rule.default);
        o.appendChild(img);
        o.addEventListener('dragenter',self.enter);
        o.addEventListener('dragleave',self.leave);
        o.addEventListener('dragover',self.over);
        o.addEventListener('drop',self.drop);
        container.appendChild(o);
    };
    this.enter = function(e){
        e.preventDefault();
        if(self.state != 0){//已经有物品
            
        }else{
            console.dir(e.target)
            e.target.src = self.rule.active;
        }
    };
    this.over = function(e){
        e.preventDefault();
        e.dataTransfer.dropEffect = "move"
    };
    this.leave = function(e){
        e.preventDefault();
        if(self.state != 0){//已经有物品
        
        }else{
            e.target.src = self.rule.default;
        }
    };
    this.drop = function(e){
        e.preventDefault();
        if(self.state != 0){//已经有物品

        }else{
            self.state = 1;
            var data = e.dataTransfer.getData("Text");
            e.target.parentNode.appendChild(document.getElementById(data));
            if(data == self.index){
                e.target.src = self.rule.success;
            }else{
                e.target.src = self.rule.error;
            }
        }
    } 
}
