# 常用函数集合


函数列表：
* type.js
  * isUndefined
  * isNull
  * isString
  * isNumber
  * isBoolean
  * isObject
  * isFunction
  * isSymbol
  * isPlainObject
  * isArray
  * isDate
  * isRegExp
  * isBlob
  * isArrayBuffer
  * isArrayBufferView
  * isFormData
  * isURLSearchParams
  * isPromise
  * isMap
  * isWeakMap
  * isSet
  * isWeakSet
* date.js
  * formatDate （格式化日期）
* http.js
  * encode （编码字符串）
  * decode （解码字符串）
  * serialize （序列化查询参数）
  * deserialize （反序列化查询参数）
  * http （http 请求）
* get.js
  * get（对象取属性函数，实现 proposal-optional-chainning）
* delay.js
  * delay（使用 Promise 封装  setTimeout）
* escape-html
  * escapeHTML（转义 html 字符串）
  * unescapeHTML（转回 html 字符串）
* proxy
  * proxy（使用 Proxy 实现链式调用）
* nextTick
  * nextTick（使用 Promise或MutationObserver实现 microtask 的回调，参照 vue 的 nextTick 实现）
* getPrimes
  * primes (计算质数，返回generator)
  * getPrimes (内部调用 primes, 返回指定范围的质数数组)
* escape-reg
  * escape（正则字符串转义）
