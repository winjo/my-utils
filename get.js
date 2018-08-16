/**
 * [^.[\]]+  |
 * \[(
 *  ?:(-?\d+(?:\.\d+)?)  |
 *  ( ["'] )( ( ?:.)*? )\2
 * )\]
 */
var REG_PROP = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:.)*?)\2)\]/g;

/**
 * get({ a: [{ '\\b':{ '-2':{ c: 2 } } }] }, 'a[0]["\\b"][-2].c')
 * @param {Object} obj [取值对象]
 * @param {String} path [路径字符串]
 * @return {*} [属性值或 undefined]
 */
function get(obj, path) {
  if (obj === null && typeof obj === 'undefined') return;
  var pathArr = (function(pathStr) {
    var result = [];
    if (/^\./.test(pathStr)) result.push('');
    pathStr.replace(REG_PROP, function(match, number, quote, str) {
      result.push(quote ? str : (number || match));
    });
    return result;
  })(path);

  var index = 0;
  var len = pathArr.length;
  while(obj !== null && typeof obj !== 'undefined' && index < len) {
    obj = obj[pathArr[index++]];
  }
  return obj;
}
