const util = require('./util.js')
const url = 'https://ut.315mao.com'

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
              url: '/pages/login/login'
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

const getUserInfo = config => { // 获取用户信息数据接口
  return service({
    url: '/Api/Login/getUserInfo',
    method: 'GET',
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

const MediaDetails = config => { // 5G新传媒详情数据接口
  return service({
    url: '/Api/Media/details',
    method: 'GET',
    ...config
  })
}

const catData = config => { // 品牌介绍分类数据接口
  return service({
    url: '/Api/Brand/catData',
    method: 'GET',
    ...config
  })
}

const catMiniData = config => { // 品牌介绍子分类数据
  return service({
    url: '/Api/Brand/catMiniData',
    method: 'GET',
    ...config
  })
}

const getBrand = config => { // 品牌介绍数据接口
  return service({
    url: '/Api/Brand/index',
    method: 'GET',
    ...config
  })
}

const BrandDetails = config => { // 品牌介绍详情数据接口
  return service({
    url: '/Api/Brand/details',
    method: 'GET',
    ...config
  })
}

const Curriculum = config => { // 行动力大学数据接口
  return service({
    url: '/Api/Curriculum/index',
    method: 'GET',
    ...config
  })
}

const CurriculumDetails = config => { // 行动力大学数据详情
  return service({
    url: '/Api/Curriculum/details',
    method: 'GET',
    ...config
  })
}

const getBannerData = config => { // banner图数据接口
  return service({
    url: '/Api/Index/getBannerData',
    method: 'GET',
    ...config
  })
}

const getMaterial = config => { // 发圈素材分类数据接口
  return service({
    url: '/Api/Material/catData',
    method: 'GET',
    ...config
  })
}

const MaterialIndex = config => { // 发圈素材数据
  return service({
    url: '/Api/Material/index',
    method: 'GET',
    ...config
  })
}

const MaterialOperate = config => { //转发/收藏/下载操作
  return service({
    url: '/Api/Material/operate',
    method: 'POST',
    ...config
  })
}

const collectionData = config => { //收藏-发圈素材数据接口
  return service({
    url: '/Api/Material/collectionData',
    method: 'GET',
    ...config
  })
}

const Mediainsert = config => { // 新增5G新传媒数据
  return service({
    url: '/Api/Media/insert',
    method: 'POST',
    ...config
  })
}

const Testing = config => { // 检测报告数据
  return service({
    url: '/Api/Testing/index',
    method: 'GET',
    ...config
  })
}

const testingDetails = config => { // 检测报告详情数据
  return service({
    url: '/Api/Testing/details',
    method: 'GET',
    ...config
  })
}

const getShowStatus = config => { // 判断是否隐藏审核不通过相关资料
  return service({
    url: '/Api/Index/getShowStatus',
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
  MediaDetails,
  catData,
  catMiniData,
  getBrand,
  BrandDetails,
  Curriculum,
  CurriculumDetails,
  getBannerData,
  getMaterial,
  MaterialIndex,
  MaterialOperate,
  collectionData,
  Mediainsert,
  Testing,
  testingDetails,
  getShowStatus,
}

