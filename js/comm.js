var keys = 0;
console.log("hello");
var override = false;
var max = 0, min = 1.1;
chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		console.assert(msg.msg == 'k');
		console.log("heyo");
		keys++;
		if (msg.name == "porttrigger") {
			udpPort.localPort = msg.msg;
			udpPort.open();
		}
	}
});
var udpPort = new osc.UDPPort();
udpPort.on("bundle", function(oscBundle, timeTag, info) {
	for (let i = 0; i < oscBundle.length; i++) {
		if (oscBundle.packets[i].address == "/muse/elements/beta_session_score") {
			if (oscBundle.packets[i].args[0].value > max) max =  oscBundle.packets[i].args[0].value;
			if (oscBundle.packets[i].args[0].value < min) min = oscBundle.packets[i].args[0].value;
		}
	}
});
setInterval(function() {
	keys = 0;
}, 60000);
setInterval(function() {
	if ((max - min > 0.22 && keys > 40) || override) {
		// chrome.notifications.create("test", {
		// 	type: "basic",
		// 	title: "Think about what you're doing right now.",
		// 	message: "Second Guess has detected a dangerous mix of emotions.  If you are typing a impulsive message, please think about the effects of it.",
		// 	iconUrl: "http://img.freepik.com/free-icon/notification-bell-outline-interface-symbol_318-70386.jpg"
		// }, function(){});
		alert("think about what you're doing...");
	}
	max = 0;
	min = 1.1;
}, 1000);