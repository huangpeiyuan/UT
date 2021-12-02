const whiteList = ['/Api/Index/index']

const getAxios = function (config) {
  const {
    url,
    header,
    params
  } = config
  let urlNew = url
  if (params) {
    let paramsNew = ``
    for (let i in params) {
      if (params[i] || params[i] === 0) {
        paramsNew = `${paramsNew}${i}=${params[i]}&`
      }
    }
    paramsNew = paramsNew.split('')
    paramsNew.splice(-1, 1)
    paramsNew = paramsNew.join('')
    urlNew = `${urlNew}?${paramsNew}`
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://ut.315mao.com${urlNew}`,
      method: 'get',
      header: {
        header,
        'Authorization': !whiteList.includes(url) ?
          wx.getStorageSync('Authorization') || null :
          (wx.getStorageSync('Authorization') || null)
      },
      success: function (res) {
        if (res.statusCode === 401) {
          wx.showModal({
            title: '失败',
            showCancel: false,
            content: '身份失效,请重新授权',
            success: () => {
              wx.reLaunch({
                url: '/pages/authorization/authorization',
              })
            },
          })
          reject()
        }
        if (res.header.Authorization) {
          wx.setStorage({
            key: 'Authorization',
            data: res.header.Authorization
          })
        }
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

const postAxios = function (config) {
  const {
    url,
    header,
    data
  } = config
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://ut.315mao.com${url}`,
      method: 'post',
      data,
      header: {
        header,
        'Authorization': !whiteList.includes(url) ?
          wx.getStorageSync('Authorization') || null :
          (wx.getStorageSync('Authorization') || null)
      },
      success: function (res) {
        if (res.statusCode === 401) {
          wx.showModal({
            title: '失败',
            showCancel: false,
            content: '身份失效,请重新授权',
            success: () => {
              wx.reLaunch({
                url: '/pages/authorization/authorization',
              })
            },
          })
          reject()
        }
        if (res.header.Authorization) {
          wx.setStorage({
            key: 'Authorization',
            data: res.header.Authorization
          })
        }
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

const putAxios = function (config) {
  const {
    url,
    header,
    data
  } = config
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://ut.315mao.com${url}`,
      method: 'put',
      data,
      header: {
        header,
        'Authorization': !whiteList.includes(url) ?
          wx.getStorageSync('Authorization') || null :
          (wx.getStorageSync('Authorization') || null)
      },
      success: function (res) {
        if (res.statusCode === 401) {
          wx.showModal({
            title: '失败',
            showCancel: false,
            content: '身份失效,请重新授权',
            success: () => {
              wx.reLaunch({
                url: '/pages/authorization/authorization',
              })
            },
          })
          reject()
        }
        if (res.header.Authorization) {
          wx.setStorage({
            key: 'Authorization',
            data: res.header.Authorization
          })
        }
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

const delAxios = function (config) {
  const {
    url,
    header,
    data
  } = config
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://ut.315mao.com${url}`,
      method: 'DELETE',
      data,
      header: {
        header,
        'Authorization': !whiteList.includes(url) ?
          wx.getStorageSync('Authorization') || null :
          (wx.getStorageSync('Authorization') || null)
      },
      success: function (res) {
        if (res.statusCode === 401) {
          wx.showModal({
            title: '失败',
            showCancel: false,
            content: '身份失效,请重新授权',
            success: () => {
              wx.reLaunch({
                url: '/pages/authorization/authorization',
              })
            },
          })
          reject()
        }
        if (res.header.Authorization) {
          wx.setStorage({
            key: 'Authorization',
            data: res.header.Authorization
          })
        }
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  getAxios,
  postAxios,
  putAxios,
  delAxios
}