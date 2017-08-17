//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

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


  },

  globalData: {
    userInfo: null,
    demo: false,
    networking: false,
    networkType: 'none'
  }
})
