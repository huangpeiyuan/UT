const util = require('./util.js')
const url = 'http://ut.315mao.com'

let app

let loginQueue = []
let isLoginning = false


let service = config => {
  return new Promise((resolve, reject) => {

    if (config.url) {
      config.url = url + config.url
    } else {
      wx.showToast({
        title: '数据不存在！',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    if (config.header) {
      config.header = {
        Accept: 'application/json',
        ...config.header
      }
    }

    if (!config.success) {
      config.success = res => {
        if (res.header.Authorization) {
          wx.setStorageSync('token', res.header.Authorization)
        }
        switch (res.statusCode) {
          case 200: case 201:
            res.data.code = res.statusCode
            resolve(res.data)
            break;
          case 401:
            res.data.code = res.statusCode
            // wx.removeStorageSync('token')
            app = app || getApp()
            if (app && app.globalData.userLogin && app.globalData.userLogin.isLogin) {
              app.globalData.userLogin.isLogin = false
              // app.userLoginCallback = () => {
              //   isLoginning = false
              //   //登录成功则执行
              //   if (loginQueue.length > 0 && app.globalData.userLogin.isLogin) {
              //     for (let i = 0, len = loginQueue.length; i < len; i++) {
              //       service(loginQueue[i])
              //     }
              //     loginQueue = []
              //   }
              // }
              // isLoginning = true
              // loginQueue.push(config)
              // app.getToken()
            }
            util.hideLoading(true)
            wx.redirectTo({
              url: '/pages/login/index'
            })

            break;
          default:
            reject({ code: res.statusCode })
            util.hideLoading(true, function () {
              wx.showToast({
                title: res.data.msg || res.data.message || 'Status Code: ' + res.statusCode,
                icon: 'none',
                duration: 2000
              })
            })

        }
      }
    }

    if (!config.fail) {
      config.fail = err => {
        util.hideLoading(true)
        wx.showToast({
          title: err.errMsg,
          icon: 'none',
          duration: 2000
        })
        reject(err)
      }
    }

    // if (isLoginning ) { //如果登录状态过期，正在重新登录时，先把请求存进待请求数组中
    //   loginQueue.push(config)
    //   config = null
    //   return false
    // }

    if (config) {
      wx.request({ ...config })
    }

  })
}

const getIndex = config => { // 首页基础数据接口
  return service({
    url: '/Api/Index/index',
    method: 'GET',
    ...config
  })
}

const getUser = config => { // 判断是否新用户并获取userId
  return service({
    url: '/Api/Login/getUser',
    method: 'GET',
    ...config
  })
}

const saveUser = config => { // 保存用户微信信息,获取userId
  return service({
    url: '/Api/Login/saveUser',
    method: 'POST',
    ...config
  })
}

const getUserInfo = config => { // 保存用户微信信息,获取userId
  return service({
    url: '/Api/Login/getUserInfo',
    method: 'POST',
    ...config
  })
}

const getFirstNoticeData = config => { // 获取展示的一条公告数据
  return service({
    url: '/Api/Index/getFirstNoticeData',
    method: 'GET',
    ...config
  })
}

const getNoticeList = config => { // 公告列表数据接口
  return service({
    url: '/Api/Notice/index',
    method: 'GET',
    ...config
  })
}

const NoticeDetails = config => { // 公告详情据接口
  return service({
    url: '/Api/Notice/details',
    method: 'GET',
    ...config
  })
}

const getMedia = config => { // 5G新传媒数据接口
  return service({
    url: '/Api/Media/index',
    method: 'GET',
    ...config
  })
}

module.exports = {
  getIndex,
  getUserInfo,
  getUser,
  saveUser,
  getFirstNoticeData,
  getNoticeList,
  NoticeDetails,
  getMedia,
}

