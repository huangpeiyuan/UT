// pages/notice/notice.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeId: '',
    noticeDetails: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      noticeId: options.id
    })
    this.getNoticeDetails();
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

  // 获取公告详情
  getNoticeDetails() {
    var _this = this;
    api.NoticeDetails({
      data: {
        noticeId: _this.data.noticeId
      }
    }).then(res => {
      _this.setData({
        noticeDetails: res.data.noticeData
      })
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