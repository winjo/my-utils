/**
 * 编码字符串
 * @param {Sting} val
 */
function encode(val) {
  return encodeURIComponent(val).replace(/%20/g, '+');
}

/**
 * 解码字符串
 * @param {Sting} val
 */
function decode(val) {
  return decodeURIComponent(val.replace(/\+/g, '%20'));
}

/**
 * 序列化查询参数
 * @param {Object} obj
 * @return {String}
 */
function serialize(obj) {
  if (!obj || typeof obj !== 'object') return '';
  var toString = Object.prototype.toString;
  var pairs = [];
  Object.keys(obj).forEach(function (key) {
    var val = obj[key];
    if (val === null || typeof val === 'undefined') {
      return;
    }

    if (toString.call(val) !== '[object Array]') {
      val = [val];
    }

    val.forEach(function (v) {
      if (toString.call(v) === '[object Date]') {
        v = v.toISOString();
      } else if (typeof v === 'object') {
        v = JSON.stringify(v);
      }
      pairs.push(encode(key) + '=' + encode(v));
    });
  });
  return pairs.join('&');
}

/**
 * 反序列化查询参数
 * @param  {String?} querystring 查询字符串
 * @return {Object} 解析后的查询字符串对象
 */
function deserialize(querystring) {
  querystring = querystring || window.location.search.slice(1);
  var query = {}, key, value;
  querystring.split('&').forEach(function (pair) {
    var pos = pair.indexOf('=');
    if (pos >= 0) {
      key = decode(pair.slice(0, pos));
      value = decode(pair.slice(pos + 1));
      if (query.hasOwnProperty(key)) {
        query[key] = [].concat(query[key]);
        query[key].push(value);
      } else {
        query[key] = value;
      }
    }
  });
  return query;
}

/**
 * http 请求
 * @param {String} url 请求的 url
 * @param {Object | null} data 发送的数据
 * @param {String} method 请求的方法
 * @param {Object?} config 配置项
 * @return {Promise} promise 对象
 */
function http(url, data, method, config) {
  return new Promise(function (resolve, reject) {
    method = method ? method.toUpperCase() : 'GET';
    config = config || {};

    var headers = config.headers || {};

    if (method === 'GET' && data !== null) {
      var queryString = serialize(data);
      if (queryString !== '') {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryString;
      }
    } else if (data) {
      var toString = Object.prototype.toString;
      if (toString.call(data) === '[object Object]') {
        data = JSON.stringify(data);
        headers['Content-Type'] = 'application/json;charset=utf-8';
      } else if (typeof data === 'string') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      }
    }

    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.timeout = config.timeout || 0;

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          var result = !config.responseType || config.responseType === 'text' ? xhr.responseText : xhr.response;
          if (typeof result === 'string') {
            try {
              result = JSON.parse(result);
            } catch (e) {}
          }
          resolve(result);
        } else {
          reject(new Error('Request failed with status code ' + xhr.status));
        }
      }
    };

    xhr.onerror = function () {
      reject(new Error('Network Error'));
      xhr = null;
    };

    xhr.ontimeout = function () {
      reject(new Error('timeout of ' + config.timeout + 'ms exceeded'));
      xhr = null;
    };

    if ('setRequestHeader' in xhr) {
      Object.keys(headers).forEach(function (key) {
        if (method === 'GET' && key.toLowerCase() === 'content-type') {
          delete headers[key];
        } else {
          xhr.setRequestHeader(key, headers[key]);
        }
      });
    }

    if (config.withCredentials) {
      xhr.withCredentials = true;
    }

    if (config.responseType) {
      try {
        xhr.responseType = config.responseType;
      } catch (e) {
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    xhr.send(data);
  });
}
