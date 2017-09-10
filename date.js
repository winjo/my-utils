/**
 * 格式化日期
 * @param {Date} [date] [日期对象]
 * @param {String} [formatStr] [格式化字符串形式 如 `yyyy-MM-dd hh:mm:ss`]
 * @return {String} [格式化后的字符串]
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
    if (new RegExp('(' + rstr + ')').test(formatStr)) {
      var val = regs[rstr];
      if (rstr === 'y+') {
        formatStr = formatStr.replace(RegExp.$1, val.slice(4 - RegExp.$1.length));
      } else {
        formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length === 1) ? val : (('00' + val).slice(val.length)));
      }
    }
  });
  return formatStr;
}
