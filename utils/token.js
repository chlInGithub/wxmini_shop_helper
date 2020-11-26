const util = require("./util.js")
const goPageUtil = require("./goPage.js")
const requestUtil = require("./request.js")

var getCurrentS = function(){
  return util.getCurrentS()
}

var newToken = function(successCallBack, failCallBack) {
  // get from local
  const app = getApp()
  // 打开小程序 复用上次的local token；如果出现登录超时，则重新进入index，非重新打开app，则不使用local token。
  var key = app.globalData.appId + "Token"
  if(app.globalData.hasUsedLocalToken != true){
    var tokenCache = app.getCache(key, true)
    if(util.objectUtil.verifyValidObject(tokenCache)){
      app.globalData.expire = tokenCache.expire
      app.globalData.token = tokenCache.token
      app.globalData.sessionId = tokenCache.sessionId
      app.globalData.hasUsedLocalToken = true
    }

    // check has token
    if (util.objectUtil.verifyValidObject(getApp().globalData.expire) &&
      util.objectUtil.verifyValidObject(getApp().globalData.token) &&
      util.objectUtil.verifyValidObject(getApp().globalData.sessionId) &&
      getApp().globalData.expire > getCurrentS()) {
      return successCallBack()
    }
  }else{
    getApp().delCache(key, true)
  }

  var sucCall = function(d) {
    console.log(d)
    console.log("sucCall")

    // 检查token数据
    if (!util.objectUtil.verifyValidObject(d.expire) || !util.objectUtil.verifyValidObject(d.token) ||
      !util.objectUtil.verifyValidObject(d.sessionId) || getCurrentS() > d.expire) {
        getApp().delCache(key, true)
      util.showMsg("token错误")
      return false
    }
    // 存储token等
    getApp().globalData.expire = d.expire
    getApp().globalData.token = d.token
    getApp().globalData.sessionId = d.sessionId

    getApp().addCache(key, d, null, true)

    return successCallBack()
  }
  var failCall = function(res) {
    console.log(res)
    console.log("failCall")
    return failCallBack(res)
  }
  wx.login({
    success: res => {
      //console.log(res)
      var code = res.code
      getApp().globalData.loginCode = code
      //console.log("globalData : " + getApp().globalData)

      var data = {
        shopId: getApp().globalData.shopId,
        tId: getApp().globalData.tId,
        appId: getApp().globalData.appId,
        requestDomain: getApp().globalData.requestDomain,
        code: code
      }

      requestUtil.request({
        url: "/wmall/token/newToken",
        data: data,
        method: 'POST',
        successCallBack: sucCall,
        failCallBack: failCall
      })
    }
  })
}

module.exports = {
  newToken: newToken
}