
// 格式化时间
export function formatDate(date, fmt) {
  // 1.获取年份
  // y+ 1个或者多个y  yyyy:2021
  // y* 0个或者多个y
  // y? 0个或者1个y
  if (/(y+)/.test(fmt)) {
      // RegExp.$1 指的是与正则表达式匹配的第一个子匹配
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  // 2.获取月日等
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  }
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
  }
  return fmt
}

// 不足两位补足两位 04:05:09 
function padLeftZero(str) {
  // str=4 -> 004 截取 1 位 -> 04
  return ('00' + str).substr(str.length)
}

export function handleNumber(num) {
  if (num > 10000) {
      num = (num / 10000).toFixed(1)
      return num + '万';
  } else {
      return num;
  }
}

// 时间格式化 类型00:00
export function formatTime(time) {
  let it = parseInt(time);
  let m = parseInt(it / 60);
  let s = parseInt(it % 60);
  return (
    (m < 10 ? "0" : "") +
    parseInt(it / 60) +
    ":" +
    (s < 10 ? "0" : "") +
    parseInt(it % 60)
  );
}

// 处理音乐时长的时间
export function handleMusicTime(time) {
  // 如果超过了100000 基本都是毫秒为单位的了 先转成秒的
  time = parseInt(time)
  if (time > 10000) {
      time = Math.floor(time / 1000);
  } else {
      time = Math.floor(time)
  }
  let m = Math.floor(time / 60);
  let s = Math.floor(time % 60);
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  return m + ':' + s;
}