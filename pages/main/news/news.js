// news.js
const configs = require('../../../configs')
const pageSize = 10


var title
var newsTypeId = -1
var detailTitle
var hasMore = false;
var loading = false;

var getRequestUrl = function (newsTypeId, focus, page, pageSize) {
  var url = configs.newsList + "&pageSize=" + pageSize + "&page=" + page
  url += "&focusFlag=" + (focus ? 1 : 0)
  if (newsTypeId > 0) url += "&newsTypeId=" + newsTypeId
  return url
}

/**
   * {
   * beforLoad:function,
   * aflterLoad:function
   * }
   */
var loadData = function (that, params) {
  if (params && params.beforLoad) {
    params.beforLoad();
  }
  loading = true
  var self = that;
  wx.request({
    url: getRequestUrl(newsTypeId, true, 1, 5),
    success: function (res) {
      if (res.data.code == 0) {
        self.data.focusNewsList = parseNews(res.data.data).list
      }
    },
    complete: function (res) {
      wx.request({
        url: getRequestUrl(newsTypeId, false, 1, pageSize),
        success: function (res) {
          if (res.data.code == 0) {
            var result = parseNews(res.data.data)
            var list = result.list
            hasMore = list.length >= pageSize && result.totalCount > list.length
            self.data.newsList = list
          }
        },
        complete: function (res) {
          if (getApp().globalData.demo && self.data.newsList.length == 0) {
            self.data.newsList.push({
              id: 1,
              title: "测试新闻条目",
              detail: "据报道，我国已成为当世界第一大国.",
              pic: "/images/pic_news_default.jpg"
            })
          }
          if (params && params.afterLoad) {
            params.afterLoad();
          }
          loading = false
          self.setData({
            networking: self.data.networking,
            focusNewsList: self.data.focusNewsList,
            newsList: self.data.newsList
          })
        },
      })
    },
  })
}

var loadMore = function (that) {
  if (!hasMore || loading || !getApp().globalData.networking) {
    return
  }

  loading = true
  var self = that
  var page = that.data.newsList.length / pageSize + 1
  wx.request({
    url: getRequestUrl(newsTypeId, false, page, pageSize),
    success: function (res) {
      if (res.data.code == 0) {
        var result = parseNews(res.data.data)
        var list = result.list
        hasMore = list.length >= pageSize && result.totalCount > list.length + self.data.newsList.length
        self.data.newsList.push.apply(self.data.newsList, list)
        self.setData({
          newsList: self.data.newsList
        })
      }
    },
    complete: function (res) {
      loading = false
    },
  })
}

var parseNews = function (newsStr) {
  var result = JSON.parse(newsStr)
  var list = result.list
  for (var i = 0; i < list.length; i++) {
    var news = list[i]
    news.formatdetail = ""
    news.showSelfPic = news.pic && news.pic.length > 0
  }
  return result
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    networking: true,
    focusNewsList: [],
    newsList: [],
    newsPicPrefix: configs.newsPicUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.title) title = options.title
    if (options.newsTypeId) newsTypeId = options.newsTypeId
    if (options.detailTitle) {
      detailTitle = options.detailTitle
    } else {
      detailTitle = title
    }
    this.data.networking = getApp().globalData.networking;
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

  onReady: function () {
    if (title) {
      wx.setNavigationBarTitle({
        title: title
      })
    }
  },

  binderrorimg: function (e) {
    var focus = e.currentTarget.dataset.focus
    var index = e.currentTarget.dataset.index
    var newsItem
    if (focus) {
      newsItem = this.data.focusNewsList[index]
    } else {
      newsItem = this.data.newsList[index]
    }
    newsItem.showSelfPic = false
    this.setData({
      newsList: this.data.newsList
    })
  },


  go2NewsDetail: function (e) {
    var focus = e.currentTarget.dataset.focus
    var index = e.currentTarget.dataset.index
    var newsItem
    if (focus) {
      newsItem = this.data.focusNewsList[index]
    } else {
      newsItem = this.data.newsList[index]
    }
    wx.navigateTo({
      url: '../news_detail/news_detail?news=' + JSON.stringify(newsItem) + (detailTitle ? "&title=" + detailTitle : ""),
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
    loadMore(this)
  }
})