// regist.js
const baseConfs = require('../../../configs')
const userConfigs = require('../config.js')
const checkUserRegistUrl = userConfigs.checkUserRegistUrl

var md5 = require("../../../utils/md5.js").hexMD5

var verifyUserNameTask
var mobile
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: {
      validUserName: false,
      validPassword: false,
      submiting: false
    },
    hint: {
      username_input_hint: ''
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
    var that = this
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var country = userInfo.country
        var city = userInfo.city
        that.data.state.validUserName = true
        that.setData({
          wcUser: {
            name: nickName,
            head: avatarUrl,
            gender: gender,
            address: city
          },
          state: that.data.state
        })
      }
    })
  },

  usernameChanged: function (e) {
    if (verifyUserNameTask) {
      verifyUserNameTask.abort()
      verifyUserNameTask = null
    }

    var username = e.detail.value
    var hint = this.data.hint
    var state = this.data.state

    var newUserNameHint
    var newValidState

    if (username.length > 1) {
      newUserNameHint = ''
      newValidState = true

      var that = this
      verifyUserNameTask = wx.request({
        url: checkUserRegistUrl + "&userName=" + username,
        success: function (res) {
          if (res.data.code != 0) {
            return;
          }
          var newState
          var newHint
          if (JSON.parse(res.data.data).userName) {//registed
            newState = false
            newHint = "此用户名已经被注册~~!"
          } else {//not regist yet
            newState = true
            newHint = ""
          }
          if (verifyUserNameTask) {  //double check
            hint.username_input_hint = newHint
            state.validUserName = newState
            that.setData({
              hint: hint,
              state: state
            })
          }
        },
        complete: function () {
          verifyUserNameTask = null
        }
      })
    } else {
      newUserNameHint = ''
      newValidState = false
    }

    //no change do nothing
    if (newUserNameHint == hint.username_input_hint && newValidState == state.validUserName) {
      return
    }
    hint.username_input_hint = newUserNameHint
    state.validUserName = newValidState

    this.setData({
      hint: hint,
      state: state
    })
  },

  passwordChanged: function (e) {
    var password = e.detail.value
    var newValidState = password != ''
    var state = this.data.state
    if (newValidState != state.validPassword) {
      state.validPassword = newValidState
      this.setData({
        state: state
      })
    }
  },

  submit: function (e) {
    var username = e.detail.value.username
    var password = e.detail.value.password
    var state = this.data.state
    state.submiting = true
    this.setData({
      state: state
    })
    var that = this
    var wcUser = this.data.wcUser
    wx.request({
      url: userConfigs.pimUserUrl,
      data: {
        editType: "Insert",
        isSuperAdmin: true, //前一界面已经验证过验证码 路过验证
        mobile: mobile,
        userName: username,
        userPwd: md5(password),
        gender: wcUser.gender ? wcUser.gender : -1,
        address: wcUser.address ? wcUser.address : "",
        headImgPath: wcUser.head
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
            title: '注册账号成功',
            duration: 1500
          })
          //注册成功 回到登录，回传注册成功的手机号
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