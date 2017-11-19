/**
 * 转义正则字符串，方便书写
 */
function escape (str) {
  return String(str).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}