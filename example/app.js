import okhttp from 'ti.okhttp';
var URL_GET = "https://httpbin.org/get";
var URL_POST = "https://httpbin.org/post";

const win = Ti.UI.createWindow({
	layout: "vertical"
});
const btn_ok1 = Ti.UI.createButton({
	title: "okhttp get"
});
const btn_ok2 = Ti.UI.createButton({
	title: "okhttp post"
});
const btn_ok3 = Ti.UI.createButton({
	title: "okhttp custom agent"
});
const btn_ok4 = Ti.UI.createButton({
	title: "okhttp timeout"
});
const btn_ok5 = Ti.UI.createButton({
	title: "okhttp cache"
});
const btn_ok6 = Ti.UI.createButton({
	title: "okhttp post file"
});
const btn1 = Ti.UI.createButton({
	title: "default get",
	top: 20
});
const btn2 = Ti.UI.createButton({
	title: "default post"
});
win.add([btn_ok1, btn_ok2, btn_ok3, btn_ok4, btn_ok5, btn_ok6, btn1, btn2]);
win.open();

okhttp.addEventListener("data", function(e) {
	console.log("Protocol:", e.protocol);
	console.log("cached:", e.cached);
	// console.log("networkResponse:", e.networkResponse);
	console.log("body:", JSON.stringify(e.body));
})
okhttp.addEventListener("error", function(e) {
	console.log("error");
	console.log(e)
})

btn_ok1.addEventListener("click", function(e) {
	okhttp.get({
		header: {
			"Accept": "application/json",
		},
		url: URL_GET
	})
})

btn_ok2.addEventListener("click", function(e) {
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

btn_ok6.addEventListener("click", function(e) {
	let file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "assets/DefaultIcon.png");
	if (file.exists) {
		okhttp.post({
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				"foo": "test",
				"file": file.read()
			},
			url: URL_POST
		})
	} else {
		console.log("not found")
	}
})

btn_ok3.addEventListener("click", function(e) {
	okhttp.get({
		header: {
			"Accept": "application/json",
			"User-Agent": "custom agent",
		},
		url: URL_GET
	})
})
btn_ok4.addEventListener("click", function(e) {
	okhttp.get({
		header: {
			"Accept": "application/json",
		},
		connectTimeout: 101,
		readTimeout: 102,
		writeTimeout: 103,
		url: URL_GET
	})
})
btn_ok5.addEventListener("click", function(e) {
	okhttp.get({
		header: {
			"Cache-Control": "max-stale=3600"
		},
		caching: true,
		url: URL_GET
	})
})

btn1.addEventListener("click", function(e) {
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			console.log(JSON.stringify(this.responseText));
		},
		onerror: function(e) {},
	});
	client.open("GET", URL_GET);
	client.setRequestHeader("Accept", "application/json");
	client.send();
})


btn2.addEventListener("click", function(e) {
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			console.log(JSON.stringify(this.responseText));
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
