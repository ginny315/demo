whenReady(function(){
    var clock = document.getElementById('clock');
    // var icon = new Image();//用于拖动的图片
    // icon.src='clock.png';

    //每分钟显示一次时间
    function displayTime(){
        var now = new Date();
        var hrs = now.getHours(),
            mins = now.getMinutes();
        if(mins < 10){
            mins = '0'+mins;
        }
        clock.innerHTML = hrs + ':' +mins;
        setTimeout(displayTime,60000);    
    }
    displayTime();

    //使时钟能够拖动
    //我们也能通过HTML属性实现这个目的：<span draggable='true'>
    clock.draggable = true;

    //设置拖动事件处理程序
    clock.ondragstart = function(event){
        var event = event || window.event;//用于IE兼容性
        //dataTransfer
        var dt = event.dataTransfer;
        //告诉浏览器正在拖动的是什么
        //把Date()构造函数做一个返回时间戳字符串的函数
        dt.setData('Text','ginny');
        // if(dt.setDragImage){
        //     dt.setDragImage(icon,0,0);
        // }
    };
});