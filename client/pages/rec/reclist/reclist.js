// reclist.js
const baseConfigs = require('../../../configs.js')
const configs = require('configs.js')
const util = require('../../../utils/util.js')
const RecStates = configs.RecStates
const checkEnable = baseConfigs.checkEnable
const pageSize = 10

var title
var mobile
var reportTypeIDs
var recStateIDs
var isSelf


var hasMore = false
var loading = false

var loadData = function (that, pullRefresh, callback) {
  if (callback && callback.beforLoad) {
    callback.beforLoad();
  }
  loading = true
  let recList = that.data.recList || []
  var page = pullRefresh ? 1 : (recList.length / pageSize + 1)
  var data = {
    page: page,
    pageSize: pageSize,
    PublicFlag: isSelf ? 9 : 1
  }
  if(mobile){
    data.mobile = mobile
  }
  if(recStateIDs){
    data.recStateID = recStateIDs
  }
  if(reportTypeIDs){
    data.reportTypeID = reportTypeIDs
  }
  wx.request({
    url: configs.getRecListUrl,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.code == 0) {
        if (pullRefresh) {
          recList = []
        }
        var result = parseRec(res.data.data)
        var list = result.list
        hasMore = list.length >= pageSize && result.totalCount > list.length + recList.length
        recList.push.apply(recList, list)
      }
    },

    fail: function (res) {
      if (pullRefresh) {
        wx.showToast({
          title: baseConfigs.networkErrorText,
          image: baseConfigs.errorToastImage,
          duration: 1000
        })
      }
    },
    complete: function (res) {
      if (callback && callback.afterLoad) {
        callback.afterLoad();
      }
      loading = false
      that.setData({
        networking: getApp().globalData.networking,
        recList: recList
      })
    },
  })
}

var parseRec = function (recListStr) {
  var result = JSON.parse(recListStr)
  var list = result.list || []
  list.map(function (rec) {
    rec.reportTime = util.formatTime(new Date(rec.reportTime))
    if (rec.reporterName === "匿名用户" || rec.reporterName === "游客" || !rec.reporterMobile || "11111111111" === rec.reporterMobile || "10000000000" === rec.reporterMobile){
      rec.reporterName = "游客";
    } else if(isSelf){
      rec.reporterName = "我";
    } else {
      if(!rec.reporterName || rec.reporterName === ''){
        rec.reporterName = "路人曱";
      } else if (configs.needHideCitizenName) {
        let prefix = rec.reporterName.substr(0, 1) + "**";
        rec.reporterName = rec.reporterName.length <= 2 ? prefix : prefix + rec.reporterName.substr(rec.reporterName.length - 1, 1);
      }
    }
    rec.reportTypeName = rec.reportTypeID == 2 ? "咨询" : (rec.reportTypeID == 3 ? "投诉" : "报案");
    rec.recStateName = getReportStateName(rec.recStateID);
    let mediaList = []
    rec.mediaList.map(function(media){
      if (media.mediaType === "voice"){
        return;
      }
      if (media.mediaType === "video" && !configs.mediaShowVideo){
        return;
      }
      media.mediaPath = configs.recPicUrl + media.mediaPath
      mediaList.push(media);
    })
    rec.mediaList = mediaList;
  })
  return result
}

var getReportStateName = function (recStateID){
  switch (recStateID){
    case 1:
      return "待处理";
    case 2:
    case 3:
      return "处理中";
    case 4:
      return "已结案";
    case 5:
      return "已核查";
    case 8:
      return "已同步";
    case 9:
      return "已处理";
    case 10:
      return "不受理";
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    networking: true,
    // recList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    title = options.title
    mobile = options.mobile
    reportTypeIDs = options.reportTypeIDs
    recStateIDs = options.recStateIDs
    isSelf = options.isSelf ? options.isSelf : mobile & true
    this.setData({
      configs: {
        mediaDisplayMode: baseConfigs.mediaDisplayMode
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (title) {
      wx.setNavigationBarTitle({
        title: title,
      })
    }

    // wx.startPullDownRefresh({
    //   complet: function(){
    //     console.log("complet")
    //   }
    // })
    loadData(this, false, {
      beforLoad: function () {
        wx.showLoading({
          title: baseConfigs.loadingText,
          mask: true
        })
      },
      afterLoad: function () {
        wx.hideLoading()
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (!getApp().globalData.networking) {
      wx.stopPullDownRefresh()
      wx.showToast({
        title: baseConfigs.pullRefreshNoNetworkText,
        image: baseConfigs.errorToastImage,
        duration: 1500
      })
      this.setData({
        networking: getApp().globalData.networking
      })
      return
    }
    loadData(this, true, {
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
    loadData(this, false);
  },

  displayLocation: function(e) {
    let rec = e.currentTarget.dataset.rec;
    if (!rec || !rec.coordX || !rec.coordY || rec.coordX < 0 || rec.coordY < 0){
      return;
    }
    wx.openLocation({
      latitude: rec.coordY,
      longitude: rec.coordX,
      scale: 28
    })
  },

  previewImage: function (e) {
    let photoUrls = []
    let mediaList = e.currentTarget.dataset.mediaList
    let item = e.currentTarget.dataset.item;
    let mediaShowVideo = configs.mediaShowVideo;
    let index = -1;
    for(let i = 0; i < mediaList.length; i++){
      let media = mediaList[i];
      if (!mediaShowVideo || media.mediaType === 'photo') {
        photoUrls.push(media.mediaPath);
        if (index == -1 && media == item) {
          index = i;
        }
      }
    }
    
    wx.previewImage({
      current: index,
      urls: photoUrls
    })
  },
})