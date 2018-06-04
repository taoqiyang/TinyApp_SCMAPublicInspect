// pages/main/map/poi.js
const baseConfs = require('../../../configs')
let {poiSearch} = require('../../../libs/my/PoiSearch.js')

let title
let keyword
let location
let total
let hasMore = true

function loadPois(that){
  //第一次没有位置或者当前移动速度小于2m/s时使用缓存位置
  if(location && location.speed <= 2){
    loadPoisReal(that);
    return;
  }
  wx.getLocation({
    type: 'gcj02',
    success: function(res){
      location = {
        latitude: res.latitude,
        longitude: res.longitude,
        speed: res.speed
      }
      loadPoisReal(that);
    },
    fail: function(){
      if(location){
        return;
      }
      wx.showToast({
        title: "定位失败",
        image: baseConfs.errorToastImage,
        duration: 1500
      });
      wx.navigateBack({
      });
    }
  });
}

function loadPoisReal(that){
  wx.showLoading({
    title: baseConfs.loadingText,
  })
  poiSearch({
    keyword,
    location,
    page_index: (that.data.pois.length / 10) + 1,
    success: function (res) {
      if (res.data.length <= 0) {
        if (that.data.pois.length == 0){
          wx.showToast({
            title: "附近没有找到兴趣点",
            image: baseConfs.warnToastImage,
            duration: 1500
          });
          wx.navigateBack({
          });
        }
        return;
      }
      res.data.map(function(poi){
        poi._distance = Math.floor(poi._distance);
      })
      total = res.count;
      that.data.pois.push.apply(that.data.pois, res.data)
      hasMore = that.data.pois.length < total;
      that.setData({
        pois: that.data.pois
      })
    },
    fail: function (res) {
      if (that.data.pois.length == 0) {
        wx.showToast({
          title: "搜索失败:" + res.message,
          image: baseConfs.errorToastImage,
          duration: 1500
        });
        wx.navigateBack({
        });
      }
    },
    complete: function (success) {
      wx.hideLoading();
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pois: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    title = options.title
    keyword = options.key
    if(!keyword){
      wx.showToast({
        title: "请传入关键字",
        image: baseConfs.errorToastImage,
        duration: 1500
      })
      wx.navigateBack({
      })
      return;
    }

    loadPois(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  showInMap: function(e) {
    let index = e.currentTarget.dataset.index
    let pois = this.data.pois
    if (index < 0 || index >= pois.length){
      return;
    }
    let poi = pois[index]
    wx:wx.openLocation({
      latitude: poi.location.lat,
      longitude: poi.location.lng,
      scale: 17,
      name: poi.title,
      address: poi.address,
      fail: function(res) {
        wx.showToast({
          title: "打开地图失败",
          image: baseConfs.errorToastImage,
          duration: 1500
        })
      },
    })
  },

  onReachBottom: function() {
    if(!hasMore){
      return;
    }
    loadPois(this);
  },

  onUnload: function() {
    location = null;
  }

})