const util = require("wxmini_common_js").util
const requestUtil = require("wxmini_common_js").request
const goPageUtil = require('./goPage.js')

var postData = {
  /**
   * 发货
   */
  sent: function (data, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }

    if(!util.objectUtil.verifyValidObject(data.orderId)){
      util.showMsg("缺少ID")
      return  false
    }
    
    if(!util.objectUtil.verifyValidObject(data.logisticsCP)){
      util.showMsg("缺少物流信息")
      return  false
    }
    
    if(!util.objectUtil.verifyValidObject(data.logisticsNo)){
      util.showMsg("缺少物流信息")
      return  false
    }

    requestUtil.request({
      url: "/wmall/shopman/order/sent",
      data: data,
      method: 'POST',
      successCallBack: function (result) {
        util.showToast("发货成功!")
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(result)
        }
      },
      failCallBack: function (m) {
        util.showMsg("发货失败!" + m)
          if (util.objectUtil.isFunction(failCallback)) {
            failCallback(m)
          }
      }
    })
  },
  /**
   * 确认线下已支付
   */
  confirmOfflinePayed: function (data, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }

    if(!util.objectUtil.verifyValidObject(data.orderId)){
      util.showMsg("缺少ID")
      return  false
    }
    
    requestUtil.request({
      url: "/wmall/shopman/order/offlinePayed",
      data: data,
      method: 'POST',
      successCallBack: function (result) {
        util.showToast("成功!")
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(result)
        }
      },
      failCallBack: function (m) {
        util.showMsg("失败!" + m)
          if (util.objectUtil.isFunction(failCallback)) {
            failCallback(m)
          }
      }
    })
  },
  /**
   * 确认可以自提
  */
  confirmOfflineCanTake: function (data, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }

    if(!util.objectUtil.verifyValidObject(data.orderId)){
      util.showMsg("缺少ID")
      return  false
    }
    
    requestUtil.request({
      url: "/wmall/shopman/order/cantake",
      data: data,
      method: 'POST',
      successCallBack: function (result) {
        util.showToast("成功!")
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(result)
        }
      },
      failCallBack: function (m) {
        util.showMsg("失败!" + m)
          if (util.objectUtil.isFunction(failCallback)) {
            failCallback(m)
          }
      }
    })
  },
   /**
   * 确认已经自提
   */ 
  confirmOfflineTaken: function (data, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }

    if(!util.objectUtil.verifyValidObject(data.orderId)){
      util.showMsg("缺少ID")
      return  false
    }
    
    requestUtil.request({
      url: "/wmall/shopman/order/taken",
      data: data,
      method: 'POST',
      successCallBack: function (result) {
        util.showToast("成功!")
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(result)
        }
      },
      failCallBack: function (m) {
        util.showMsg("失败!" + m)
          if (util.objectUtil.isFunction(failCallback)) {
            failCallback(m)
          }
      }
    })
  },
  /**
   * 同意退款
   */
  confirmRefund: function (data, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }

    if(!util.objectUtil.verifyValidObject(data.orderId) || !util.objectUtil.verifyValidObject(data.refundId)){
      util.showMsg("缺少ID")
      return  false
    }
    
    requestUtil.request({
      url: "/wmall/shopman/order/okRefund",
      data: data,
      method: 'POST',
      successCallBack: function (result) {
        util.showToast("成功!")
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(result)
        }
      },
      failCallBack: function (m) {
        util.showMsg("失败!" + m)
          if (util.objectUtil.isFunction(failCallback)) {
            failCallback(m)
          }
      }
    })
  },
  /**
   * 拒绝退款
   */
  refuseRefund: function (data, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }

    if(!util.objectUtil.verifyValidObject(data.orderId) || !util.objectUtil.verifyValidObject(data.refundId)){
      util.showMsg("缺少ID")
      return  false
    }
    
    requestUtil.request({
      url: "/wmall/shopman/order/refuseRefund",
      data: data,
      method: 'POST',
      successCallBack: function (result) {
        util.showToast("成功!")
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(result)
        }
      },
      failCallBack: function (m) {
        util.showMsg("失败!" + m)
          if (util.objectUtil.isFunction(failCallback)) {
            failCallback(m)
          }
      }
    })
  },
  /**
   * 选择并上传图片
   */
  chooseAndupdateImg: function(data, sucCallBack, failCallBack){
    wx.chooseImage({
      count: 1,
      success (res) {
        const tempFilePaths = res.tempFilePaths
        var filePath = tempFilePaths[0]
        wx.getImageInfo({
          src: filePath,
          success(res){
            if(res.width > data.width || res.height > data.height){
              util.showMsg("图片尺寸不可大于" + data.width + "*" + data.height)
              return false
            }else{
              wx.uploadFile({
                url: getApp().globalData.uploadPrefix + '/wmall/qrcode/upload', 
                filePath: tempFilePaths[0],
                name: 'file',
                formData: {
                  "token": getApp().globalData.token,
                  "sessionId": getApp().globalData.sessionId,
                  "v": 2,
                  "t": Math.floor(new Date().getTime() / 1000),
                  "appId": getApp().globalData.appId
                },
                success (res){
                  var resultStr = JSON.stringify(res)
                  res.data = JSON.parse(res.data)
                  if (res.data.s) {
                    if (util.objectUtil.isString(res.data.d)){
                      if (res.data.d == '[]'){
                        res.data.d = []
                      }
                      res.data.d = util.jsonUtil.toJson(res.data.d)
                    }
                    if(util.objectUtil.isFunction(sucCallBack)){
                      sucCallBack(res.data.d)
                    }else{
                      util.showToast("上传图片成功")
                    }
                    
                  } else {
                    if (resultStr.indexOf("未登录") !== -1) {
                      wx.showModal({
                        title: '提示',
                        content: '登录失效',
                        success(res) {
                          if (res.confirm) {
                            goPageUtil.goPage.goIndex()
                          }
                        }
                      })
      
                      return
                    }
      
                    var msg = res.data
                    if (util.objectUtil.isNotUndefined(res.data.m)) {
                      msg = res.data.m
                    } else if (util.objectUtil.isNotUndefined(res.data.message)){
                      msg = res.data.message
                    }
                    if(util.objectUtil.isFunction(failCallBack)){
                      failCallBack(msg)
                    }else{
                      util.showToast("上传图片失败。" + msg)
                    }
                    
                  }
                },
                fail (res){
                  var resultStr = JSON.stringify(res)
                  if (resultStr.indexOf("未登录") !== -1) {
                    wx.showModal({
                      title: '提示',
                      content: '登录失效',
                      success(res) {
                        if (res.confirm) {
                          goPageUtil.goPage.goIndex()
                        }
                      }
                    })
      
                    return
                  }
                  if(util.objectUtil.isFunction(failCallBack)){
                    failCallBack(resultStr)
                  }else{
                    util.showToast("上传图片失败。" + resultStr)
                  }
                }
              })
            }
          }
        })
      }
    })
  }
}
var getData = {
  verifyShopMan: function (data, sucCallback, failCallback) {
    var checkResult = goPageUtil.goPage.checkLogin()
    if (!checkResult) {
      return
    }

    if(!util.objectUtil.verifyValidObject(data.merchant)){
      util.showMsg("缺少信息")
      return  false
    }
    
    requestUtil.request({
      url: "/wmall/shopman/verify",
      data: data,
      method: 'POST',
      successCallBack: function (result) {
        util.showToast("成功!")
        if (util.objectUtil.isFunction(sucCallback)) {
          return sucCallback(result)
        }
      },
      failCallBack: function (m) {
        util.showMsg("失败!" + m)
          if (util.objectUtil.isFunction(failCallback)) {
            return failCallback(m)
          }
      }
    })
  },
  /**
   * 近期订单
   * @param type 1:近1小时 2:近1分钟
   */
  getLastOrders: function (type, sucCallback, failCallback) {
    /* var result = {"c":27,"d":"[{\"canRefund\":false,\"createTime\":\"2020-10-19 15:33:42\",\"id\":\"302010191533411017\",\"payVO\":{\"id\":\"322010191533411020\",\"status\":0,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":94.90,\"status\":20,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104944216\",\"itemImg\":\"c7dfa2c76e005a72f341dd080e727153\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983\",\"presell\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"price\":99.90,\"skuId\":\"2120042113355210004\",\"skuTitle\":\"sku\u6807\u98980\",\"totalFee\":99.90}],\"totalFee\":99.90},{\"canRefund\":false,\"createTime\":\"2020-10-19 15:31:39\",\"id\":\"302010191531401001\",\"payVO\":{\"id\":\"322010191531401004\",\"status\":0,\"type\":2,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":94.90,\"status\":10,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104944216\",\"itemImg\":\"c7dfa2c76e005a72f341dd080e727153\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983\",\"presell\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"price\":99.90,\"skuId\":\"2120042113355210004\",\"skuTitle\":\"sku\u6807\u98980\",\"totalFee\":99.90}],\"totalFee\":99.90},{\"canRefund\":false,\"createTime\":\"2020-10-19 15:28:07\",\"id\":\"302010191528071013\",\"payVO\":{\"id\":\"322010191528071016\",\"status\":0,\"type\":2,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":94.90,\"status\":30,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104944216\",\"itemImg\":\"c7dfa2c76e005a72f341dd080e727153\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983\",\"presell\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"price\":99.90,\"skuId\":\"2120042113355210004\",\"skuTitle\":\"sku\u6807\u98980\",\"totalFee\":99.90}],\"totalFee\":99.90},{\"canRefund\":false,\"createTime\":\"2020-10-19 15:24:17\",\"id\":\"302010191524171009\",\"payVO\":{\"id\":\"322010191524171012\",\"status\":0,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":94.90,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104944216\",\"itemImg\":\"c7dfa2c76e005a72f341dd080e727153\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983\",\"presell\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"price\":99.90,\"skuId\":\"2120042113355210004\",\"skuTitle\":\"sku\u6807\u98980\",\"totalFee\":99.90}],\"totalFee\":99.90},{\"canRefund\":false,\"createTime\":\"2020-10-19 11:42:28\",\"id\":\"302010191142281001\",\"payVO\":{\"id\":\"322010191142281004\",\"status\":0,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":99.90,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104944618\",\"itemImg\":\"6e32183feefdc058ebe458c8e1a0e6d4\",\"itemTitle\":\"\u7EFF\u547C\u5438\u53E3\u7F69\u4E00\u6B21\u6027\u4E09\u5C42\u9632\u62A4\u9632\u5C18\u900F\u6C14\u7194\u55B7\u5E03\u8FC7\",\"presell\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"price\":99.90,\"skuId\":\"2120042113374110010\",\"skuTitle\":\"\u547C\u5438\u53E3\u7F69\u4E00\u6B21\u6027\",\"totalFee\":99.90}],\"totalFee\":99.90},{\"canRefund\":false,\"createTime\":\"2020-10-15 14:31:43\",\"id\":\"302010151431421017\",\"payVO\":{\"id\":\"322010151431421020\",\"status\":0,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":18.90,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020200318204536090\",\"itemImg\":\"e3802774584055a620981a1cd8ec9b2d\",\"itemTitle\":\"\u5F97\u5B9D\u5377\u7EB8\u65E0\u9999\u538B\u82B14\u5C42160\u514B\u6709\u82AF\u536B\u751F\u7EB8\",\"presell\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"price\":18.90,\"skuId\":\"2120042113380410013\",\"skuTitle\":\"\u65E0\u9999\u538B\u82B14\u5C42160\u514B\",\"totalFee\":18.90}],\"totalFee\":18.90},{\"canRefund\":false,\"createTime\":\"2020-10-15 14:27:07\",\"id\":\"302010151427071005\",\"payVO\":{\"id\":\"322010151427071008\",\"status\":0,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":99.90,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104944618\",\"itemImg\":\"6e32183feefdc058ebe458c8e1a0e6d4\",\"itemTitle\":\"\u7EFF\u547C\u5438\u53E3\u7F69\u4E00\u6B21\u6027\u4E09\u5C42\u9632\u62A4\u9632\u5C18\u900F\u6C14\u7194\u55B7\u5E03\u8FC7\",\"presell\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"price\":99.90,\"skuId\":\"2120042113374110010\",\"skuTitle\":\"\u547C\u5438\u53E3\u7F69\u4E00\u6B21\u6027\",\"totalFee\":99.90}],\"totalFee\":99.90},{\"canRefund\":false,\"createTime\":\"2020-10-15 14:23:50\",\"id\":\"302010151423491001\",\"payVO\":{\"id\":\"322010151423491004\",\"status\":0,\"type\":0,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":94.90,\"status\":50,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104944216\",\"itemImg\":\"c7dfa2c76e005a72f341dd080e727153\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983\",\"presell\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"price\":99.90,\"skuId\":\"2120042113355210004\",\"skuTitle\":\"sku\u6807\u98980\",\"totalFee\":99.90}],\"totalFee\":99.90}]","draw":0,"pageIndex":0,"s":true}
    sucCallback(util.jsonUtil.toJson(result.d)) */
    requestUtil.request({
      url: "/wmall/shopman/order/getLastOrders",
      data: {
        type: type
      },
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取近期订单失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  getOrder: function (id, sucCallback, failCallback) {
    var data = this.getLastOrders()[0]
    sucCallback(data)
    /* if(!util.objectUtil.verifyValidObject(id)){
      util.showMsg("参数错误")
      return false
    }
    // cache
    var cacheKey = 'smartCode' + id
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(sucCallback)) {
        sucCallback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/master/getOrder",
      data: {
        id: id
      },
      method: 'GET',
      successCallBack: function (data) {
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取订单失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    }) */
  },
  getOrderDetail: function (id, sucCallback, failCallback) {
    var result = {"d":"{\"canRefund\":false,\"coupons\":[{\"desc\":\"\u4F18\u60E0\u5238\u6D4B\u8BD51\",\"discount\":\"5.00\"}],\"createTime\":\"2020-10-19 15:33:42\",\"deliverVO\":{\"address\":\"\u8DEF\u53E3\u4E86\",\"city\":\"\u5317\u4EAC\u5E02 \u5317\u4EAC\u5E02 \u4E1C\u57CE\u533A\",\"freight\":0.00,\"mobile\":\"15854245624\",\"name\":\"\u770B\u4E86\",\"typeDesc\":\"\u81EA\u63D0\",\"type\":\"1\"},\"id\":\"302010191533411017\",\"payVO\":{\"id\":\"322010191533411020\",\"status\":0,\"type\":2,\"typeDesc\":\"\u5FAE\u4FE1\u652F\u4ED8\"},\"realFee\":94.90,\"status\":20,\"statusDes\":\"\u4EA4\u6613\u5173\u95ED\",\"subOrderVOS\":[{\"count\":1,\"itemId\":\"2020191111104944216\",\"itemImg\":\"c7dfa2c76e005a72f341dd080e727153\",\"itemTitle\":\"\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u9898\u5546\u54C1\u6807\u98983\",\"presell\":\"{\\\"endTime\\\":\\\"2021-09-18 19:50:47\\\",\\\"minCount\\\":100,\\\"sentTime\\\":\\\"2021-11-25 22:50:31\\\"}\",\"price\":99.90,\"skuId\":\"2120042113355210004\",\"skuTitle\":\"sku\u6807\u98980\",\"totalFee\":99.90}],\"totalFee\":99.90}","s":true}
    sucCallback(util.jsonUtil.toJson(result.d))
    if(!util.objectUtil.verifyValidObject(id)){
      util.showMsg("参数错误")
      return false
    }
    // cache
    var cacheKey = 'orderDetail' + id
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if (util.objectUtil.isFunction(sucCallback)) {
        sucCallback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/shopman/order/detail",
      data: {
        id: id
      },
      method: 'GET',
      successCallBack: function (data) {
        getApp().addCache(cacheKey, data, 10)
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function (m) {
        util.showMsg("获取订单详情失败!" + m)
        if (util.objectUtil.isFunction(failCallback)) {
          failCallback(data)
        }
      }
    })
  },
  getShopSimpleInfo: function(sucCallback) {
    // cache
    var cache = getApp().globalData.simple
    if (util.objectUtil.verifyValidObject(cache)) {
      if(util.objectUtil.isFunction(sucCallback)){
        sucCallback()
      }
      return
    }

    requestUtil.request({
      url: "/wmall/shop/simple",
      data: {},
      method: 'POST',
      successCallBack: function(data){
        getApp().globalData.simple = data
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback()
        }
      },
      failCallBack: function(m){
        util.showMsg("获取店铺信息失败!" + m)
      }
    })
  },
  getBYImg: function(sucCallback) {
    // cache
    var cacheKey = 'bySiteImg'
    var cache = getApp().getCache(cacheKey)
    if (util.objectUtil.verifyValidObject(cache)) {
      if(util.objectUtil.isFunction(sucCallback)){
        sucCallback(cache)
      }
      return
    }

    requestUtil.request({
      url: "/wmall/qrcode/by",
      data: {},
      method: 'GET',
      successCallBack: function(data){
        if (util.jsonUtil.hasData(data)) {
          getApp().addCache(cacheKey, data)
        }
        if (util.objectUtil.isFunction(sucCallback)) {
          sucCallback(data)
        }
      },
      failCallBack: function(m){
        util.showMsg("获取博予科技二维码失败!")
      }
    })
  },
}

module.exports = {
  postData: postData,
  getData: getData
}