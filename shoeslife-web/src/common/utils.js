/**
 * 把数组格式转换成树形（移植自之前的项目）
 * @param  {any} arr 数组
 * @param  {any} transformer 自定义返回数据的函数
 * @param  {any} openId
 * @return {object}
 */
export function tree(arr, transformer, openId) {
  if (!arr || !Array.isArray(arr)) return [];
  var a, stack = [], list = {};
  arr.forEach(function (v, i) {
    var parentId = v.id.substring(0, v.id.length - 2);
    if (parentId == '') {
      a = stack;
    } else {
      var parent = list[parentId];
      if (!parent) return true;
      a = parent.children ? parent.children : parent.children = [];
      // parent.isFolder = true;

    }
    list[v.id] = v;
    a.push(transformer ? transformer(v, openId) : v);
  });
  return stack;
}


/**
 * 查找元素
 *
 * @param  {any} arr
 * @param  {any} value
 * @param  {any} prop='id'
 *
 * @return {object | null}
 *
 */
export function findBy(arr, value, prop = 'id') {
  let result = null;

  for (var index = 0; index < arr.length; index++) {
    var element = arr[index];

    if (element[prop] === value) {
      result = element;
      continue;
    }

  }
  return result
}

/**
 * 1.数据整理，添加lable是给antd的组件使用
 * 2.最后一层没有数据的children设置为null，是为了正确显示
 * @param  {Array} items
 */
export function treeTransformer(items) {

  const loop = (input) => {
    input.label = input.name
    input.value = input.id
    input.children = input.children && input.children.map(t => {
        t.label = t.name
        t.value = t.id
        if (t.children && t.children.length) {
          t = loop(t)
        } else {
          t.children = null
        }
        return t
      })
    return input
  }

  const data = items.map(d => loop(d))

  return data;
}


/**
 * 判断两个对象是否相等
 * @param  {any} a
 * @param  {any} b
 * @return boolean
 */
export function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * object to list 主要是把旧版的数据结构转换为select列表的数据结构
 * key:value => {title:value,value:key}
 * @param  {any} o
 */
export function toList(o) {
  let result = [];
  for (let item in o) {
    item !== '_value' && result.push({title: o[item], value: item})
  }
  return result
}
/**
 * 删除children，antd table有点问题
 * @param  {any} input
 * @return []
 */
export function normalizeCategory(input) {
  let output = [];
  input && input.forEach(item => {
    let a = {...item, children: null}
    output.push(a)
  });
  return output
}

const numberReg = /^\d*(\,|\.)?\d+$/;

/**
 * 验证是否是数字 可以是小数点 不是必填
 * @param  {any} rule
 * @param  {any} value
 * @param  {any} callback
 */
export function validatorFloat(rule, value, callback) {

  if (numberReg.test(value)) {
    callback()
  } else {
    callback(new Error('请填写有效数字'))
  }

}

/**
 * 验证是否是数字 不是必填
 * @param  {any} rule
 * @param  {any} value
 * @param  {any} callback
 */
export function validatorNumber(rule, value, callback) {

  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    numberReg.test(value) ? callback() : callback(new Error('请填写有效数字'))
  }

}

/**
 * (检查是否为数字，用法再rules写transform:toNumber)
 *
 * @param v (description)
 * @returns (description)
 */
export function toNumber(v) {
  if (!v || !v.trim()) {
    return undefined;
  }
  let num = Number(v);
  // num === ' '
  if (!isNaN(num)) {
    num = parseInt(v, 10);
  }
  return isNaN(num) ? v : num;
}

/**
 * 验证是否是数字 必填
 * @param  {any} rule
 * @param  {any} value
 * @param  {any} callback
 */
export function validatorRequiredNumber(rule, value, callback) {

  if (numberReg.test(value)) {
    callback()
  } else {
    callback(new Error('请填写有效数字'))
  }


}

/**
 * 输入文字中英文字符长度校验
 *
 * @param value 输入内容
 * @param callback 校验回调
 * @param msg 提示信息
 * @param num 长度
 */
