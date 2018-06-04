// pages/main/map/keyword.js
const baseConfs = require('../../../configs')


let keyword

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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  bindInput: function (e) {
      keyword = e.detail.value
  },

  bindClick: function() {
    if(!keyword || keyword === ''){
      wx.showToast({
        title: "请输入关键字", 
        image: baseConfs.warnToastImage,
        duration: 1500
      });
      return;
    }
    wx.redirectTo({
      url: 'poi?title=找' + keyword + "&key=" + keyword,
    })
  },

  onUnload: function(){
    keyword = null;
  }
  
})