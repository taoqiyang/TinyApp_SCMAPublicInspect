// news_detail.js
const newsPicPrefix = require('../../../configs').newsPicUrl

var title

Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.title) title = options.title
    var news = JSON.parse(options.news)
    if(news.showSelfPic){
      news.pic = newsPicPrefix + news.pic
    }else{
      news.pic = "/images/pic_news_default.jpg"
    }
    this.setData({
      news: news
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(title){
      wx.setNavigationBarTitle({
        title: title,
      })
    }
  }
})