// pages/order/order.js
const util = require('../../utils/util.js')
const goPageUtil = require('../../utils/goPage.js')
const requestDataUtil = require('../../utils/requestData.js')
const tokenUtil = require('../../utils/token.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: []
  },

  goOrderDetail: function(event){
    var id = util.eventUtil.getId(event)
    goPageUtil.goPage.goOrderDetail("?id=" + id)
  },
  getLastOrder: function(type){
    var that = this
    requestDataUtil.getData.getLastOrders(
      type,
      function(data){
        if(util.objectUtil.verifyValidObject(data)){
          that.setData(
            {
              orders: data.concat(that.data.orders)
            }
          ) 
        }
        
      },
      function(msg){

      }
    )
    if(type == 2){
      this.showWaitSecond(60)
    }
  },

  showWaitSecond: function(s){
    var that = this
    if(util.objectUtil.verifyValidObject(this.data.intervalId)){
      clearInterval(this.data.intervalId)
    }


    this.setData(
      {
        waitSecond: s
      }
    )
    var intervalId = setInterval(() => {
      if(that.data.waitSecond == 1){
        return clearInterval(that.data.intervalId)
      }
      that.setData(
        {
          waitSecond: that.data.waitSecond - 1
        }
      )
    }, 1000);
    this.setData(
      {
        intervalId: intervalId
      }
    )
  },

  refreshOrders: function(){
    if(util.objectUtil.verifyValidObject(this.data.refreshOrdersIntervalId)){
      return
    }

    // this.closeRefreshOrdersInterval()
    var that = this
    var refreshOrdersIntervalId = setInterval(
      function(){
        that.getLastOrder(2)
      },
      1000*60
    )
    this.showWaitSecond(60)
    this.setData(
      {
        refreshOrdersIntervalId: refreshOrdersIntervalId
      }
    )
  },
  closeRefreshOrdersInterval: function(){
    clearInterval(this.data.refreshOrdersIntervalId)
    this.setData(
      {
        refreshOrdersIntervalId: null
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initPage(this)
    this.getLastOrder(1)
    this.refreshOrders()
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
    this.refreshOrders()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.intervalId)
    this.closeRefreshOrdersInterval()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.intervalId)
    this.closeRefreshOrdersInterval()
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