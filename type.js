var toString = Object.prototype.toString;

function isUndefined(val) {
  return val === undefined;
}

function isNull(val) {
  return val === null;
}

function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function isBoolean(val) {
  return typeof val === 'boolean';
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function isFunction(val) {
  return typeof val === 'function';
}

function isSymbol(val) {
  return typeof val === 'symbol';
}

function isPlainObject(val) {
  return toString.call(val) === '[object Object]';
}

function isArray(val) {
  return Array.isArray ? Array.isArray(val) : toString.call(val) === '[object Array]';
}

function isDate(val) {
  return toString.call(val) === '[object Date]';
}

function isRegExp(val) {
  return toString.call(val) === '[object RegExp]';
}

function isFile(val) {
  return toString.call(val) === '[object File]';
}

function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

function isArrayBufferView(val) {
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    return ArrayBuffer.isView(val);
  }
  if (!val || !val.buffer) {
    return false;
  }
  return toString.call(val.buffer) === '[object ArrayBuffer]';
}

function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

function isPromise(val) {
  return val !== null && typeof val === 'object' && typeof obj.then === 'function';
}

function isMap(val) {
  return toString.call(val) === '[object Map]';
}

function isWeakMap(val) {
  return toString.call(val) === '[object WeakMap]';
}

function isSet(val) {
  return toString.call(val) === '[object Set]';
}

function isWeakSet(val) {
  return toString.call(val) === '[object WeakSet]';
}
