# ti.okhttp - OkHttp module for Titanium SDK (Android)

https://square.github.io/okhttp/

## Methods

* get()
* post()

<b>Parameters:</b>

All methods can use these parameters:

* url: String (*required*)
* data: JSON object
* header: JSON object
* connectTimeout: int (milliseconds)
* readTimeout: int (milliseconds)
* writeTimeout: int (milliseconds)
* caching: boolean
* cacheSize: int (MB)

## Events

* data: protocol, header, body, cached, data, url
* error: timeout (bool), message (string)
