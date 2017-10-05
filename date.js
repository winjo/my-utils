/**
 * 固定数字长度
 * @param {Number} num 数字
 * @param {Number} len 需要固定的长度
 * @return {String} 固定后的字符串
 */
function fixSize(num, len) {
  var l = num.toString().length;
  var diff = l - len;
  if (diff < 0) { // 长度不够就补0
    return new Array(-diff + 1).join('0') + num;
  } else { // 长度超出接截取
    return num.toString().slice(diff);
  }
}

/**
 * 格式化日期
 * @param {Date} [date] [日期对象]
 * @param {String} [formatStr] [格式化字符串形式 如 `yyyy-MM-dd hh:mm:ss`]
 * @return {String} [格式化后的字符串]
 * example: formatDate(new Date, 'yyyy:MM:dd hh:mm:ss.S 第qq季度 星期w or y:M:d h:m:s.S q w')
 * result: 2017:10:05 16:33:06.347 第04季度 星期四 or 2017:10:5 16:33:6.347 4 四
 */

function formatDate(date, formatStr) {
  var Week = ['日', '一', '二', '三', '四', '五', '六'];
  var regs = {
    'y+': date.getFullYear() + '', // 年份
    'M+': date.getMonth() + 1 + '', // 月份
    'd+': date.getDate() + '', // 日
    'h+': date.getHours() + '', // 小时
    'm+': date.getMinutes() + '', // 分
    's+': date.getSeconds() + '', // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3) + '', // 季度
    'w': Week[date.getDay()], // 周
    'S': date.getMilliseconds() + '' // 毫秒
  };
  Object.keys(regs).forEach(function (rstr) {
    var replaceRegexp = new RegExp(rstr, 'g');
    formatStr = formatStr.replace(replaceRegexp, function(match) {
      var value = regs[rstr];
      var len = match.length;
      return len === 1 ? value : fixSize(value, len); // 模式为1位时直接返回原值
    });
  });
  return formatStr;
}
