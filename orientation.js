function onOrientationChange(){
	//0 180 shu;90 -90 heng
	var isPortrait = window.orientation % 180 ===0;
	document.body.className += isPortrait ? 'portrait' : 'landscape';
}

window.addEventListener('orientationchange',onOrientationChange,false);

onOrientationChange();