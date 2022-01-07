
const util = require("wxmini_common_js").util
const goPageUtil = require('../../utils/goPage.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  getOrderIdByCode: function(){
    var currentPage = this
    currentPage.setData({
      orderIdFromCode: ""
    })
    wx.scanCode({
      onlyFromCamera: false,
      success: function(res){
        currentPage.setData({
          orderIdFromCode: res.result 
        })
        currentPage.getOrder()
      },
      fail: function(){
        wx.showToast({
          title: '扫码失败',
        })
      }
    })
  },

  getOrder: function(){
    var id = this.data.orderIdFromCode
    if(!util.objectUtil.verifyValidObject(id)){
      return util.showToast("缺少订单ID")
    }
    var oRegUrl = new RegExp(); 
    oRegUrl.compile("^30[0-9]+$");
      if (!oRegUrl.test(id)) {
        wx.showToast({
          title: '订单ID格式错误',
        })
        return false;
      }
    goPageUtil.goPage.goOrderDetail("?id=" + id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initPage(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})