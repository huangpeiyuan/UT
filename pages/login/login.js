// pages/login/index.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: "",
    isNew: true,
    hasUserInfo: false,
    rawData: {},
    newUser: "",
    userId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.login({
      success: function (res) {
        _this.setData({
          code: res.code
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 获取用户信息
  getUserProfile(e) {
    var _this = this;
    api.getUser({
      data: {
        code: _this.data.code
      }
    }).then(res => {
      this.setData({
        newUser: res.data.newUser,
        userId: res.data.userId
      })
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '用于完善用户个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          _this.setData({
            rawData: res.rawData,
          })
          if (_this.data.newUser === 1) {
            _this.setData({
              hasUserInfo: true,
            })
          } else {
            wx.setStorageSync('userId', this.data.userId);
            wx.showToast({
              title: '登录成功',
              complete: function () {
                let timer = setTimeout(function () {
                  clearTimeout(timer)
                  wx.navigateBack({
                    delta: 1,
                    fail: function () {
                      wx.switchTab({
                        url: '/pages/index/index'
                      })
                    }
                  })
                }, 1500)
              }
            })
          }
        }
      })
    }).catch(err => {
      util.hideLoading()
    })
  },

  // 授权手机号
  getphonenumber: function (e) {
    let _this = this
    var userInfo = JSON.parse(_this.data.rawData)
    wx.login({
      success: function (res) {
        _this.setData({
          code: res.code
        })
        if (e.detail.iv) {
          console.log(res.code);
          api.saveUser({
            data: {
              wxCode: res.code,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
            },
          }).then(res => {
            util.hideLoading();
            if (res.code === 200) {
              wx.setStorageSync('userId', res.data.userId);
              wx.showToast({
                title: '登录成功',
                complete: function () {
                  let timer = setTimeout(function () {
                    clearTimeout(timer)
                    wx.navigateBack({
                      delta: 1,
                      fail: function () {
                        wx.switchTab({
                          url: '/pages/index/index'
                        })
                      }
                    })
                  }, 1500)
                }
              })
            }
          }).catch(() => {
            util.hideLoading()
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})