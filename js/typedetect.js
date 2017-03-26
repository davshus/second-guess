var extension = chrome.runtime.connect({name: "typetrigger"});
document.addEventListener("keydown", function(e) {
	if (e.key.length != 1) return;
	else if (e.key.charCodeAt(0) - 'a'.charCodeAt(0) >= 0 && e.key.charCodeAt(0) - 'a'.charCodeAt(0) < 26){
		console.log("k");
		extension.postMessage({name: "typetrigger", msg: "k"});
	}
});