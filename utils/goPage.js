const util = require("./util.js")

var goPage = {
  goShopMan: function () {
    wx.redirectTo({
      url: '/pages/shopMan/shopMan'
    })
  },
  goIndex: function () {
    wx.redirectTo({
      url: '/pages/index'
    })
  },
  /**
   * param ( ?key=xx&key=xx...)
   */
  goOrderDetail: function (param) {
    if (util.objectUtil.isUndefined(param)) {
      return util.showToast("缺少参数")
    }
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail' + param
    })
  },
  goWXLogin: function () {
    wx.navigateTo({
      url: '/pages/wxLogin/wxLogin'
    })
  },
  checkLogin: function () {
    /* if (!util.objectUtil.verifyValidObject(getApp().globalData.shopMan) 
      || !util.objectUtil.verifyValidObject(getApp().globalData.shopMan.userId)
      || !util.objectUtil.verifyValidObject(getApp().globalData.shopMan.)) {
      return true
    } else {
      goPage.goWXLogin()
      return false
    } */
    return true
  },
  goUserInfo: function () {
    wx.navigateTo({
      url: '/pages/userInfo/userInfo'
    })
  },
}

module.exports = {
  goPage: goPage
}