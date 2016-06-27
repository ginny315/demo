function UserDataStorage(maxage){
	var memory = document.createElement("div");
	memory.id = "_memory";
	memory.style.display = "none";
	memory.style.behavior = "url('#default#userData')";
	document.body.appendChild(memory);

	if(maxage){
		var now = (new Date()).getTime();
		var expires = now+100*24*60*60*1000;
		expires = new Date(expires).toUTCString();
		memory.expires = expires;
	}

	memory.load("myStoredData");

	this.getItem = function(key){
		return memory.getAttribute(key) || null;
	};
	this.setItem = function(key,value){
		memory.setAttribute(key,value);
		memory.save("UserDataStorage");
	};
	this.removeItem = function(key){
		memory.removeAttribute(key);
		memory.save("UserDataStorage");
	}

	var name = memory.getAttribute("username");
	if(!name){
		name = prompt("what is your name?");
		memory.setAttribute(" username",name);
		memory.save("myStoredData");
	};
	
}