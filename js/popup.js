document.getElementById("portsubmit").addEventListener("click", function() {
	var status = document.getElementById("status");
	if (!status.firstChild) {
		status.appendChild(document.createTextNode(""));
	}
	var portin = document.getElementById("portinput").value;
	if (portin == undefined || portin == null || portin == "" || isNaN(portin)) {
		status.firstChild.nodeValue = "Error: Port is not a number.";
	} else {
		status.firstChild.nodeValue = "Opening port...";
		chrome.runtime.sendMessage({name: "porttrigger", msg: parseInt(portin)});
	}
});