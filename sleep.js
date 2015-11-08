function sleep(milliSeconds){
	var startTime = new Date().getTime();
	while(new Date().getTime() < startTime+milliSeconds)
		;
}

sleep(1000);