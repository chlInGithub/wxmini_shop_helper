// pages/orderDetail/orderDetail.js
const util = require("wxmini_common_js").util
const requestDataUtil = require('../../utils/requestData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logisticsCp: "",
    logisticsNo: ""
  },
  sent: function(){
    if (!util.objectUtil.verifyValidObject(this.data.logisticsCp) || !util.objectUtil.verifyValidObject(this.data.logisticsNo)){
      util.showMsg("请填写配送信息")
      return
    }

    var data = {
      logisticsCP: this.data.logisticsCp,
      logisticsNo: this.data.logisticsNo,
      orderId: this.data.detail.id
    }

    var that = this
    util.showMsg("确认运单号" + data.logisticsNo, 
      function(){
        requestDataUtil.postData.sent(
          data,
          function(data){
            that.showSent()
            that.data.detail.status = 30
            that.data.detail.statusDes = "待收货"
            that.setData({
              detail: that.data.detail
            })
          }
        )
      },
      true
    )

  },
  showSent: function(event){
    this.setData({
      logisticsCp: "",
      logisticsNo: ""
    })
    var t = this.selectComponent(".sentModal")
    t.triggleModal()
  },
  /**
   * 确认 已经线下付款
   * @param {*} event 
   */
  confirmOfflinePayed: function (event) {
    var id = this.data.detail.id
    var that = this
    util.showMsg("确认已经线下付款？", function(){
      requestDataUtil.postData.confirmOfflinePayed(
        {orderId:id},
        function (data) {
          that.data.detail.status = 20
          that.data.detail.statusDes = "待发货"
          that.setData({
            detail: that.data.detail
          })
        }
      )
    },
    true
    )

  },
  /**
   * 确认 已经线下自提
   * @param {*} event 
   */
  confirmOfflineTaken: function (event) {
    var id = this.data.detail.id
    var that = this
    util.showMsg("确认已经自提？", function(){
      requestDataUtil.postData.confirmOfflineTaken(
        {orderId:id},
        function (data) {
          that.data.detail.status = 40
          that.data.detail.statusDes = "交易完成"
          that.setData({
            detail: that.data.detail
          })
        }
      )
    },
    true
    )

  },
  /**
   * 确认 线下可以自提
   * @param {*} event 
   */
  confirmOfflineCanTake: function (event) {
    var id = this.data.detail.id
    var that = this
    util.showMsg("确认可以自提？", function(){
      requestDataUtil.postData.confirmOfflineCanTake(
        {orderId:id},
        function (data) {
          that.data.detail.status = 30
          that.data.detail.statusDes = "可自提"
          that.setData({
            detail: that.data.detail
          })
        }
      )
    },
    true
    )
  },

  /**
   * 同意 退款
   * @param {*} event 
   */
  confirmRefund: function (event) {
    var id = this.data.detail.id
    var refundId = this.data.detail.refundVO.id
    var that = this
    util.showMsg("同意 退款？", function(){
      requestDataUtil.postData.confirmRefund(
        {orderId:id,refundId: refundId, note: "商家同意"},
        function (data) {
          that.data.detail.status = 61
          that.data.detail.statusDes = "退款处理中"
          that.setData({
            detail: that.data.detail
          })
        }
      )
    },
    true
    )
  },

  /**
   * 拒绝 退款
   * @param {*} event 
   */
  refuseRefund: function (event) {
    var id = this.data.detail.id
    var refundId = this.data.detail.refundVO.id
    var that = this
    util.showMsg("拒绝 退款？", function(){
      requestDataUtil.postData.refuseRefund(
        {orderId:id,refundId: refundId, note: "商家拒绝"},
        function (data) {
          that.data.detail.status = 63
          that.data.detail.statusDes = "退款关闭"
          that.setData({
            detail: that.data.detail
          })
        }
      )
    },
    true
    )
  },

  getOrderDetail: function(id){
    var that = this
    requestDataUtil.getData.getOrderDetail(
      id, 
      function(detail){
        var subOrderVOS = detail.subOrderVOS
        for (var i = 0; i < subOrderVOS.length; i++) {
          var subOrderVO = subOrderVOS[i]
          if (undefined != subOrderVO.presell) {
            console.log(subOrderVO.presell)
            subOrderVO.presell = util.jsonUtil.toJson(subOrderVO.presell)
          }
        }

        that.setData({
          detail: detail
        })
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initPage(this)

    var id = options.id
    if (!util.objectUtil.verifyValidObject(id)){
      wx:wx.showModal({
        title: '提示',
        content: '缺少订单ID',
        showCancel: false,
        success: function(res) {
          wx.navigateBack()
        }
      })
    }
    this.setData({
      id: id
    })
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
    this.getOrderDetail(this.data.id)
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