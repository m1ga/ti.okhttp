import okhttp from 'ti.okhttp';
var URL_GET = "https://httpbin.org/get";
var URL_POST = "https://httpbin.org/post";

const win = Ti.UI.createWindow({
	layout: "vertical"
});
const btn1 = Ti.UI.createButton({
	title: "okhttp get"
});
const btn2 = Ti.UI.createButton({
	title: "okhttp post"
});
const btn3 = Ti.UI.createButton({
	title: "default get"
});
const btn4 = Ti.UI.createButton({
	title: "default post"
});
const lbl = Ti.UI.createLabel({
	text: "-"
});
win.add([btn1, btn2, btn3, btn4, lbl]);
win.open();

okhttp.addEventListener("data", function(e) {
	console.log(e.protocol);
	console.log(e.body);
})

btn1.addEventListener("click", function(e) {
	okhttp.get({
		header: {
			"Accept": "application/json",
		},
		url: URL_GET
	})
})

btn2.addEventListener("click", function(e) {
	okhttp.post({
		header: {
			"Accept": "application/json",
			//"Content-Type": "application/x-www-form-urlencoded"
		},
		data: {
			"foo": "test",
			"bar": "2",
		},
		url: URL_POST
	})
})

btn3.addEventListener("click", function(e) {
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			console.log(this.responseText);
		},
		onerror: function(e) {},
	});
	client.open("GET", URL_GET);
	client.setRequestHeader("Accept", "application/json");
	client.send();
})


btn4.addEventListener("click", function(e) {
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			console.log(this.responseText);
		},
		onerror: function(e) {},
	});
	client.open("POST", URL_POST);
	client.setRequestHeader("Accept", "application/json");
	client.send({
		"foo": "test",
		"bar": 2,
	});
})