export function validatorContent(value, callback, msg, num) {
  if (value) {
    let textValue = value.replace(/(^\s*)|(\s*$)/g, ''), length = -1;
    if (textValue) {
      length = textValue.replace(/[\u4e00-\u9fa5]/g, '**').length;
      if (length > num || length < 0) {
        callback(new Error(msg + '长度不能超过' + num + '个字符!'));
      } else {
        callback()
      }
    } else {
      callback(new Error(msg + '不能为空!'));
    }
  } else {
    callback();
  }
}
export function delSpace(val){
  if(!val) return ;
  return val.replace(/\s/g,'')
}


/**
 * 格式化指定集合的数据为现在项目的格式
 例如：T([
 { name: 'showInFront', type: 'BOOLEAN', label: '前台可见'},
 { name: 'showInBack', type: 'BOOLEAN', label: '中台可见'},
 { name: 'showInBackList', type: 'BOOLEAN', label: '中台列表可见'}
 ])
 *
 * @param  {any} items
 * @param  {any} o={}
 */
export function formGenerate(items, o = {}, transformer = () => {
}) {
  if (__DEV__) {
    items = items.map(item => {
      if (!item.name || !item.id || !item.dataType) {
        item.dataType = item.type;
        item.displayName = item.label;
        item.id = item.name;
      }


      return item;
    })
  }
  // 过滤没有name的以及type是隐藏文本域的
  let result = items.filter(item => item.id && item.dataType && item.dataType.toLowerCase() !== 'hidden');
  let status = null;
  let config = {};

  let form = result.map(item => {
    const name = item.displayName || item.name;
    const tipName = name.replace('：', '');
    let r = {
      label: tipName + '：', name: item.id
    }
    const type = item.dataType.toUpperCase();
    switch (type) {

      // radio
      case 'BOOLEAN':    //是否
        r.radio = {}
        break;
      //input
      case 'PLAIN_TEXT':  //多行文本
      case 'TEXT':        //文本
      case 'NUMBER':      //数字
      case 'RICH_TEXT':   //富文本
      case 'MOBILE':      //手机
      case 'TELEPHONE':   //电话号码
      case 'EMAIL':       //邮箱
        r.input = {}
        if ('PLAIN_TEXT' === type) {
          r.input.type = 'textarea'
        }
        break;
      // select
      case 'SELECT':     //单选
      case 'MULTI_SELECT':
        let arr = item.presetValue.split(',');
        let options = arr.map(a => {
          return {
            title: a,
            value: a
          }
        })
        r.select = {
          multiple: type == 'MULTI_SELECT' ? true : false,
          optionValue: options,
          tipValue: item.tip || ''
        }
        break;
      // INTEGER
      case 'INTEGER':     //整数
        r.inputNumber = {}
        break;
      // DATE             //时间
      case 'DATE':
        r.datepicker = {}
        break;
      default:
        break;
    }

    if (item.must || type === 'NUMBER') {
      const required = item.must ? true : false;
      r.required = required;

      let message = '';
      let rules = [];
      status = status || {};
      status[r.name] = {};
      if (required) {
        message = `请填写${tipName}`;
        rules.push({
          required,
          message
        })

      }
      if (item.maxLength) {
        message = `最多${item.maxLength}个字符`;
        rules.push({
          required,
          message,
          max: item.maxLength
        })
      }
      if (type === 'NUMBER') {
        message = `必须为数字类型`;
        rules.push({validator: validatorNumber})
        r.v = 'number'
      }


      r.rules = rules
    }

    r = transformer(r);


    return {...r, ...o}
  });

  let value = {};
  form.forEach(item => {

    if (item.v == 'number') {
      value[item.name] = ''
      delete item.v;
    } else {
      value[item.name] = null;
    }
  })

  config.formItems = form;
  config.initValue = value;
  config.initStatus = status;

  if (__DEV__) {
    console.info('转换后的数据\r\n', JSON.stringify(config, null, 2).replace(/"/g, '\''));
  }

  return config
}

if (__DEV__) {
  // function T
  window.T = formGenerate;
}
/**
 * 获取时间戳
 *
 *  example:
 *  new Date('2012-01-11 12:30:00').getTime()   =>   1326256200000
 *
 * @export
 * @param {any} value  传入时刻，没有时返回当前时间戳
 * @returns
 */
export function getTimeStamp(value) {
  if (value && typeof value === 'string') {
    return new Date(value).getTime()
  } else {
    return new Date().getTime()
  }
}

/**
 * 将时间戳转换成时间格式
 * example:
 *   1326256200000  =>  '2012-01-11 12:30:00'
 *
 * @export
 * @param {any} value
 * @param {any} showTime 是否显示time
 * @returns
 */
export function formatDate(value, showTime) {
  if (!value) return null;
  let _date = new Date(value),
    year = _date.getFullYear(),
    month = _date.getMonth() + 1,
    date = _date.getDate(),
    hours = _date.getHours(),
    mins = _date.getMinutes(),
    second = _date.getSeconds(),
    _dateTime = null;

  month < 10 && (month = "0" + month);
  date < 10 && (date = "0" + date);
  hours < 10 && (hours = "0" + hours);
  mins < 10 && (mins = "0" + mins);
  second < 10 && (second = "0" + second);
  _dateTime = year + "-" + month + "-" + date;
  if (showTime) {
    _dateTime += " " + hours + ":" + mins + ":" + second;
  }
  return _dateTime;
}
/**
 * 获取图片名称
 * @returns {string}
 */
export function getImgName(url) {
  if( typeof url !='string' ) return '' ;
  url = url.split('/');
  return url[url.length-1];
}
/**
 * 获取当前时间
 * @returns {string}
 */
export function getNowTime() {
  const strDate = new Date();
  let strYear = strDate.getFullYear(), strMonth = strDate.getMonth() + 1, strDay = strDate.getDate();
  strMonth < 10 && (strMonth = "0" + strMonth);
  strDay < 10 && (strDay = "0" + strDay);
  return strYear + '-' + strMonth + '-' + strDay
}
export function getKeys(obj){
  let keys = [];
  for(var i in obj){
    keys.push(i);
  }
  return keys;
}
/**
 * 获取ojbect某个属性为true的数量
 * @return number
 */

/**
 * 获取菜单默认key
 * @return number
 */
export function getMenuKey(name, isR = true) {

  let key = sessionStorage.getItem(name);
  if (key && isR) sessionStorage.removeItem(name);
  return key || 1
}
/**
 * 跳转相对Url
 * @returns string
 */
 export function jumpUrl(props,url) {
   let {history} = props;
   url = url || '';
   var jump = getRoute('/#/', '?');
   history.replace(jump+url);
   return false;
 }
/**
 * 获取路径
 * @returns string
 */
export function getRoute(start, end) {
  let href = window.location.href;
  href = href.split(start);
  if (href[1])
    return href[1].split(end)[0];
  return;
}
/**
 * 获取筛选条件
 * @return object
 */
export function getScreen(sign = '', is = false) {
  var name = getRoute('/#/', '?');
  if (!name) return {};
  var vals = sessionStorage.getItem(name + sign);
  if (!vals) {
    if (!is) sessionStorage.clear();
    return {};
  }
  return JSON.parse(vals);
}
/**
 * 设备筛选条件
 * @param object
 */
export function setScreen(vals, sign = '') {
  var name = getRoute('/#/', '?');
  if (!name) return;
  if (typeof vals != "object") return;
  sessionStorage.setItem(name + sign, JSON.stringify(vals));
}
/**
 * 页面加载时初始化筛选条件
 * @return object
 */
export function initScreen(d) {
  d = d || {};
  d.data = d.data || {};
  d.pageSize = d.pageSize || 10;
  var vals = getScreen(d.sign);

  for (var i in d.data) {
    if (vals[i]) continue;
    vals[i] = d.data[i];
  }
  return Object.assign({
    pageNum: vals.pageNum || 1,
    pageSize: vals.pageSize || d.pageSize,
  }, vals);
}
/**
 * 清空记录 或单个记录
 * @return object
 */
export function clearScreen(sign) {
  var name = getRoute('/#/', '?');
  if (sign) {
    sessionStorage.removeItem(name + sign);
    return;
  }
  sessionStorage.clear();
}
/**
 * 页面加载时多个页面初始化筛选条件
 * @return object
 */
export function initManyScreen(files) {
  let obj = {},
    is, vals
    ;
  files.map(function (name) {
    vals = getScreen(name, true);
    if (vals) is = true;

    obj[name] = Object.assign({
      pageNum: vals.pageNum || 1,
      pageSize: vals.pageSize || 10
    }, vals);
  });

  if (!is) sessionStorage.clear();
  return obj;
}

/**
 * 判断字符串长度（区分中文和英文）
 * @return object
 */
export function strlen(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    }
    else {
      len += 2;
    }
  }
  return len;
}
