
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestDataUtil = require('../../utils/requestData.js')
const tokenUtil = require('../../utils/token.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: 18500425785
  },

  getMerchantIdByCode: function(){
    if(!util.objectUtil.verifyValidObject(this.data.mobile)){
      return util.showMsg("输入手机号")
    }
    var oRegUrl = new RegExp(); 
    oRegUrl.compile("^1[0-9]{10}$");
      if (!oRegUrl.test(this.data.mobile)) {
        return util.showMsg("输入手机号")
      }

    var currentPage = this
    currentPage.setData({
      merchantFromCode: ""
    })
    wx.scanCode({
      onlyFromCamera: false,
      success: function(res){
        currentPage.setData({
          merchantFromCode: res.result 
        })
        currentPage.verify()
      },
      fail: function(){
        wx.showToast({
          title: '扫码失败',
        })
      }
    })
  },

  verify: function(){
    var merchantFromCode = this.data.merchantFromCode
    if(!util.objectUtil.verifyValidObject(merchantFromCode)){
      return util.showToast("缺少信息")
    }
    
    requestDataUtil.getData.verifyShopMan(
      {
        merchant: merchantFromCode,
        mobile: this.data.mobile
      },
      function(data){
        console.log(data)
        wx.navigateBack()
      }
    )
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