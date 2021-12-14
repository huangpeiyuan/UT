// pages/upload/upload.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoSrc: "",
    title: "",
    cover: "",
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

  //选择视频
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
        let src = res.tempFilePath
        that.uploadVideo(src);
      }
    })
  },

  //上传视频 
  uploadVideo: function (files) {
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.uploadFile({
      url: 'https://ut.315mao.com/Api/Media/uploadQiniu',//服务器接口
      filePath: files,
      name: 'file',//服务器定义的Key值
      success(res) {
        const dataset = JSON.parse(res.data)
        let src = dataset.data.src
        console.log(src);
        wx.showToast({
          title: '上传成功',
          duration: 2000,
        })
        _this.setData({
          videoSrc: src
        })
      },
      fail() {
        console.log('接口调用失败')
      }
    })
  },

  // 获取封面
  chooseAvatar: function () {
    wx.chooseImage({
      sizeType: 'compressed',
      success: (res) => {
        let src = res.tempFiles[0].path
        this.uploadAvatar(src);
      }
    })
  },

  // 把封面上传到服务器
  uploadAvatar: function (files) {
    let _this = this;
    wx.uploadFile({
      url: 'https://ut.315mao.com/Api/Media/uploadQiniu',
      filePath: files,
      name: 'file',
      formData: {
        'dir': 'feedback'
      },
      success(res) {
        const data = JSON.parse(res.data)
        _this.setData({
          cover: data.data.src + '?' + Math.random() / 9999
        })
        console.log(_this.data.cover);
        wx.showToast({
          title: '上传成功',
          duration: 2000,
        })
      },
      fail: function (err) {

      }
    })
  },

  // 获取文本框
  bindTextAreaBlur(e) {
    console.log(e.detail.value);
    this.setData({
      title: e.detail.value
    })
  },

  // 提交
  Mediainsert() {
    let _this = this;
    let userId = wx.getStorageSync('userId')
    if (this.data.videoSrc === "") {
      wx.showToast({
        title: '请上传视频',
        icon: "none",
        duration: 2000,
      })
    } else if (this.data.cover === "") {
      wx.showToast({
        title: '请上传封面图',
        icon: "none",
        duration: 2000,
      })
    } else if (this.data.title === "") {
      wx.showToast({
        title: '请输入视频标题 ',
        icon: "none",
        duration: 2000,
      })
    } else {
      api.Mediainsert({
        data: {
          userId: userId,
          title: this.data.title,
          path: this.data.videoSrc,
          image: this.data.cover,
        }
      }).then(res => {
        wx.showToast({
          title: '发表成功',
          duration: 2000,
        })
        this.setData({
          title: "",
          videoSrc: "",
          cover: "",
        })
      }).catch(err => {
        util.hideLoading()
      })
    }
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