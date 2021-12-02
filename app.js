// app.js
const api = require('utils/api.js')
const util = require('utils/util.js')
App({
  onLaunch() {
    let _this = this
    // 小程序版本更新
    if (wx.canIUse("getUpdateManager")) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: "新版本已发布",
              content: "自动更新问题处理，是否自动重启小程序？",
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: "已经有新版本了哟",
              content: "新版本已经上线啦，请您删除当前小程序，重新搜索打开哟~"
            })
          })
        }
      })
    }

    _this.globalData.isIphoneX = util.isIphoneX()

    // 登录
    if (wx.getStorageSync('token')) {
      _this.globalData.userLogin = {
        isNew: false,
        isLogin: true
      }
    } else {
      // _this.getToken()
      _this.globalData.userLogin = {
        isNew: true,
        isLogin: false
      }
    }

  },
  globalData: {
    isIphoneX: false,
    userInfo: null,
    userLogin: null, // {isNew, isLogin}
    addOrderPreview: [], //订单预览产品
    shopId: null, //店铺id
    isChangeUser: false, //是否有切换账号，重新登录;1:点击了切换账号按钮; 2:为切换账号登录成功
  },

  getToken: function () {
    let _this = this
    // 无token，换取真实token
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        util.showLoading()
        api.getLogin({
          data: {
            code: res.code
          }
        }).then(res => {
          util.hideLoading()
          if (res.newUser === 1) {//新用户
            _this.globalData.userLogin = {
              isNew: true,
              isLogin: false
            }
          } else { // 老用户
            _this.globalData.userLogin = {
              isNew: false,
              isLogin: true
            }
            wx.setStorageSync('token', res.token.access_token)
          }
          if (_this.userLoginCallback) {
            _this.userLoginCallback()
          }
        }).catch(() => {
          util.hideLoading()
        })
      }
    })

  },

})
