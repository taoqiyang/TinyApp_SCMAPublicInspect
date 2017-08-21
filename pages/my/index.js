// index.js
const baseConfs = require('../../configs')


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
    console.log("onLoad")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.data.user && getApp().globalData.userInfo) {
      this.setData({
        user: getApp().globalData.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
  },

  go2Login: function () {
    wx.navigateTo({
      url: '../user/login/login'
    })
  },

  logout: function() {
    getApp().globalData.userInfo = null
    // wx.reLaunch({
    //   url: '../main/index'
    // })
    this.setData({
      user: null
    })
  }
})