// notice.js

const configs = require('../../../configs')
const pageSize = 10

var util = require('../../../utils/util.js')


var title
var noticeTypeId = -1
var hasMore = false
var loading = false

var loadData = function (that, params) {
  if (params && params.beforLoad) {
    params.beforLoad();
  }
  loading = true
  var self = that;
  var pullRefresh = params && params.pullRefresh
  var page = pullRefresh ? 1 : (that.data.noticeList.length / pageSize + 1)
  wx.request({
    url: configs.noticeList + "&noticeTypeId=" + noticeTypeId + "&page=" + page + "&pageSize=" + pageSize,
    success: function (res) {
      if (res.data.code == 0) {
        if(pullRefresh){
          self.data.noticeList = []
        }
        var result = parseNotice(res.data.data)
        var list = result.list
        hasMore = list.length >= pageSize && result.totalCount > list.length + self.data.noticeList.length
        self.data.noticeList.push.apply(self.data.noticeList, list)
        if(page > 1 || pullRefresh){//load more or pull refresh
          self.setData({
            noticeList: self.data.noticeList
          })
        }
      }
    },

    fail: function (res) {
      if(pullRefresh){
        wx.showToast({
          title: configs.networkErrorText,
          image: configs.errorToastImage,
          duration: 1000
        })
      }
    },
    complete: function (res) {
      if (params && params.afterLoad) {
        params.afterLoad();
      }
      loading = false
      if(page == 1 && !pullRefresh){// onLoad
        self.setData({
          networking: getApp().globalData.networking,
          noticeList: self.data.noticeList
        })
      }
    },
  })
}

var parseNotice = function(noticeListStr) {
  var result = JSON.parse(noticeListStr)
  var list = result.list || []
  list.map(function(notice){
    notice.formatdetail = ""
    notice.publishTime = util.formatTime(new Date(notice.publishTime))
  })
  // for(var i = 0;i < list.length; i++){
  //   list[i].formatdetail = ""
  // }
  return result
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    networking: true,
    noticeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.title) title = options.title
    if (options.noticeTypeId) noticeTypeId = options.noticeTypeId
    loadData(this, {
      beforLoad: function () {
        wx.showLoading({
          title: configs.loadingText,
          mask: true
        })
      },
      afterLoad: function () {
        wx.hideLoading()
      }
    }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: title ? title : "公告通知"
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (!getApp().globalData.networking) {
      wx.stopPullDownRefresh()
      wx.showToast({
        title: configs.pullRefreshNoNetworkText,
        image: configs.errorToastImage,
        duration: 1000
      })
      return
    }
    loadData(this, {
      pullRefresh: true,
      afterLoad: function () {
        wx.stopPullDownRefresh()
      }
    }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!hasMore || loading || !getApp().globalData.networking) {
      return
    }
    
    loadData()
  }
})