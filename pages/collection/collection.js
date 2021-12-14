// pages/collection/collection.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    isTips: false,// 弹框
    imgList: "",
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
    this.collectionData();
  },

  // 发圈素材分类
  collectionData() {
    let userId = wx.getStorageSync('userId')
    api.collectionData({
      data: {
        userId: userId,
      }
    }).then(res => {
      this.setData({
        lists: res.data.materialData
      })
      this.data.lists.forEach(item => {
        this.setData({
          imgList: item.image
        })
      })
    }).catch(err => {
      util.hideLoading()
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

  // 取消收藏
  cancelCollection(e) {
    let _this = this;
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    let status = e.currentTarget.dataset.status
    let userId = wx.getStorageSync('userId')
    this.data.lists.forEach(item => {
      if (item.id === id) {
        wx.showModal({
          title: '取消收藏',
          content: '是否取消收藏，请再次确定',
          cancelText: '关闭',
          confirmColor: '#EBCF9A',
          success(res) {
            if (res.confirm) {
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
                      _this.collectionData();
                    }, 1500)
                  }
                })
              }).catch(err => {
                util.hideLoading()
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
    this.setData({
      lists: this.data.lists
    })
  },

  // 图片预览
  preview(e) {
    let currentUrl = e.currentTarget.dataset.src
    let id = e.currentTarget.dataset.id
    let arr = this.data.lists.filter(item => {
      if (item.id == id) {
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