const inBrowser = typeof window !== 'undefined';

const UA = inBrowser && window.navigator.userAgent.toLowerCase();

const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

const isNative  = Ctor => typeof Ctor === 'function' && /native code/.test(Ctor.toString());

const noop = () => {};

const nextTick = (function () {
  const callbacks = [];
  let pending = false;
  let timerFunc;

  function nextTickHandler () {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // 有限使用 Promise,  在 iOS >= 9.3.3 的 UIWebView MutationObserver有 bug
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve();
    const logError = err => { console.error(err); };
    timerFunc = () => {
      p.then(nextTickHandler).catch(logError);
      // 强制 ios 的 microtask 队列执行
      if (isIOS) setTimeout(noop);
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    let counter = 1;
    const observer = new MutationObserver(nextTickHandler);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = () => {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    timerFunc = () => {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    let _resolve;
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        _resolve = resolve;
      });
    }
  };
})();
