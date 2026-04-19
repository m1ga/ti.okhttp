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
- ✅ Upload/download progress tracking

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
import okhttp from 'ti.okhttp';

okhttp.addEventListener('data', function(e) {
    console.log('Status:', e.statusCode);
    console.log('Body:', e.body);
});

okhttp.addEventListener('error', function(e) {
    console.log('Error:', e.message);
});

// Progress tracking events
okhttp.addEventListener('uploadProgress', function(e) {
    console.log('Upload:', e.progress + '%');
    console.log('Transferred:', e.transferred, '/', e.total, 'bytes');
});

okhttp.addEventListener('downloadProgress', function(e) {
    console.log('Download:', e.progress + '%');
    console.log('Transferred:', e.transferred, '/', e.total, 'bytes');
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
| `cacheDir` | String | `null` | Custom cache directory path (optional) |

#### Redirect Control

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `followRedirects` | Boolean | `true` | Automatically follow HTTP redirects |
| `followSslRedirects` | Boolean | `true` | Follow redirects over HTTPS |

#### Progress Tracking

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `trackProgress` | Boolean | `false` | Enable upload/download progress tracking |

#### Host Override

| Parameter | Type | Description |
|-----------|------|-------------|
| `host` | String | Custom host override for DNS spoofing/testing |

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
| `url` | String | Request URL |
| `data` | Object | Request data (POST only) |
| `message` | String | Error message |
| `statusCode` | Integer | HTTP status code (if available) |
| `body` | String | Response body (if available) |

---

### Progress Events

Progress events are fired during upload and download operations when `trackProgress` is enabled.

#### `uploadProgress` Event

| Property | Type | Description |
|----------|------|-------------|
| `url` | String | Request URL |
| `type` | String | Always `"upload"` |
| `bytesWritten` | Long | Bytes uploaded so far |
| `contentLength` | Long | Total bytes to upload |
| `progress` | Integer | Percentage (0-100) |
| `transferred` | Long | Alias for bytesWritten |
| `total` | Long | Alias for contentLength |

#### `downloadProgress` Event

| Property | Type | Description |
|----------|------|-------------|
| `url` | String | Request URL |
| `type` | String | Always `"download"` |
| `bytesWritten` | Long | Bytes downloaded so far |
| `contentLength` | Long | Total bytes to download |
| `progress` | Integer | Percentage (0-100) |
| `transferred` | Long | Alias for bytesWritten |
| `total` | Long | Alias for contentLength |

---

### Complete Event Reference

#### Summary of All Events

| Event | Description | Triggered When |
|-------|-------------|----------------|
| `data` | Successful response received | HTTP 2xx response |
| `error` | Request failed | Timeout, network error, HTTP 4xx/5xx |
| `uploadProgress` | Upload in progress | Data being sent (with `trackProgress`) |
| `downloadProgress` | Download in progress | Data being received (with `trackProgress`) |

#### All Event Properties by Event Type

##### `data` Event Properties
| Property | Type | Description |
|----------|------|-------------|
| `header` | String | Response headers as string |
| `body` | String | Response body |
| `url` | String | Request URL |
| `data` | Object | Request data sent |
| `cached` | Boolean | Response served from cache |
| `networkResponse` | String | Network response details |
| `protocol` | String | HTTP protocol (e.g., "http/1.1") |
| `statusCode` | Integer | HTTP status code |
| `statusMessage` | String | HTTP status message |

##### `error` Event Properties
| Property | Type | Description |
|----------|------|-------------|
| `timeout` | Boolean | Timeout occurred |
| `url` | String | Request URL |
| `data` | Object | Request data (if POST) |
| `message` | String | Error description |
| `statusCode` | Integer | HTTP status code (if available) |
| `body` | String | Response body (if available) |

##### `uploadProgress` Event Properties
| Property | Type | Description |
|----------|------|-------------|
| `url` | String | Request URL |
| `type` | String | Always `"upload"` |
| `bytesWritten` | Long | Bytes uploaded so far |
| `contentLength` | Long | Total bytes to upload |
| `progress` | Integer | Percentage (0-100) |
| `transferred` | Long | Alias for bytesWritten |
| `total` | Long | Alias for contentLength |

##### `downloadProgress` Event Properties
| Property | Type | Description |
|----------|------|-------------|
| `url` | String | Request URL |
| `type` | String | Always `"download"` |
| `bytesWritten` | Long | Bytes downloaded so far |
| `contentLength` | Long | Total bytes to download |
| `progress` | Integer | Percentage (0-100) |
| `transferred` | Long | Alias for bytesWritten |
| `total` | Long | Alias for contentLength |

---

### Advanced Options

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

### Custom Cache Directory

```javascript
const cacheDir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'cache');
if (!cacheDir.exists()) {
    cacheDir.createDirectory();
}

okhttp.get({
    url: 'https://api.example.com/data',
    caching: true,
    cacheSize: 50,  // 50 MB cache
    cacheDir: cacheDir.nativePath,  // Custom cache directory
    header: {
        'Cache-Control': 'max-stale=3600'
    }
});
```

**Note:** The `cacheDir` parameter allows you to specify a custom directory for the HTTP cache. This is useful when you need more control over cache location or want to share cache between modules. If the directory doesn't exist, the module will attempt to create it. If creation fails, it falls back to the default cache directory.

#### Advanced Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `followRedirects` | Boolean | `true` | Automatically follow HTTP redirects (3xx responses) |
| `followSslRedirects` | Boolean | `true` | Follow redirects over HTTPS when original request was HTTPS |
| `allowPooling` | Boolean | `true` | Enable connection pooling (cache persistence) |
| `onlyIfCached` | Boolean | `false` | Return only cached responses, fail if not cached (offline mode) |
| `trackProgress` | Boolean | `false` | Enable upload/download progress tracking |
| `cacheDir` | String | `null` | Custom cache directory path |
| `host` | String | `null` | Custom host override for DNS spoofing/testing |

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

### Redirect Control

```javascript
// Disable redirects for testing
okhttp.get({
    url: 'https://api.example.com/redirect',
    followRedirects: false,
    followSslRedirects: false
});
```

### Offline Mode (Only Cached Responses)

```javascript
okhttp.get({
    url: 'https://api.example.com/data',
    caching: true,
    onlyIfCached: true,  // Return cached response only, fail if not cached
    cacheSize: 50  // 50 MB cache for offline data
});
```

### Progress Tracking (Upload & Download)

```javascript
// Listen for progress events
okhttp.addEventListener('uploadProgress', function(e) {
    console.log('Upload Progress:', e.progress + '%');
    console.log('Transferred:', e.transferred, 'of', e.total, 'bytes');
});

okhttp.addEventListener('downloadProgress', function(e) {
    console.log('Download Progress:', e.progress + '%');
    console.log('Transferred:', e.transferred, 'of', e.total, 'bytes');
});

// Upload with progress tracking
okhttp.post({
    url: 'https://example.com/upload',
    trackProgress: true,  // Enable progress tracking
    data: {
        file: Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'largefile.zip').read(),
        description: 'Large file upload'
    }
});

// Download with progress tracking
okhttp.get({
    url: 'https://example.com/largefile.zip',
    trackProgress: true,  // Enable progress tracking
    header: {
        'Accept': 'application/octet-stream'
    }
});
```

#### Complete Progress Tracking Example with UI Update

```javascript
import okhttp from 'ti.okhttp';

// Create progress indicator
const progressBar = Ti.UI.createProgressBar({
    min: 0,
    max: 100,
    value: 0,
    message: 'Ready',
    top: 20
});
win.add(progressBar);

// Listen for upload progress
okhttp.addEventListener('uploadProgress', function(e) {
    progressBar.value = e.progress;
    progressBar.message = `Uploading: ${e.progress}%`;
    console.log(`Upload: ${e.progress}% (${e.transferred}/${e.total} bytes)`);
});

// Listen for download progress
okhttp.addEventListener('downloadProgress', function(e) {
    progressBar.value = e.progress;
    progressBar.message = `Downloading: ${e.progress}%`;
    console.log(`Download: ${e.progress}% (${e.transferred}/${e.total} bytes)`);
});

// Handle completion
okhttp.addEventListener('data', function(e) {
    progressBar.message = 'Complete!';
    console.log('Transfer complete:', e.url);
});
```

#### Combined Example: POST with Progress and Callbacks

```javascript
okhttp.post({
    url: 'https://api.example.com/upload',
    header: {
        'Content-Type': 'application/json'
    },
    data: {
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Long bio content...'
    },
    trackProgress: true,
    success: function(e) {
        console.log('Upload successful:', e.body);
    },
    error: function(e) {
        console.log('Upload failed:', e.message);
    }
});
```

#### Thread Architecture

The progress tracking implementation follows a **thread-safe architecture**:

```
┌─────────────────────────┐
│   OkHttp Network Thread │
│  (IO Operations)        │
└───────────┬─────────────┘
            │
            │  1. requestBodyWrite() / responseBodyUpdate()
            │     (on Network Thread - non-blocking)
            │
            │  2. Create progress data
            │
            │  3. runOnUIThread() → IMMEDIATE RETURN
            │     (Event queued, don't wait for execution)
            │
┌───────────┴─────────────┐
│      UI Thread          │
│   (KrollRuntime)        │
└───────────┬─────────────┘
            │
            │  4. fireEvent("uploadProgress", ...)
            │     (Executed when UI thread is free)
            │
            │  5. Callbacks execution
```

**Key Points:**

| Aspect | Implementation | Benefit |
|--------|---------------|---------|
| **Network Thread** | Measures bytes, creates event data, queues UI event | Fast, never blocks on I/O |
| **Event Queue** | runOnUIThread() queues event without waiting | Network thread continues immediately |
| **UI Thread** | Processes events when idle, fires Titanium events | No UI blocking from network operations |
| **Debounce** | Max 10 events/second (100ms) | Prevents UI redraw thrashing |

**No Blocking Scenarios:**

1. ✅ **Large file upload:** Network thread sends 1MB → measures → queues event → continues sending. UI thread processes progress update when ready.

2. ✅ **Slow download:** Network thread receives chunks → measures → queues event → receives next chunk. UI shows progress periodically.

3. ✅ **UI thread busy:** Progress events are queued and processed when UI thread becomes available. No timeout or error.

**Why This Works:**

- OkHttp's EventListener runs on the network thread, which is dedicated to I/O
- `runOnUIThread()` is **asynchronous** - it queues the task and returns immediately
- KrollRuntime ensures all Titanium UI operations happen on the main thread
- Debouncing prevents excessive UI updates
- No `wait()` or blocking calls anywhere in the chain

---

## Complete API Reference

### All Available Options

#### Required
| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | String | The URL to request (required) |

#### Optional - Data & Headers
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `data` | Object/String | `null` | Request body (JSON object or String) |
| `header` | Object | `{}` | HTTP headers as key-value pairs |

#### Optional - Timeouts
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `connectTimeout` | Integer | `30000` ms | Connection timeout |
| `readTimeout` | Integer | `30000` ms | Read timeout |
| `writeTimeout` | Integer | `30000` ms | Write timeout |

#### Optional - Connection Pooling
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `connectionId` | String | `"default"` | Connection pool identifier |
| `maxIdleConnections` | Integer | `1` | Max idle connections |
| `keepAliveDuration` | Integer | `15000` ms | Connection keep-alive time |

#### Optional - Caching
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `caching` | Boolean | `false` | Enable response caching |
| `cacheSize` | Integer | `10` MB | Cache size in MB |
| `cacheDir` | String | `null` | Custom cache directory |

#### Optional - Redirect Control
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `followRedirects` | Boolean | `true` | Follow HTTP redirects |
| `followSslRedirects` | Boolean | `true` | Follow HTTPS redirects |
| `onlyIfCached` | Boolean | `false` | Use cached responses only |

#### Optional - Progress & Advanced
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `trackProgress` | Boolean | `false` | Enable progress tracking |
| `host` | String | `null` | Custom host override |

#### Optional - Callbacks (Alternative to Events)
| Parameter | Type | Description |
|-----------|------|-------------|
| `success` | Function | Callback on successful response |
| `error` | Function | Callback on error |

---

## Callbacks vs Events

### Using Events (Recommended for multiple listeners)

```javascript
okhttp.addEventListener('data', function(e) {
    console.log('Success:', e.body);
});
okhttp.addEventListener('error', function(e) {
    console.log('Error:', e.message);
});
okhttp.get({ url: 'https://...' });
```

### Using Callbacks (Simpler for single requests)

```javascript
okhttp.get({
    url: 'https://...',
    success: function(e) {
        console.log('Success:', e.body);
    },
    error: function(e) {
        console.log('Error:', e.message);
    }
});
```

**Note:** You can use both events and callbacks together if needed.

---

## Error Handling

### Common Errors and Solutions

```javascript
okhttp.get({
    url: 'https://api.example.com/data',
    connectTimeout: 10000,
    readTimeout: 15000
});

okhttp.addEventListener('error', function(e) {
    if (e.timeout) {
        console.log('Request timed out. Try increasing timeouts.');
    } else {
        console.log('Network error:', e.message);
    }
    console.log('URL:', e.url);
});
```

### HTTP Status Codes

The `data` event fires for all successful HTTP responses (2xx, 3xx).
Check `statusCode` to handle specific responses:

```javascript
okhttp.addEventListener('data', function(e) {
    if (e.statusCode === 200) {
        console.log('OK:', e.body);
    } else if (e.statusCode === 201) {
        console.log('Created:', e.body);
    } else if (e.statusCode >= 400) {
        console.log('Client/Server error:', e.statusCode);
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
