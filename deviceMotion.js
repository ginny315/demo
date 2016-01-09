var accElem = document.createElement('p');
	accGravity = document.createElement('p');

function handleDeviceMotionEvent(e){
	var acc = e.acceleration,
		maxAcc = Math.max(acc.x,acc.y,acc.z),

		accGravity = e.accelerationIncludingGravity,
		maxAccGravity = Math.max(accGravity.x,accGravity.y,accGravity.z);

	accElem.innerHTML = 'Current acceleration:' + maxAcc + 'm/s^2';
	accGravityElem.innerHTML = 'Including gravity:' + maxAccGravity + 'm/s^2';
}


document.body.appendChild(accElem);
document.body.appendChild(accGravityElem);

window.addEventListener('devicemotion',handleDeviceMotionEvent,false);