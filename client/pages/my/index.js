// index.js
const baseConfs = require('../../configs')
const RecStates = require('../rec/RecState.js')
const checkEnable = baseConfs.checkEnable
const getUserRecNumUrl = baseConfs.httpUrl + "piGetStatistic&statisticType=UserRecNum"


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
    var user = getApp().globalData.userInfo
    if(!user){
      return;
    }
    if (!this.data.user) {
      var recStates = [
        {
          name: RecStates.Reported.name,
          ids: RecStates.Reported.id + "," + RecStates.Reported_Handled.id,
          icon: 'resources/ic_mark.png',
          num: 0
        },
        {
          name: RecStates.Processing.name,
          ids: RecStates.Processing.id,
          icon: 'resources/ic_mark.png',
          num: 0
        }
      ]

      if(checkEnable){
        //待核查
        recStates.push({
          name: '待核查',
          ids: RecStates.Processed.id,
          icon: 'resources/ic_mark.png',
          num: 0
        })
      }

      recStates.push.apply(recStates, [
        {
          name: RecStates.Processed.name,
          ids: RecStates.Checked.id + "," + RecStates.Checked_Synced.id + "," + RecStates.Checked_Finish.id + (checkEnable ? '' : ("," + RecStates.Processed.id)),
          icon: 'resources/ic_mark.png',
          num: 0
        },
        {
          name: RecStates.Ignore.name,
          ids: RecStates.Ignore.id,
          icon: 'resources/ic_mark.png',
          num: 0
        }
      ])
      this.setData({
        user: user,
        baseUrl: '../rec/reclist/reclist?mobile='+user.mobile+ '&title=', 
        recStates: recStates
      })
    }
    //每次show都刷新数字
    var that = this
    wx.request({
      url: getUserRecNumUrl + "&mobile=" + user.mobile,
      success: function(res) {
        if(res.data.code != 0){
          return
        }
        var list = JSON.parse(res.data.data)
        if(list.length <= 0){
          return
        }

        //这里处理数据的方式和手机是一样的  但是太麻烦了。。。
        var map = {}
        var temp
        for (var item in list){
          temp = list[item]
          map[temp.RECSTATE] = temp.NUM
        }

        var recStates = that.data.recStates
        //已上报
        recStates[0].num = (map[RecStates.Reported.name] ? map[RecStates.Reported.name] : 0) + (map[RecStates.Reported_Handled.name] ? map[RecStates.Reported_Handled.name] : 0)
        //处理中
        recStates[1].num = map[RecStates.Processing.name] ? map[RecStates.Processing.name] : 0
        
        var proccessedCount = 0
        //待核查
        if(checkEnable){
          recStates[2].num = map[RecStates.Processed.name] ? map[RecStates.Processed.name] : 0
        }else{
          proccessedCount = map[RecStates.Processed.name] ? map[RecStates.Processed.name] : 0
        }

        var add = checkEnable ? 1 : 0
        //已处理
        proccessedCount += map[RecStates.Checked.name] ? map[RecStates.Checked.name] : 0
        proccessedCount += map[RecStates.Checked_Synced.name] ? map[RecStates.Checked_Synced.name] : 0
        proccessedCount += map[RecStates.Checked_Finish.name] ? map[RecStates.Checked_Finish.name] : 0
        recStates[2 + add].num = proccessedCount
        //不处理
        recStates[3 + add].num = map[RecStates.Ignore.name] ? map[RecStates.Ignore.name] : 0
        that.setData({
          recStates: recStates
        })
      }
    })
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
      user: null,
      recStates: null
    })
  },
  
  go2Setting: function() {
    wx.navigateTo({
      url: 'setting'
    })
  }
})