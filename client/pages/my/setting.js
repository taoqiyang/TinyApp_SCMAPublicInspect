// pages/my/setting.js
const configs = require('../../configs.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mediaDisplayMode: configs.mediaDisplayMode,
      mediaList: [
        {
          mediaID: 0,
          mediaPath: '../../images/pic_news_default.jpg'
        },
        {
          mediaID: 1,
          mediaPath: '../../images/pic_news_default.jpg'
        },
        {
          mediaID: 2,
          mediaPath: '../../images/pic_news_default.jpg'
        },
        {
          mediaID: 3,
          mediaPath: '../../images/pic_news_default.jpg'
        },
        {
          mediaID: 4,
          mediaPath: '../../images/pic_news_default.jpg'
        },
        {
          mediaID: 5,
          mediaPath: '../../images/pic_news_default.jpg'
        }
      ]
    })
  },

  mediaDisplayModeRadioChange: function(e){
    let value = e.detail.value
    if (value === this.data.mediaDisplayMode){
      return;
    }

    configs.mediaDisplayMode = value
    wx.setStorage({
      key: 'mediaDisplayMode',
      data: value,
    })

    this.setData({
      mediaDisplayMode: value
    })
  }

})