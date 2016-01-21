$(document).ready(function(){
	var mycanvas = document.getElementById('mycanvas'),
		context = mycanvas.getContext('2d'),
		canvasWidth = 600;
		canvasHeight = 400;
		$mycanvas = $('#mycanvas'),
		$palette = $('#palette'),
		$brushwidth = $('#brushwidth')
		$color = $('#color'),
		$colorpicker = $('#colorpicker'),
		$tool = $('#tool'),
		$tool2 = $('#tool2'),
		paintNow = false,//flag
		point = {},	
		curColor = '#000',
		curSize = 5,
		curTool = '画笔';	
		brush = {
			clickX:[],
			clickY:[],
			clickDrag:[],//boolean(if brush drag is true)
			clickColor:[],
			clickSize:[]
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

	//handler choose color
	$palette.on('click',function(e){
		curColor = $(e.target).text();
	});

	$brushwidth.on('click',function(e){
		curSize = $(e.target).text();
		switch(curSize){
			case('特细'):
				curSize = 2;
				break;
			case('细'):
				curSize = 5;
				break;
			case('粗'):
				curSize = 10;
				break;
			case('特粗'):
				curSize = 15;
				break;
			default:
				curSize = 5;
		}
	});

	$tool.on('click',function(e){
		curTool = $(e.target).text();
	});

	$tool2.on('click',function(e){
		if($(e.target).text() == '清空'){
			if(confirm('你确定要清空画板？')){
				clean();
			}
		}else{
			var img = mycanvas.toDataURL('image/png');
			console.log(img);
			$('#finish').attr('src',img);
		}
	});	



	//recond x,y and dragging
	function recondMove(x,y,dragging){
		brush.clickX.push(x);
		brush.clickY.push(y);
		brush.clickDrag.push(dragging); 
		if(curTool == '橡皮') 
			brush.clickColor.push('#fff');
		else
			brush.clickColor.push(curColor);
		brush.clickSize.push(curSize);
	}

	//clean the paint
	function redraw(){
		//canvas.width = canvas.width; // Clears the canvas
	 
		context.lineJoin = "round";
		
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
			context.strokeStyle = brush.clickColor.pop();			
			context.lineWidth = brush.clickSize.pop();
			context.stroke();
		}
	}

	function clean(){
		brush = {
			clickX:[],
			clickY:[],
			clickDrag:[],//boolean(if brush drag is true)
			clickColor:[],
			clickSize:[]
		};
		 context.clearRect(0, 0, canvasWidth, canvasHeight);
	}

	function convertImageToCanvas(image) {
		var canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		canvas.getContext("2d").drawImage(image, 0, 0);
		return canvas;
	}

});

