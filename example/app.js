import okhttp from 'ti.okhttp';

// Test URLs
const URL_GET = 'https://httpbin.org/get';
const URL_POST = 'https://httpbin.org/post';
const URL_TIMEOUT = 'https://httpbin.org/delay/5';

// Create window
const win = Ti.UI.createWindow({
	layout: 'vertical',
	backgroundColor: '#f5f5f5'
});

// Title
const lblTitle = Ti.UI.createLabel({
	text: 'ti.okhttp Examples',
	font: { fontSize: 24, fontWeight: 'bold' },
	top: 20,
	color: '#333'
});
win.add(lblTitle);

// Button container
const btnContainer = Ti.UI.createView({
	layout: 'vertical',
	width: '90%',
	top: 20
});

// Example buttons
const btnGet = Ti.UI.createButton({
	title: 'GET Request',
	top: 10
});
const btnPost = Ti.UI.createButton({
	title: 'POST JSON',
	top: 10
});
const btnFile = Ti.UI.createButton({
	title: 'POST File Upload',
	top: 10
});
const btnTimeout = Ti.UI.createButton({
	title: 'Custom Timeouts',
	top: 10
});
const btnCache = Ti.UI.createButton({
	title: 'Response Caching',
	top: 10
});
const btnConnectionPool = Ti.UI.createButton({
	title: 'Connection Pooling',
	top: 10
});
const btnCallbacks = Ti.UI.createButton({
	title: 'Using Callbacks',
	top: 10
});
const btnComparison = Ti.UI.createButton({
	title: 'Compare with Ti.Network',
	top: 10
});

btnContainer.add([btnGet, btnPost, btnFile, btnTimeout, btnCache, btnConnectionPool, btnCallbacks, btnComparison]);
win.add(btnContainer);

// Event Listeners
okhttp.addEventListener('data', function(e) {
	console.log('=== DATA EVENT ===');
	console.log('Status Code:', e.statusCode);
	console.log('Protocol:', e.protocol);
	console.log('Cached:', e.cached);
	console.log('URL:', e.url);
	// console.log('Headers:', e.header);
	// console.log('Body:', e.body);
});

okhttp.addEventListener('error', function(e) {
	console.log('=== ERROR EVENT ===');
	console.log('Timeout:', e.timeout);
	console.log('Message:', e.message);
});

// GET Request
btnGet.addEventListener('click', function() {
	okhttp.get({
		header: {
			'Accept': 'application/json'
		},
		url: URL_GET
	});
});

// POST JSON
btnPost.addEventListener('click', function() {
	okhttp.post({
		header: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		data: {
			title: 'Ti.okhttp Test',
			body: 'This is a test post from Titanium SDK',
			userId: 1
		},
		url: URL_POST
	});
});

// File Upload
btnFile.addEventListener('click', function() {
	const file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'assets/DefaultIcon.png');
	if (file.exists()) {
		okhttp.post({
			header: {
				'Content-Type': 'multipart/form-data'
			},
			data: {
				description: 'Test file upload',
				file: file.read()
			},
			url: URL_POST
		});
	} else {
		Ti.API.error('File not found');
	}
});

// Custom Timeouts
btnTimeout.addEventListener('click', function() {
	okhttp.get({
		header: {
			'Accept': 'application/json'
		},
		connectTimeout: 10000,  // 10 seconds
		readTimeout: 15000,     // 15 seconds
		writeTimeout: 10000,    // 10 seconds
		url: URL_TIMEOUT
	});
});

// Response Caching
btnCache.addEventListener('click', function() {
	okhttp.get({
		header: {
			'Cache-Control': 'max-stale=3600'
		},
		caching: true,
		cacheSize: 20,  // 20 MB
		url: URL_GET
	});
});

// Connection Pooling
btnConnectionPool.addEventListener('click', function() {
	okhttp.get({
		header: {
			'Accept': 'application/json'
		},
		connectionId: 'myPool',
		maxIdleConnections: 5,
		keepAliveDuration: 30000,
		url: URL_GET
	});
});

// Using Callbacks
btnCallbacks.addEventListener('click', function() {
	okhttp.get({
		url: URL_GET,
		header: {
			'Accept': 'application/json'
		},
		success: function(e) {
			Ti.API.info('Success callback received');
			Ti.API.info('Status:', e.statusCode);
			Ti.API.info('Body:', e.body.substring(0, 200) + '...');
		},
		error: function(e) {
			Ti.API.error('Error callback received:', e.message);
		}
	});
});

// Comparison with Ti.Network
btnComparison.addEventListener('click', function() {
	const dialog = Ti.UI.createAlertDialog({
		title: 'Comparison',
		message: 'This example shows ti.okhttp vs Ti.Network.createHTTPClient\n\n' +
			'ti.okhttp features:\n' +
			'  • Connection pooling\n' +
			'  • Better caching\n' +
			'  • File uploads (multipart)\n' +
			'  • Configurable timeouts\n' +
			'  • Event-driven API\n\n' +
			'See README.md for details.',
		buttons: [Ti.UI.Android.BUTTON_POSITIVE]
	});
	dialog.show();
});

win.open();
