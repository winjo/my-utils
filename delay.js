function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(true);
    }, time);
  });
}
