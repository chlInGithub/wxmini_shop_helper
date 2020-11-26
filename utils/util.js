const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var initPage = function(that){
  var globalData = getApp().globalData
  that.setData(globalData)

  wx.setNavigationBarTitle({
    title: globalData.shopName
  })
  wx.setNavigationBarColor(
    {
      frontColor: globalData.ngFrontColor,
      backgroundColor: globalData.ngbgColor
    }
  )
  // 不生效
  /**wx.setBackgroundColor({
    backgroundColor: globalData.bgColor
  })**/
}

const EventUtil = {
  getParaFromEvent: function(event, name, must) {
    var id = event.currentTarget.dataset[name]
    if (StringUtil.isNotEmpty(id)) {
      return id
    }
    if (must) {
      wx.showToast({
        title: '缺少' + name,
      })
      throw new Error()
    }
  },
  getIndex: function(event) {
    var id = event.currentTarget.dataset.index
    if (StringUtil.isNotEmpty(id)) {
      return id
    }
    wx.showToast({
      title: '缺少Index',
    })
    throw new Error()
  },
  getId: function(event) {
    var id = event.currentTarget.dataset.id
    if (StringUtil.isNotEmpty(id)) {
      return id
    }
    wx.showToast({
      title: '缺少ID',
    })
    throw new Error()
  }
}

const ArrayUtil = {
  isArray: function (v) {
    if(!ObjectUtil.verifyValidObject(v)){
      return false
    }
    return Array.isArray(v)
  },
  getEleByIndex: function(arrays, index) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(index)){
      return
    }
    var ele = arrays[index]
    return ele
  },
  delEleByIndex: function(arrays, index) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(index)){
      return
    }
    var ele = arrays[index]
    arrays.splice(index, 1)
    return ele
  },
  getEleById: function(arrays, id) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(id)){
      return
    }
    var ele = arrays.find((ele, index, arrays) => ele.id == id)
    return ele
  },
  replaceEleById: function(arrays, newEle) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(newEle.id)){
      return
    }
    for (let index = 0; index < arrays.length; index++) {
      const element = arrays[index];
      if(element.id == newEle.id){
        arrays[index] = newEle
        return index
      }
    }
    return -1
  },
  addEle: function(arrays, ele) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(ele)){
      return
    }
    arrays.push(ele)
  },
  delEleById: function(arrays, id) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(id)){
      return
    }
    var eleIndex = -1
    var ele
    for (var i = 0; i < arrays.length; i++) {
      ele = arrays[i]
      if (ele.id == id) {
        eleIndex = i
        break
      }
    }

    if (eleIndex != -1) {
      arrays.splice(eleIndex, 1)
    }

    return ele
  }
}

const StringUtil = {

  isEmpty: function(str) {
    var r = undefined === str || "" === str || null === str
    return r
  },
  isNotEmpty: function(str) {
    var r = undefined !== str && "" !== str
    return r
  },
  abbreviatory: function(str, maxL) {
    if (!StringUtil.isEmpty(str) && str.length > (undefined == maxL ? 10 : maxL)) {
      return str.substring(0, 10) + '…'
    }
    return str
  },
  moneyDesc: function(money) {
    return "￥" + money + "元"
  },
  simplePrint: function(str) {
    if (StringUtil.isNotEmpty(str)) {
      return str
    }
    return '-'
  }
}


const ObjectUtil = {
  isNotUndefined: function(v) {
    return undefined !== v
  },
  isString: function (v) {
    return typeof v === 'string'
  },
  isUndefined: function(v) {
    return undefined === v
  },
  isFunction: function (v) {
    return ObjectUtil.verifyValidObject(v) &&  typeof v === 'function'
  },
  verifyValidObject: function(o) {
    return o !== null && o !== undefined && o !== "" && o !== "null" && o !== "undefined"
  }
}

const JsonUtil = {
  hasData: function(v){
    if(!ObjectUtil.verifyValidObject(v) || v == '[]'){
      return false
    }
    v = JsonUtil.toJson(v)
    for (var key in v) {
      if (ObjectUtil.verifyValidObject(v[key])){
        return true
      }
    }
    return false
  },
  toJson: function(v) {
    if(typeof v === 'string' && v.indexOf('{') != -1){
      return JSON.parse(v)
    }
    return v
  },
  /**
   * json key 的 数组，已安正序排序
   */
  getKeys: function (paramJson){
    var keys = []
    for (var k in paramJson) {
      keys.push(k)
    }

    keys.sort()

    return keys
  },
  /**
   * @param paramJson 数据的json形式
   * @param encode true表示对val进行URIEncode
   * key 排序，然后组织成用&间隔的参数串
   */
  toParamWithSortedKey: function (paramJson, encode){
    var keys = JsonUtil.getKeys(paramJson)
    var paraStr = ''
    var temp = []
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var val = paramJson[key]
      if(encode){
        val = encodeURIComponent(val)
      }
      var ele = key + '=' + val
      temp.push(ele)
    }

    if (temp.length > 0) {
      paraStr = temp.join("&")
    }

    return paraStr

  },
  /**
   * 组织成用&间隔的参数串
   */
  toParam: function(paramJson) {
    var paraStr = ''
    var temp = []
    for (var k in paramJson) {
      var v = paramJson[k]
      if (!StringUtil.isEmpty(v)) {
        var ele = k + "=" + v
        temp.push(ele)
      }
    }

    if(temp.length > 0){
      paraStr = temp.join("&")
    }

    return paraStr
  }
}

var showMsg = function(msg, callback) {
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    success: function (res) {
      if(ObjectUtil.isFunction(callback)){
        callback()
      }
    },
  })
}


var showToast = function (msg) {
  wx.showToast({
    title: msg,
    duration: 2000
  })
}

var getCurrentS = function () {
  return Math.floor(new Date().getTime() / 1000)
}

var replace4Spe = function(v){
  return v.replace(/[\\+]{1}/g, "==plus==")
}

module.exports = {
  formatTime: formatTime,
  eventUtil: EventUtil,
  arrayUtil: ArrayUtil,
  stringUtil: StringUtil,
  objectUtil: ObjectUtil,
  jsonUtil: JsonUtil,
  showMsg: showMsg,
  showToast: showToast,
  getCurrentS: getCurrentS,
  replace4Spe: replace4Spe,
  initPage: initPage
}