var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
};

var unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'"
};

var create = function (map) {
  return function(match) {
    return map[match];
  };
};

var escaper = create(escapeMap);

var unescaper = create(unescapeMap);

var isUndef = function(val) {
  return val === null || typeof val === 'undefined';
}

function escapeHTML(str) {
  str = isUndef(str) ? '' : str + '';
  return str.replace(/[&<>"']/g, escaper);
}

function unescapeHTML(str) {
  str = isUndef(str) ? '' : str + '';
  return str.replace(/&(?:amp|lt|gt|quot|apos);/g, unescaper);
}
