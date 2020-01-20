

//截取字符串
let substr = (str, num) => {
  if (!str) {
      return;
  }
  var text = '';
  if (str.length > 0) {
      if (str.length <= num) {
          text = str;
      } else {
          text = str.substring(0, num) + '...';
      }
      return text;
  } else {
      return str;
  }
}
//截取银行卡字符串,***表示隐藏
let getBankStr = (str) => {
  if (!str) {
      return;
  }
  var text = '';
  if (str.length > 0) {
      text =  "**** **** **** " + str.substr(-4);
      return text;
  } else {
      return str;
  }
}
//截取手机号字符串,中间用***表示隐藏
let getMobileStr = (str) => {
  if (!str) {
      return;
  }
  var text = '';
  if (str.length > 0) {
      text =  str.substr(0,3)+"****" + str.substr(-4);
      return text;
  } else {
      return str;
  }
}

// 取整时间
let parseTime = (time, cFormat)=> {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  }

export { substr,getBankStr,parseTime }