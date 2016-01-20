var PI = Math.PI;
window.onload = function(){
	var canvas = document.getElementById('mycanvas'),
		context = canvas.getContext('2d');

	context.beginPath();
	context.moveTo(10,10);
	context.lineTo(100,300);
	context.lineTo(400,50);
	context.lineTo(10,10);
	context.closePath();
	
	// context.fillStyle = 'rgb(2,100,300)';
	// context.fill();
	/*画线条*/
	context.lineWidth = 5;
	context.strokeStyle = '#34dfee';
	context.stroke();

	/*画弧*/
	context.beginPath();
	//context.moveTo(50,50);
	context.arc(50,50,30,0*PI,0.5*PI,false);
	//context.closePath();
	
	context.lineWidth = 3;
	context.strokeStyle = '#344545';
	context.stroke();
	
	context.lineWidth = 5;
	context.strokeStyle = '#005588';
	for(var i=0 ; i<10 ;i++){
		context.beginPath();
		context.arc(50+i*100,60,40,0,2*PI*(i+1)/10);
		
		context.fillStyle = 'rgb(2,100,300)';
		context.fill();
		//context.stroke();
	}
	
}

