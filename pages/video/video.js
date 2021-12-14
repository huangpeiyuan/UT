// pages/video/video.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: "",
    mediaId: '',
    shareType: true,
    isVideo: true,
    is_show: "",
    extraProps: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mediaId: options.id,
    })
    this.getShowStatus();
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 分享按钮
  showShareType() {
    this.setData({
      shareType: false,
    })
  },

  // 关闭按钮
  closeAllLayer() {
    this.setData({
      shareType: true,
    })
  },

  return() {
    wx.switchTab({
      url: '/pages/media/media'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.MediaDetails();
  },

  // 列表数据
  MediaDetails() {
    var _this = this;
    api.MediaDetails({
      data: {
        mediaId: _this.data.mediaId
      }
    }).then(res => {
      this.setData({
        videoList: res.data.mediaData
      })
      console.log(this.data.videoList.path);
      const extraProps = {
        //传递参数
        src: this.data.videoList.path,
        controls: true,
        autoplay: true,
      };
      this.setData({
        extraProps: extraProps
      })
      console.log(extraProps);
    }).catch(err => {
      util.hideLoading()
    })
  },

  // 跳转到海报
  createPoster(e) {
    let obj = e.currentTarget.dataset.obj;
    wx.navigateTo({
      url: `/pages/extension/extension?id=${JSON.stringify(obj)}`,
    })
    this.setData({
      shareType: true,
      isVideo: false,
    })
  },

  getShowStatus() {
    api.getShowStatus().then(res => {
      this.setData({
        is_show: res.is_show
      })
      // if (this.data.is_show === 2) {
      //   wx.reLaunch({
      //     url: `/pages/classroom-details/classroom-details?id=${1}`
      //   })
      // }
    }).catch(err => {
      util.hideLoading()
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