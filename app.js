//app.js
const util = require('utils/util.js')
const goPageUtil = require('utils/goPage.js')


App({
  onLaunch: function () {
    this.globalData.navBGColor = "#1761FA"
    this.globalData.bgColor = '#EEEEEE'
    this.globalData.requestUrlPrefix = "https://wmall.5jym.com"
    this.globalData.shopId = wx.getExtConfigSync().shopId,
    this.globalData.tId = wx.getExtConfigSync().tId,
    this.globalData.appId = wx.getExtConfigSync().appId
    this.globalData.imgPrefix = "https://" + this.globalData.appId + ".5jym.com/img/"
    this.globalData.uploadPrefix = "https://" + this.globalData.appId + ".5jym.com"
    //this.globalData.shopImg = this.globalData.imgPrefix + wx.getExtConfigSync().shopImg
    this.globalData.shopImg = this.globalData.imgPrefix + "26f41f40ce4789f87648eebf90579df4"
    this.globalData.appName = "博予.掌柜"


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  setLoginCode: function (loginCode) {
    this.globalData.loginCode = loginCode
    console.log("globalData : " + this.globalData)
  },
  globalData: {
    userInfo: null
  },

  /**
   * k: key
   * o: 数据
   * s: 超时相对秒数， 默认3600秒
   * l: use storage
   */
  addCache: function(k, o, s, l){
    if(util.objectUtil.verifyValidObject(l) && l == true){
      wx.setStorageSync(k + "", o)
      return;
    }

    if (util.objectUtil.isUndefined(this.globalData.cache)) {
      this.globalData['cache'] = {}
    }

    if (!util.objectUtil.verifyValidObject(k) || !util.objectUtil.verifyValidObject(o)){
      return
    }

    if (!util.objectUtil.verifyValidObject(s)) {
      s = 3600
    }

    var val = {
      data: o,
      expire: util.getCurrentS() + s
    }

    this.globalData['cache'][k] = val
  },
  delCache: function(k, l){
    if(util.objectUtil.verifyValidObject(l) && l == true){
      wx.removeStorageSync(k + "")
      return;
    }

    if (util.objectUtil.isUndefined(this.globalData.cache) || util.objectUtil.isUndefined(this.globalData.cache[k])) {
      return
    }
    this.globalData.cache[k] = undefined
  },
  getCache: function(k, l){
    if(util.objectUtil.verifyValidObject(l) && l == true){
      return wx.getStorageSync(k + "")
    }

    if (util.objectUtil.isUndefined(this.globalData.cache) || util.objectUtil.isUndefined(this.globalData.cache[k])){
      return undefined
    }
    // 取key对应val
    var val = this.globalData.cache[k]
    // 比对超时
    if (util.getCurrentS() > val.expire){
      return undefined
    }
    // 结果
    return val.data
  }
})