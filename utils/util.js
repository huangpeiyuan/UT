const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 判断机型
function isIphoneX() {
  try {
    const res = wx.getSystemInfoSync()
    return res.model.includes("iPhone X")
  } catch (error) { }

}

let loading = 0

const showLoading = () => {
  loading++
  if (loading === 1) {
    wx.showLoading({
      title: '加载中',
      fail: function (err) { }
    })
  }
}

const hideLoading = (all, fn) => {
  if (loading > 0) {
    loading--
  }
  if (loading === 0 || all) {
    wx.hideLoading({
      fail: function (err) { },
      complete: function () {
        if (fn) {
          fn()
        }
      }
    })
  }
}

// 点击保存图片到相册
function saveImageToPhotosAlbum(imagePath) {
  wx.saveImageToPhotosAlbum({
    filePath: imagePath, // 图片路径
    success: function (res) {
      wx.showToast({
        title: '保存成功',
      })
      wx.getSavedFileList({
        success(res) {
          let len = res.fileList.length
          if (res.fileList.length > 0) {
            for (let i = 0; i < len; i++) {
              wx.removeSavedFile({
                filePath: res.fileList[i].filePath,
                complete(res) {
                }
              })
            }

          }
        }
      })
    },
    fail: function (err) {
      wx.getSetting({
        success: function (res) {
          // 判断否有保存权限
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.showModal({
              title: '提示',
              content: '需要获取相册权限哦',
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success(res) {
                      console.log(res);
                    },
                    fail(res) {
                      console.log(res);
                    }
                  });
                }
              }
            })
          };
        }
      });
    }
  })
}

// 长按保存图片到相册
function pressImageToPhotosAlbum(imagePath) {
  wx.saveImageToPhotosAlbum({
    filePath: imagePath, // 图片路径
    success: function (res) {
      wx.showToast({
        title: '保存成功',
      })
      wx.downloadFile({
        success(res) {
          let len = res.fileList.length
          if (res.fileList.length > 0) {
            for (let i = 0; i < len; i++) {
              wx.removeSavedFile({
                filePath: res.fileList[i].filePath,
                complete(res) {
                }
              })
            }

          }
        }
      })
    },
    fail: function (err) {
      wx.getSetting({
        success: function (res) {
          // 判断否有保存权限
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.showModal({
              title: '提示',
              content: '需要获取相册权限哦',
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success(res) {
                      console.log(res);
                    },
                    fail(res) {
                      console.log(res);
                    }
                  });
                }
              }
            })
          };
        }
      });
    }
  })
}

// 倒计时
function countdown(times, fn) {
  let countdown = 1
  const timer = setInterval(() => {
    if (countdown > times) {
      clearInterval(timer);
    }
    let num = Number(times - countdown)
    num = num < 0 ? 0 : num
    fn(num, timer)
    countdown++
  }, 1000);
}


// 监听器
function defineReactive(data, key, value) {
  observer(value)
  let dep = new Dep()
  Object.defineProperty(data, key, {
    get: function () {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return value
    },
    set: function (newVal) {
      if (value !== newVal) {
        value = newVal
        dep.notify(newVal)  //触发更新
      }
    }
  })
}

function observer(data, key) {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

function Dep() {
  this.subs = []
}

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}

Dep.prototype.notify = function (value) {
  this.subs.forEach(sub => {
    sub.update(value)
  })
}

Dep.prototype.removeSub = function (sub) {
  let subs = this.subs.filter(item => item !== sub)
  this.subs = subs
}

Dep.target = null

// 订阅者
function Watcher(data, key, callback, once) {
  this.callback = callback
  this.once = once ? 1 : null
  Dep.target = this
  this.value = data[key]
}

Watcher.prototype = {
  update: function (value) {
    const oldValue = this.value
    if (value != oldValue) {
      this.value = value

      if (this.once) {
        if (this.once > 1) {
          this.callback(value)
          this.once = 2
          Dep.removeSub(Dep.target)
        }
        return false
      }
      this.callback(value)
    }
  },
  get: function () {
    Dep.target = null
    return this.value
  }
}

function observerWatch(data, key, callback, once) {
  observer(data)
  new Watcher(data, key, callback, once)
}

// 防抖动
function debounce(fn, delay) {
  let debounceDimer = null
  return function () {
    if (debounceDimer) {
      clearTimeout(debounceDimer)
    }
    debounceDimer = setTimeout(fn, delay)
  }
}

// 获取url参数
function getQueryVariable(url, paras) {
  let start = url.indexOf('?'), paraString
  if (start > -1) {
    paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  } else {
    paraString = url.split("&")
  }
  let paraObj = {}
  for (let i = 0, j; j = paraString[i]; i++) {
    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
  }
  let returnValue = paraObj[paras.toLowerCase()];
  if (typeof (returnValue) == "undefined") {
    return "";
  } else {
    return returnValue;
  }
}

module.exports = {
  formatTime,
  isIphoneX,
  showLoading,
  hideLoading,
  observerWatch,
  countdown,
  saveImageToPhotosAlbum,
  debounce,
  getQueryVariable,
  pressImageToPhotosAlbum,
}
