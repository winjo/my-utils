var toString = Object.prototype.toString;

function isArray(val) {
  return Array.isArray ? Array.isArray(val) : toString.call(val) === '[object Array]';
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function isDate(val) {
  return toString.call(val) === '[object Date]';
}

function isString(val) {
  return typeof val === 'string';
}