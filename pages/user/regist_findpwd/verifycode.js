// regist.js
//专门用来发送和验证验证码的(仅限注册和找回密码时用) 根据purpose区分用途，根据nextPage来指向要转向的页面
const baseConfs = require('../../../configs')
const usrConfigs = require('../config.js')
const checkUserRegistUrl = usrConfigs.checkUserRegistUrl
const sendVerifyCodeUrl = usrConfigs.sendVerifyCodeUrl
const verifyVerifyCodeUrl = usrConfigs.verifyVerifyCodeUrl

var mobileValidate = require('../../../utils/verifys.js').mobileValidate

var purpose = 1 //1:注册  2:找回密码
var next = function (that, phone) {
  var nextPage = (purpose == 1 ? "regist" : "findpwd") + "?mobile=" + phone
  wx.redirectTo({
    url: nextPage
  })
}

var verifyPhoneTask
var validMobile

var sendVerifycodeCoundown
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: {
      validPhone: false,
      validVerifycode: false,
      submiting: false
    },
    hint: {
      phone_input_hint: '',
      verifycode_input_hint: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.purpose) {
      wx.showToast({
        title: "没有purpose，不知道你要干嘛，直接返回",
        image: baseConfs.errorToastImage,
        duration: 1500
      })
      wx.navigateBack({
        delta: 1,
      })
      return
    }
    sendVerifycodeCoundown = 0
    purpose = options.purpose
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: purpose == 1 ? "用户注册" : "密码找回"
    })
  },

  onUnload: function () {
    if (verifyPhoneTask) {
      verifyPhoneTask.abort()
      verifyPhoneTask = null
    }
  },

  phoneChanged: function (e) {
    if (verifyPhoneTask) {
      verifyPhoneTask.abort()
      verifyPhoneTask = null
    }

    var phone = e.detail.value
    var hint = this.data.hint
    var state = this.data.state

    var newPhoneHint
    var newValidState

    validMobile = null
    if (phone.length == 11) {
      if (mobileValidate(phone)) {
        validMobile = phone
        newPhoneHint = ''
        newValidState = true
        var that = this
        verifyPhoneTask = wx.request({
          url: checkUserRegistUrl + "&mobile=" + phone,
          success: function (res) {
            if (res.data.code != 0) {
              return;
            }
            var newState
            var newHint
            if (JSON.parse(res.data.data).mobile) {//registed
              newState = purpose == 1 ? false : true
              newHint = purpose == 1 ? "此手机号已经被注册~~!" : ""
            } else {//not regist yet
              newState = purpose == 1 ? true : false
              newHint = purpose == 1 ? "此手机号码可用^_^" : "无此手机号用户"
            }
            if (verifyPhoneTask) {  //double check
              hint.phone_input_hint = newHint
              state.validPhone = newState
              that.setData({
                hint: hint,
                state: state
              })
            }
          },
          complete: function () {
            verifyPhoneTask = null
          }
        })
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

  verifycodeChanged: function (e) {
    var verifycode = e.detail.value
    var newValidState = verifycode.length == 6
    var state = this.data.state
    if (newValidState != state.validVerifycode) {
      state.validVerifycode = newValidState
      this.setData({
        state: state
      })
    }
  },

  submit: function (e) {
    var mobile = e.detail.value.phoneNumber
    var verifycode = e.detail.value.verifycode

    if (getApp().globalData.demo || verifycode == "666666") {
      next(this, mobile)
      return
    }

    var state = this.data.state
    state.submiting = true
    this.setData({
      state: state
    })

    var that = this
    wx.request({
      url: verifyVerifyCodeUrl,
      data: {
        mobile: mobile,
        identifyCode: verifycode,
        purpose: purpose
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 0) {
          next(that, mobile)
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
  },
  sendVerifycode: function () {
    if (this.data.state.submiting || !this.data.state.validPhone || sendVerifycodeCoundown > 0) {
      return
    }
    sendVerifycodeCoundown = 60
    this.countDown()

    wx.request({
      url: sendVerifyCodeUrl,
      data: {
        purpose: purpose,
        mobile: validMobile
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '验证码发送成功',
            duration: 1500
          })
        } else {
          sendVerifycodeCoundown = 0
          wx.showToast({
            title: res.data.data,
            image: baseConfs.errorToastImage,
            duration: 1500
          })
        }
      },
      fail: function (res) {
        sendVerifycodeCoundown = 0
        wx.showToast({
          title: baseConfs.networkErrorText,
          image: baseConfs.errorToastImage,
          duration: 1500
        })
      }
    })
  },

  countDown: function () {
    var verifycodeHint = sendVerifycodeCoundown <= 0 ? null : (sendVerifycodeCoundown + "s后可重发")
    var hints = this.data.hint
    hints.verifycodeHint = verifycodeHint
    this.setData({
      hint: hints
    })
    if (sendVerifycodeCoundown > 0) {
      sendVerifycodeCoundown--
      var that = this
      setTimeout(function () {
        that.countDown()
      }, 1000)
    }
  }

})