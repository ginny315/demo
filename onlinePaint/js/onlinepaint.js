$(document).ready(function(){
	var mycanvas = document.getElementById('mycanvas'),
		context = mycanvas.getContext('2d'),
		$mycanvas = $('#mycanvas'),
		$palette = $('#palette'),
		paintNow = false;
		point = {},	
		curColor = null,	
		brush = {
			clickX:[],
			clickY:[],
			clickDrag:[],//boolean(if brush drag is true)
			clickColor:[]
		}

		point.notFirst = false;

	//if mousedown,recond position now.
	$mycanvas.on('mousedown',function(e){
		paintNow = true;
		recondMove(e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		redraw();
	});

	$mycanvas.on('mousemove',function(e){
		var mouseX = e.pageX - this.offsetLeft,
			mouseY = e.pageY - this.offsetTop;

		if(paintNow){
			recondMove(mouseX,mouseY,true);
			redraw();
		}
	});

	$mycanvas.on('mouseup',function(){
		paintNow = false;
	});

	$mycanvas.on('mouseleave',function(e){
		paintNow = false;
	});

	$palette.on('click',function(e){
		curColor.farbtastic($palette);
	})

	//recond x,y and dragging
function recondMove(x,y,dragging){
	brush.clickX.push(x);
	brush.clickY.push(y);
	brush.clickDrag.push(dragging); 
	brush.clickColor.push(curColor);
}

//clean the paint
function redraw(){
	//canvas.width = canvas.width; // Clears the canvas
 
	//context.strokeStyle = "#df4b26";
	context.lineJoin = "round";
	context.lineWidth = 5;
	
	while(brush.clickX.length > 0){
		point.bx = point.x;
		point.by = point.y;
		point.x = brush.clickX.pop();
		point.y = brush.clickY.pop();
		point.draw  = brush.clickDrag.pop();
		context.beginPath();
		if(point.draw && point.notFirst)
			context.moveTo(point.bx,point.by);
		else{
			point.notFirst = true;
			context.moveTo(point.x - 1,point.y);
		}
		context.lineTo(point.x,point.y);
		context.closePath();
		context.stroke();
	}
}
});

