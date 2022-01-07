//index.js
const util = require("wxmini_common_js").util
const goPageUtil = require('../utils/goPage.js')
const requestDataUtil = require('../utils/requestData.js')
const tokenUtil = require("wxmini_common_js").token

//获取应用实例
const app = getApp()

Page({
  data: {
    list: [
      {
          id: 'widget',
          name: '为商家赋能',
          open: false,
          pages: [
            {
              title: '近期订单',
              page: 'order'
            }, 
            {
              title: '订单快处理',
              page: 'orderFast'
            },
          ],
          open: true
      }
    ],
    progressText: "正在努力打开页面……"
  },
  showBYCode: function(){
    goPageUtil.goPage.goBYInfo()
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
        if (list[i].id == id) {
            list[i].open = !list[i].open
        } else {
            list[i].open = false
        }
    }
    this.setData({
        list: list
    });
  },
  onLoad: function () {
    util.initPage(this)
    // 登录系统 存储token
    this.deal()
  },
  onShow: function(){

  },
  deal: function(){
    var that = this

    tokenUtil.newToken(
      function (res) {
        requestDataUtil.getData.getShopSimpleInfo(
          function(){
            //goPageUtil.goPage.goCapacity()
          }
        )
      }, function () {
        util.showMsg("获取token失败", function () {
          goPageUtil.goPage.goIndex()
        })
      }
    )

  },
})
