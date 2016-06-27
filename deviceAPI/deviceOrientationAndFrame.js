var alpha = 0,
	beta = 0,
	gamma = 0,
	imageElem = document.createElement('img');

imageElem.setAttribute('src','aaa.js');

function handleOrientationEvent(e){
	alpha = e.alpha,
	beta = e.beta,
	gamma = e.gamma;
}

function rotateImage(){
	imageElem.style.webkitTransform = 'rotateZ(' + alpha + 'deg) rotateX(' + beta + 'deg) rotateY' + gamma + 'deg)';
}

document.body.appendChild(imageElem);

window.addEventListener('deviceorientation',handleOrientationEvent,false);
window.setInterval(rotateImage,500);