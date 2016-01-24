var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var downEventName = device ? 'touchstart' : 'mousedown';
var moveEventName = device ? 'touchmove' : 'mousemove';
var upEventName = device ? 'touchend' : 'mouseup';
$(document).on(downEventName, '#myCanvas', mouseDownEvent);
$(document).on(moveEventName, '#myCanvas', mouseMoveEvent);
$(document).on(upEventName, '#myCanvas', mouseUpEvent);

var _isDown = false, 
    lastPosition, 



