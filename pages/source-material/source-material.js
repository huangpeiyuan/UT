// pages/source-material/source-material.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catalog: "",
    catId: '',
    catalogIndex: 0,
    lists: [],
    isCollection: true, // 收藏按钮
    isTips: false,// 弹框
    percent: 0,
    schedule: false,
    searchContent: "",
    href_id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      href_id: options.id,
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
    this.getMaterial();
  },

  // 发圈素材分类
  getMaterial() {
    let _this = this;
    api.getMaterial().then(res => {
      this.setData({
        catalog: res.data.catData
      })
      _this.loadMore() //产品列表
    }).catch(err => {
      util.hideLoading()
    })
  },

  // 搜索
  bindInputBlur(e) {
    this.setData({
      searchContent: e.detail.value.trim(),
      catId: "",
      catalogIndex: "",
    })
    this.loadMore();
  },

  //切换产品类型
  changeHandle: function (e) {
    let index = Number(e.currentTarget.dataset.catalogindex)
    if (index !== this.data.catalogIndex) {
      this.setData({
        catalogIndex: index,
        catId: this.data.catalog[index].id
      })
      this.loadMore() //产品列表
    }
  },

  // 产品数据
  loadMore() {
    let _this = this
    let userId = wx.getStorageSync('userId')
    let {
      catId
    } = _this.data
    _this.data.loading = true
    // util.showLoading()
    let data = {};
    if (this.data.href_id === undefined && this.data.searchContent === "") {
      data = {
        catId: catId || this.data.catalog[0].id,
        userId: userId,
      }
    } else if (this.data.searchContent !== "") {
      data = {
        userId: userId,
        catId: "",
        search: this.data.searchContent,
      }
    } else {
      data = {
        catId: catId || this.data.href_id,
        userId: userId,
      }
    }
    api.MaterialIndex({
      data: data
    }).then(res => {
      // util.hideLoading()
      if (this.data.href_id !== undefined) {
        _this.setData({
          loading: false,
          lists: res.data.materialData,
          catId: catId || this.data.href_id,
          catalogIndex: this.data.href_id
        })
      } else {
        _this.setData({
          loading: false,
          lists: res.data.materialData,
          catId: catId || this.data.catalog[0].id,
        })
      }
    }).catch(err => {
      _this.data.page--
      _this.data.loading = false
    })
  },

  upper: function () {
    this.loadMore() //产品列表
  },

  lower: function () {
    this.loadMore() //产品列表
  },

  // 操作栏
  operation(e) {
    let id = e.currentTarget.dataset.id
    this.data.lists.forEach(item => {
      if (item.id === id) {
        item.isOperation = !item.isOperation;
      }
    })
    this.setData({
      lists: this.data.lists
    })
  },

  // 收藏
  switchCollection(e) {
    let _this = this;
    let id = e.currentTarget.dataset.id
    let status = e.currentTarget.dataset.status
    let type = e.currentTarget.dataset.type
    let userId = wx.getStorageSync('userId')
    if (userId) {
      _this.data.lists.forEach(item => {
        if (item.id === id) {
          if (_this.data.isCollection === true) {
            api.MaterialOperate({
              data: {
                type: type,
                materialId: id,
                status: status,
                userId: userId
              }
            }).then(res => {
              wx.showToast({
                title: '收藏成功',
                image: '../../images/success.png',
                duration: 2000,
                complete: function () {
                  let timer = setTimeout(function () {
                    clearTimeout(timer)
                    _this.loadMore();
                  }, 1500)
                }
              })
            }).catch(err => {
              util.hideLoading()
            })
          } else {
            api.MaterialOperate({
              data: {
                type: type,
                materialId: id,
                status: status,
                userId: userId
              }
            }).then(res => {
              wx.showToast({
                title: '取消成功',
                image: '../../images/success.png',
                duration: 2000,
                complete: function () {
                  let timer = setTimeout(function () {
                    clearTimeout(timer)
                    _this.loadMore();
                  }, 1500)
                }
              })
            }).catch(err => {
              util.hideLoading()
            })
          }
        }
      })
      this.setData({
        lists: this.data.lists
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }

  },

  // 下载
  downLoad(e) {
    let _this = this;
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    console.log(id);
    this.data.lists.forEach(item => {
      if (item.id === id) {
        // item.isOperation = !item.isOperation;
        // 复制文字
        api.MaterialOperate({
          data: {
            type: type,
            materialId: id,
          }
        }).then(res => {
          wx.setClipboardData({
            data: item.title + item.content,
            success: function (res) {
              wx.hideLoading();
              wx.getClipboardData({
                success: function (res) {
                }
              })
            }
          })
          _this.getsave(0, this.data.lists[index].image.length, index)
          this.setData({
            lists: this.data.lists
          })
        }).catch(err => {
          util.hideLoading()
        })

      }
    })
  },

  // 关闭弹框
  closeTips() {
    this.setData({
      isTips: false,
    })
  },

  // 保存图片
  getsave(i, length, index) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.downloadFile({
      url: this.data.lists[index].image[i],
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            if (i + 1 == length) {
              _this.setData({
                isTips: true
              })
            }
            wx.hideLoading()
            if (++i < length) {
              this.getsave(i, length, index);
            }
          },
          fail: (err) => {
            wx.showToast({
              title: '保存图片失败',
              icon: 'none',
            })
          },
        })
      },
    })
  },

  // 清空输入框
  closeInput() {
    this.setData({
      searchContent: "",
    })
  },

  // 图片预览
  preview(e) {
    let currentUrl = e.currentTarget.dataset.src
    let id = e.currentTarget.dataset.id
    let arr = this.data.lists.filter(item => {
      if (item.id == id) {
        console.log(item);
        return item;
      }
    });
    console.log(arr[0].image);
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: arr[0].image // 需要预览的图片http链接列表
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
  onShareAppMessage: function (res) {
    let id = res.target.dataset.id
    let type = res.target.dataset.type
    console.log(id);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      api.MaterialOperate({
        data: {
          type: type,
          materialId: id,
        }
      }).then(res => {

      }).catch(err => {
        util.hideLoading()
      })
    }
  }
})