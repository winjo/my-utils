const global = (function () {
  return this;
})();

function noop() {}

function isUndef(val) {
  return val === null || typeof val === 'undefined';
}

function isFunc(val) {
  return typeof val === 'function';
}

function bind (fn, ctx) {
  return function boundFn (...args) {
    const realCtx = this === global ? ctx : this;
    const len = args.length;
    return len ?
      (len > 1 ? fn.apply(realCtx, args) : fn.call(realCtx, args[0])) :
      fn.call(realCtx);
  }
}

function proxy(obj) {
  return new Proxy(noop, {
    get(target, key, receiver) {
      if (isUndef(obj)) {
        return proxy(obj);
      } else {
        const value = obj[key];
        return proxy(isFunc(value) ? bind(value, obj) : value);
      }
    },
    apply(target, context, [defaultValue]) {
      return isUndef(obj) ? defaultValue : obj;
    }
  });
}
