// report.js
const baseConfs = require('../../../configs')
const configs = require('configs')
const REPORT_TYPE_NORMAL = 1

var mobileValidate = require('../../../utils/verifys.js').mobileValidate

var title


var checkReportParams = function (that, e) {
  var desc = e.detail.value.desc
  if (desc.trim().length === 0) {
    wx.showToast({
      title: '问题描述不能为空哦~~',
      image: baseConfs.warnToastImage,
      duration: 1500
    })
    return false
  }
  var phoneNumber = e.detail.value.phoneNumber
  if (phoneNumber.length === 0) {
    wx.showToast({
      title: '手机号不能为空哦~~',
      image: baseConfs.warnToastImage,
      duration: 1500
    })
    return false
  }
  if (!mobileValidate(phoneNumber)) {
    wx.showToast({
      title: '手机号格式不对哦~~',
      image: baseConfs.warnToastImage,
      duration: 1500
    })
    return false
  }

  var rec = that.data.rec
  if (!rec.address || rec.address.length === 0) {
    wx.showToast({
      title: '得选取一个上报地点哦~~',
      image: baseConfs.warnToastImage,
      duration: 1500
    })
    return false
  }
  return true
}

var uploadMedia = function(that, params){
  wx.showNavigationBarLoading()
  wx.showLoading({
    title: '上传中,请稍微...',
    mask: true
  })

  var rec = that.data.rec
  var file = params.file
  wx.uploadFile({
    url: configs.uploadMediaUrl,
    filePath: file.path,
    name: 'qqfile',
    formData: {
      reportFrom: "webEnd",
      uID: rec.recID,
      mediaID: params.mediaID,
      mediaName: file.path.substring(file.path.lastIndexOf("/") + 1),
      size: file.size,
      mediaTypeID: params.mediaTypeID,
      ownerType: "pirec"
    },
    success: function (res) {
      wx.hideLoading()
      var resp = JSON.parse(res.data)
      if (resp.code === 0) {
        wx.showToast({
          title: '上传成功',
          duration: 1500
        })
        if(params.success){
          params.success(resp)
        }
      } else {
        wx.showToast({
          title: resp.data,
          image: baseConfs.errorToastImage,
          duration: 1500
        })
        if (params.fail) {
          params.fail()
        }
      }
    },
    fail: function (res) {
      wx.hideLoading()
      wx.showToast({
        title: baseConfs.networkErrorText,
        image: baseConfs.errorToastImage,
        duration: 1500
      })
      if (params.fail) {
          params.fail()
      }
    },
    complete: function (res) {
      wx.hideNavigationBarLoading()
    }
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    config: {
      maxImageCount: configs.uploadImageCountMax,
      videoEnable: configs.uploadVideoEnalbe
    },
    reporting: false,
    reportSuccessed: false,
    rec: {},
    uploadImageList: [],
    uploadVideo: ""
  },

  chooseLocation: function () {
    if(this.data.reportSuccessed){
      console.log("已经上报成功，点击了选择位置")
      return;
    }
    var that = this
    wx.chooseLocation({
      success: function (res) {
        var rec = that.data.rec
        rec.address = res.address
        rec.longtitude = res.longitude
        rec.latitude = res.latitude

        var locationMarker = that.locationMarker || {}
        locationMarker.latitude = res.latitude
        locationMarker.longitude = res.longitude
        locationMarker.address = res.address
        that.setData({
          locationMarker: locationMarker,
          address: res.address
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '选取位置失败',
          image: baseConfs.warnToastImage,
          duration: 1500
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.rectypeID) {
      wx.showToast({
        title: '没有选择案件类型，直接回退',
        image: baseConfs.errorToastImage,
        duration: 1500
      })
      wx.navigateBack({
      })
      return
    }
    var rec = this.data.rec
    rec.recTypeID = options.rectypeID
    rec.recTypeName = options.rectypeName
    title = options.title ? options.title : "上报案件"
    var user = getApp().globalData.userInfo

    this.setData({
      rec: rec,
      user: {
        mobile: user.mobile
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: title
    })
  },

  reportSubmit: function (e) {
    if (!checkReportParams(this, e)) {
      return
    }
    if(getApp().globalData.demo){
      this.data.rec.recID = 345
      wx.showToast({
        title: '上报成功_demo',
        duration: 1500
      })
      this.setData({
        reportSuccessed: true
      })
      return
    }

    var rec = this.data.rec
    rec.recDesc = e.detail.value.desc
    rec.reporterMobile = e.detail.value.phoneNumber
    rec.reporterName = "小程序测试"
    var url = configs.reportUrl
    var params = {
      reporterMobile: rec.reporterMobile,
      reportTypeID: REPORT_TYPE_NORMAL,
      recTypeID: rec.recTypeID,
      recTypeName: rec.recTypeName,
      recSource: 'smallapp',
      recDesc: rec.recDesc,
      address: rec.address,
      coordX: rec.longtitude,
      coordY: rec.latitude,
      reporterName: rec.reporterName,
      reporterType: 1//游客上报
    }

    wx.showNavigationBarLoading()
    this.setData({
      reporting: true
    })

    var that = this
    wx.request({
      url: url,
      data: params,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 0) {
          that.data.reportSuccessed = true
          that.data.rec.recID = JSON.parse(res.data.data).recID

          wx.vibrateShort({
          })

          wx.showToast({
            title: '上报成功',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '上报失败:' + res.data.data,
            image: baseConfs.errorToastImage,
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: baseConfs.networkErrorText,
          image: baseConfs.errorToastImage,
          duration: 1500
        })
      },
      complete: function (res) { 
        wx.hideNavigationBarLoading()
        that.setData({
          reporting: false,
          reportSuccessed: that.data.reportSuccessed
        })
      },
    })
  },

  chooseImage: function () {
    if(!this.data.reportSuccessed){
        //not report yet
        return;
    }
    var imageList = this.data.uploadImageList
    if (imageList.length >= configs.uploadImageCountMax){
      wx.showToast({
        title: '上传图片数已达到上限',
        image: baseConfs.warnToastImage,
        duration: 1500
      })
      return
    }

    var that = this
    var mediaID = imageList.length + 1
    //一次一张
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: configs.uploadImageOnlyCamera ? ['camera'] : ['album', 'camera'],
      success: function(res) {
        //upload
        uploadMedia(that, {
          file: res.tempFiles[0],
          mediaID: mediaID,
          mediaTypeID: 0,
          success: function(resp){
            imageList.push(res.tempFilePaths[0])
            that.setData({
              uploadImageList: imageList
            })
          }
        })
      }
    })
  },

  previewImage: function(e){
    var imageList = this.data.uploadImageList
    wx.previewImage({
      current: imageList[e.target.dataset.index],
      urls: imageList
    })
  },

  chooseVideo: function(){
    if (!this.data.reportSuccessed) {
      //not report yet
      return;
    }

    var that = this
    var mediaID = configs.uploadImageCountMax + 1
    wx.chooseVideo({
      sourceType: configs.uploadVideoOnlyCamera ? ['camera'] : ['album', 'camera'],
      maxDuration: configs.videoMaxDuration,
      success: function(res) {
        //upload
        uploadMedia(that, {
          file: {
            path: res.tempFilePath,
            size: res.size
          },
          mediaID: mediaID,
          mediaTypeID: 2,
          success: function (resp) {
            that.setData({
              uploadVideo: res.tempFilePath
            })
          }
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '视频选取失败',
          image: baseConfs.warnToastImage,
          duration: 1500
        })
      }
    })

  }

})