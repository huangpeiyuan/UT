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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.login({
      success: function (res) {
        console.log(res);
        _this.setData({
          code: res.code
        })
        // console.log(_this.data.code);
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
    console.log(_this.data.code);
    api.getUser({
      data: {
        code: _this.data.code
      }
    }).then(res => {
      console.log(_this.data.code);
      if (res.data.newUser === 1) {
        wx.getUserProfile({
          lang: 'zh_CN',
          desc: '用于完善用户个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            _this.setData({
              rawData: res.rawData,
              hasUserInfo: true
            })
          }
        })
      } else if (res.data.newUser === 2) {
        wx.showToast({
          title: '已经登录',
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
            // if (res.data.code === 200) {

            // }
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