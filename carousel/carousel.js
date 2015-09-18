window.onload = function(){
	//var pic = document.getElementsByClassName('div_pic');
	var li = document.getElementsByTagName('li');
	var div_choose = document.getElementsByClassName('div_choose');
	var ul = document.getElementsByTagName('ul');
	var ul0 = ul[0],ul1 = ul[1];
	var flag = 0;

	function turn(value){
		var	translate = 0;
		
		if (value == null){
			for(var i=4 ; i<8 ;i++){
				li[i].style.backgroundColor = "#fff";
			}
			if(flag == 3) 
				flag = 0;
			else
				translate = -25*(++flag);
				var li_flag = flag + 4;
				li[li_flag].style.backgroundColor = "#ccc";
				//setTimeout(picMove(translate),500);
				
		}else{
			flag = parseInt(value)-1;
			console.log(flag);
			var li_flag = flag+4;	
			translate = -25*(--value);
			for(var i=4 ; i<8 ; i++){
				if(i!=li_flag)
					li[i].style.backgroundColor = "#fff";
			}
			li[li_flag].style.backgroundColor = "#ccc";			
		}	
		ul0.style.transform = "translate("+translate+"%)";		
	}

	/*function picMove(value){
		ul0.style.transform = "translate("+value+"%)";
	}*/

	var time = setInterval(turn,1000);

/*	var enter = function(){
		console.log('1');
		clearInterval(time);
	}

	var out = function(){
		console.log('2');
		time = setInterval(turn,1000);
	}

	for(var i=0 ; i<4 ;i++){
		li[i].addEventListener('mouseenter',enter,false);
		li[i].addEventListener('mouseout',out,false);
	}*/

	/*ul1.onmouseenter = function(event){

		console.log(123);
		var e = event || window.event;
		var target = e.target || e.srcElement;

		console.log(target.nodeName);
		if(target.nodeName.toLowerCase() == 'li'){
			console.log(target);
		}
	}*/

	/*function eventHandle(event){
		event = event || window.event;
		if(ev)
	}*/

	var mouseenter_li = function(){
		console.log('3');
		turn(this.innerHTML);
		console.log("html="+this.innerHTML);
		clearInterval(time);
	}

	var mouseout_li = function(){
		console.log('4');
		time = setInterval(turn,1000);
	}

	for(var i=4 ; i<8 ;i++){		
		li[i].addEventListener('mouseenter',mouseenter_li,false);
		li[i].addEventListener('mouseout',mouseout_li,false);
	}
}