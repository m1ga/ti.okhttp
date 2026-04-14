# ti.okhttp - OkHttp module for Titanium SDK (Android)

[![OkHttp](https://square.github.io/okhttp/images/okhttp-logo.svg)](https://square.github.io/okhttp/)

A modern Android module for Titanium SDK that provides access to the powerful OkHttp HTTP client library.

## Features

- ✅ HTTP GET, POST and DELETE requests
- ✅ Connection pooling for performance optimization
- ✅ Request/response caching
- ✅ File uploads with multipart support
- ✅ Configurable timeouts
- ✅ Custom headers and User-Agent
- ✅ SSL/TLS support (via OkHttp)
- ✅ Event-driven API

## Installation

Copy the `ti.okhttp-android-*.zip` file from the `android/dist/` directory to your Titanium project's `modules/android/` folder.

## API Reference

### Module Import

```javascript
import okhttp from 'ti.okhttp';
// or
const okhttp = require('ti.okhttp');
```

### Event Listeners

#### Adding Event Listeners

```javascript
okhttp.addEventListener('data', function(e) {
    console.log('Status:', e.statusCode);
    console.log('Body:', e.body);
});

okhttp.addEventListener('error', function(e) {
    console.log('Error:', e.message);
});
```

---

### Methods

#### `get(options)`

Performs an HTTP GET request.

**Parameters:**
- `options` (Object) - Request options (see below)

#### `post(options)`

Performs an HTTP POST request.

**Parameters:**
- `options` (Object) - Request options (see below)

#### `deleteRoute(options)`

Performs an HTTP DELETE request.

**Parameters:**
- `options` (Object) - Request options (see below)

---

### Options (Parameters)

All methods accept an options object with the following parameters:

#### Required

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | String | The URL to request (required) |

#### Optional

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `data` | Object/String | `null` | Request body (JSON object or String). For POST with files, use TiBlob/TiBaseFile objects |
| `header` | Object | `{}` | HTTP headers as key-value pairs |
| `success` | Function | `null` | Success callback (alternative to event listener) |
| `error` | Function | `null` | Error callback (alternative to event listener) |

#### Timeouts

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `connectTimeout` | Integer | 30000 ms | Connection timeout in milliseconds |
| `readTimeout` | Integer | 30000 ms | Read timeout in milliseconds |
| `writeTimeout` | Integer | 30000 ms | Write timeout in milliseconds |

#### Connection Pooling

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `connectionId` | String | `"default"` | Identifier for connection pool |
| `maxIdleConnections` | Integer | `1` | Maximum number of idle connections in pool |
| `keepAliveDuration` | Integer | `15000` ms | Maximum time to keep connection alive in pool |

#### Caching

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `caching` | Boolean | `false` | Enable response caching |
| `cacheSize` | Integer | `10` MB | Cache size in megabytes |

#### Host (Documentation)

| Parameter | Type | Description |
|-----------|------|-------------|
| `host` | String | Custom host override (note: URL already contains host information) |

---

### Events

#### `data` Event

Fired when a successful response is received.

| Property | Type | Description |
|----------|------|-------------|
| `header` | String | Response headers |
| `body` | String | Response body |
| `url` | String | Request URL |
| `data` | Object | The data sent in the request |
| `cached` | Boolean | Whether the response was from cache |
| `networkResponse` | String | Network response details (if available) |
| `protocol` | String | Protocol used (e.g., "http/1.1") |
| `statusCode` | Integer | HTTP status code |
| `statusMessage` | String | HTTP status message |

#### `error` Event

Fired when an error occurs.

| Property | Type | Description |
|----------|------|-------------|
| `timeout` | Boolean | Whether the error was a timeout |
| `url` | String | Request URL (POST only) |
| `data` | Object | Request data (POST only) |
| `message` | String | Error message |

---

## Examples

### Basic GET Request

```javascript
import okhttp from 'ti.okhttp';

okhttp.get({
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    header: {
        'Accept': 'application/json'
    }
});

okhttp.addEventListener('data', function(e) {
    console.log('Status:', e.statusCode);
    console.log('Body:', e.body);
});

okhttp.addEventListener('error', function(e) {
    console.log('Error:', e.message);
});
```

### POST with JSON Data

```javascript
okhttp.post({
    url: 'https://jsonplaceholder.typicode.com/posts',
    header: {
        'Content-Type': 'application/json'
    },
    data: {
        title: 'Foo',
        body: 'Bar',
        userId: 1
    }
});
```

### File Upload (Multipart)

```javascript
const file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'image.png');
if (file.exists) {
    okhttp.post({
        url: 'https://example.com/upload',
        data: {
            file: file.read(),  // TiBlob
            description: 'My image'
        }
    });
}
```

### Custom Timeouts

```javascript
okhttp.get({
    url: 'https://slow-api.example.com/data',
    connectTimeout: 10000,  // 10 seconds
    readTimeout: 30000,     // 30 seconds
    writeTimeout: 15000     // 15 seconds
});
```

### Connection Pooling

```javascript
// Reuse connection pool with same connectionId
okhttp.get({
    url: 'https://api.example.com/endpoint1',
    connectionId: 'myPool',
    maxIdleConnections: 5,
    keepAliveDuration: 30000
});

okhttp.get({
    url: 'https://api.example.com/endpoint2',
    connectionId: 'myPool',  // Same pool
    maxIdleConnections: 5,
    keepAliveDuration: 30000
});
```

### Caching

```javascript
okhttp.get({
    url: 'https://api.example.com/data',
    caching: true,
    cacheSize: 20,  // 20 MB cache
    header: {
        'Cache-Control': 'max-stale=3600'
    }
});
```

### Using Callbacks Instead of Events

```javascript
okhttp.get({
    url: 'https://api.example.com/data',
    success: function(e) {
        console.log('Success:', e.body);
    },
    error: function(e) {
        console.log('Error:', e.message);
    }
});
```

---

## Migration from 1.1.0

### Old API (1.1.0)

```javascript
var client = Ti.OkHttp.createOkhttp({
    connectionId: 'myPool',
    maxIdleConnections: 5
});
client.get({ url: 'https://...' });
```

### New API (2.0+)

```javascript
okhttp.get({
    url: 'https://...',
    connectionId: 'myPool',
    maxIdleConnections: 5
});
```

**Key Changes:**
- No need to create proxy instances
- Connection pool parameters passed per-request
- Simpler, more intuitive API

---

## Requirements

- Titanium SDK 13.2.0+
- Android API Level 21+ (Android 5.0+)

## License

Apache Public License

## Credits

Uses [OkHttp](https://square.github.io/okhttp/) by Square, Inc.
