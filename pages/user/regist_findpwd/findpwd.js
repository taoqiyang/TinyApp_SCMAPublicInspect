// findpwd.js
const baseConfs = require('../../../configs')
const userConfigs = require('../config.js')
const checkUserRegistUrl = userConfigs.checkUserRegistUrl

var md5 = require("../../../utils/md5.js").hexMD5
var mobile
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: {
      validPassword: false,
      validRepassword: false,
      submiting: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.mobile) {
      wx.showToast({
        title: '没有传入验证过的手机号'
      })
      wx.navigateBack({
      })
      return
    }

    mobile = options.mobile
  },

  passwordChanged: function (e) {
    var newValidState = e.detail.value != ''
    var state = this.data.state
    if (newValidState != state.validPassword) {
      state.validPassword = newValidState
      this.setData({
        state: state
      })
    }
  },

  repasswordChanged: function (e) {
    var newValidState = e.detail.value != ''
    var state = this.data.state
    if (newValidState != state.validRepassword) {
      state.validRepassword = newValidState
      this.setData({
        state: state
      })
    }
  },

  submit: function (e) {
    var password = e.detail.value.password
    var repassword = e.detail.value.repassword
    if (password != repassword) {
      wx.showToast({
        title: '两次输入密码不一致',
        image: baseConfs.warnToastImage,
        duration: 1500
      })
      return;
    }

    var state = this.data.state
    state.submiting = true
    this.setData({
      state: state
    })
    var that = this
    wx.request({
      url: userConfigs.pimUserUrl,
      data: {
        editType: "Update",
        requestType: 2,//代表重置密码
        mobile: mobile,
        userPwd: md5(password)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 0) {
          wx.vibrateShort({
          })
          wx.showToast({
            title: '重置密码成功',
            duration: 1500
          })
          //重置密码成功 回到登录，回传重置密码成功的手机号
          wx.setStorage({
            key: 'login_phone',
            data: mobile,
            complete: function (res) {
              wx.navigateBack({
              })
            }
          })
        } else {
          state.submiting = false
          that.setData({
            state: state
          })
          wx.showToast({
            title: res.data.data,
            image: baseConfs.errorToastImage,
            duration: 1500
          })
        }
      },
      fail: function (res) {
        state.submiting = false
        that.setData({
          state: state
        })
        wx.showToast({
          title: baseConfs.networkErrorText,
          image: baseConfs.errorToastImage,
          duration: 1500
        })
      }
    })
  }
})