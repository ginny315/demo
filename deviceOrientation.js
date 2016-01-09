var imageElem = document.createElement('img');
imageElem.setAttribute('src','aaa.jpg');

function handleOrientationEvent(e){
	var alpha = e.alpha,
		beta = e.beta,
		gamma = e.gamma;

		imageElem.style.webkitTransform = 'rotateZ(' + alpha +'deg(rotateX(' + beta + 'deg)rotateY(' + gamma + 'deg)';
}

document.body.appendChild(imageElem);

window.addEventListener('deviceorientation',handleOrientationEvent,false);