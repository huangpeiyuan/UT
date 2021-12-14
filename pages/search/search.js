// pages/search/search.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        id: 1,
        title: "抗衰修护燕窝美容油",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容。",
        images: [
          {
            id: 1,
            src: "../../images/banner-1.jpg"
          },
          {
            id: 2,
            src: "../../images/banner-2.jpg"
          },
          {
            id: 3,
            src: "../../images/banner-3.jpg"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
      {
        id: 2,
        title: "抗衰修护燕窝美容油22",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容22。",
        images: [
          {
            id: 1,
            src: "https://img0.baidu.com/it/u=3436810468,4123553368&fm=26&fmt=auto"
          },
          {
            id: 2,
            src: "https://img0.baidu.com/it/u=3436810468,4123553368&fm=26&fmt=auto"
          },
          {
            id: 3,
            src: "https://img0.baidu.com/it/u=3436810468,4123553368&fm=26&fmt=auto"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
      {
        id: 3,
        title: "抗衰修护燕窝美容油",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容。",
        images: [
          {
            id: 1,
            src: "../../images/banner-1.jpg"
          },
          {
            id: 2,
            src: "../../images/banner-2.jpg"
          },
          {
            id: 3,
            src: "../../images/banner-3.jpg"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
      {
        id: 4,
        title: "抗衰修护燕窝美容油",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容。",
        images: [
          {
            id: 1,
            src: "../../images/banner-1.jpg"
          },
          {
            id: 2,
            src: "../../images/banner-2.jpg"
          },
          {
            id: 3,
            src: "../../images/banner-3.jpg"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
      {
        id: 5,
        title: "抗衰修护燕窝美容油",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容。",
        images: [
          {
            id: 1,
            src: "../../images/banner-1.jpg"
          },
          {
            id: 2,
            src: "../../images/banner-2.jpg"
          },
          {
            id: 3,
            src: "../../images/banner-3.jpg"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
      {
        id: 6,
        title: "抗衰修护燕窝美容油",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容。",
        images: [
          {
            id: 1,
            src: "../../images/banner-1.jpg"
          },
          {
            id: 2,
            src: "../../images/banner-2.jpg"
          },
          {
            id: 3,
            src: "../../images/banner-3.jpg"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
    ],
    isCollection: true, // 收藏按钮
    isTips: false,// 弹框
    percent: 0,
    schedule: false,
    isSearch: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // 清空历史
  emptyHistory() {
    wx.showModal({
      title: '清空历史记录',
      content: '是否要清空历史记录',
      cancelText: '关闭',
      confirmColor: '#EBCF9A',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
    console.log(status);
    let userId = wx.getStorageSync('userId')
    if (userId !== null) {
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
                duration: 2000
              })
              this.setData({
                isCollection: false,
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
                duration: 2000
              })
              this.setData({
                isCollection: true,
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
      wx.showToast({
        title: '请登录',
        icon: "none",
        duration: 2000
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
    console.log(this.data.lists[index].image[i]);
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