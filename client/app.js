//app.js
let baseConfig = require('configs')
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    var self = this

    wx.getNetworkType({
      success: function(res) {
        self.globalData.networking = res.networkType != 'none';
        self.globalData.networkType = res.networkType;
      }
    })
     
    wx.onNetworkStatusChange(function(res){
      self.globalData.networking = res.isConnected;
      self.globalData.networkType = res.networkType;
    })

    wx.getStorage({
      key: 'mediaDisplayMode',
      success: function(res) {
        if(!res || !res.data){
          return;
        }
        baseConfig.mediaDisplayMode = res.data
      },
    })

  },

  loginSuccess: function(user){
    var newUserInfo = {
      userID: user.userID,
      userName: user.userName,
      mobile: user.mobile,
      password: user.userPwd,
      gender: user.gender,
      mark: user.mark,
      loginTime: Date.now(),
      headImgPath: user.headImgPath
    }
    wx.setStorage({
      key: 'user',
      data: newUserInfo
    })
    this.globalData.userInfo = newUserInfo
  },
  

  globalData: {
    userInfo: null,
    demo: false,
    networking: false,
    networkType: 'none'
  }
})
