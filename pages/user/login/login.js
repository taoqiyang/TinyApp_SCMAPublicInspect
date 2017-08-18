// login.js
const baseConfs = require('../../../configs')
const config = require('../config.js')

var md5 = require("../../../utils/md5.js").hexMD5
var mobileValidate = require('../../../utils/verifys.js').mobileValidate

//登录成功后到哪儿，如果没传则直接返回
var redirectTo


var go2Next = function (that, user) {
  var newUserInfo = {
    userID: user.userID,
    userName: user.userName,
    mobile: user.mobile,
    password: user.userPwd,
    gender: user.gender,
    mark: user.mark,
    loginTime: Date.now()
  }
  wx.setStorage({
    key: 'user',
    data: newUserInfo
  })
  getApp().globalData.userInfo = newUserInfo
  if (redirectTo) {
    wx.redirectTo({
      url: redirectTo
    })
  } else {
    wx.navigateBack({
    })
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: {
      validPhone: false,
      validPassword: false,
      submiting: false
    },
    hint: {
      phone_input_hint: '',
      password_input_hint: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    redirectTo = options.redirectTo
    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        var user = res.data
        var state = that.data.state
        state.validPhone = true
        state.validPassword = true
        that.setData({
          user: {
            phone: user.mobile,
            password: user.password
          },
          state: state
        })
      }
    })
  },

  //注册或者找回密码后
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'login_phone',
      success: function (res) {
        //重置
        wx.removeStorage({
          key: 'login_phone'
        })

        var state = that.data.state
        state.validPhone = true
        state.validPassword = false
        that.setData({
          user: {
            phone: res.data,
            password: null
          },
          state: state
        })
      }
    })
  },

  phoneChanged: function (e) {
    var phone = e.detail.value
    var hint = this.data.hint
    var state = this.data.state

    var newPhoneHint
    var newValidState

    if (phone.length == 11) {
      if (mobileValidate(phone)) {
        newPhoneHint = ''
        newValidState = true
      } else {
        newValidState = false
        newPhoneHint = '手机号格式不正确'
      }
    } else {
      newPhoneHint = ''
      newValidState = false
    }

    //no change do nothing
    if (newPhoneHint == hint.phone_input_hint && newValidState == state.validPhone) {
      return
    }
    hint.phone_input_hint = newPhoneHint
    state.validPhone = newValidState

    this.setData({
      hint: hint,
      state: state
    })
  },

  passwordChanged: function (e) {
    var password = e.detail.value
    // var hint = this.data.hint
    // if (hint.password_input_hint != '') {
    //   hint.password_input_hint = ''
    //   this.setData({
    //     hint: hint
    //   })
    // }
    var newValidState = password != ''
    var state = this.data.state
    if (newValidState != state.validPassword) {
      state.validPassword = newValidState
      this.setData({
        state: state
      })
    }
  },

  loginSubmit: function (e) {
    if (getApp().globalData.demo) {
      wx.showToast({
        title: '登录成功_demo',
        duration: 1500
      })
      go2Next(this, {
        userID: 99999,
        userName: "demo用户",
        mobile: "13888888888",
        password: "test",
        gender: 1
      })
      return
    }

    var mobile = e.detail.value.phoneNumber
    var password = e.detail.value.password
    if (password != '######') {
      password = md5(password)
    } else {
      password = this.data.user.password
    }

    this.setData({
      submiting: true
    })

    var that = this
    wx.request({
      url: config.loginUrl,
      data: {
        mobile: mobile,
        userPwd: password
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
            title: '登录成功',
            duration: 1500
          })
          go2Next(that, JSON.parse(res.data.data))
        } else {
          that.setData({
            submiting: false
          })
          wx.showToast({
            title: res.data.data,
            image: baseConfs.errorToastImage,
            duration: 1500
          })
        }
      },
      fail: function (res) {
        that.setData({
          submiting: false
        })
        wx.showToast({
          title: baseConfs.networkErrorText,
          image: baseConfs.errorToastImage,
          duration: 1500
        })
      }
    })
  },

  regist: function () {
    wx.navigateTo({
      url: '../regist_findpwd/verifycode?purpose=1'
    })
  },

  findpwd: function() {
    wx.navigateTo({
      url: '../regist_findpwd/verifycode?purpose=2'
    })
  }
})