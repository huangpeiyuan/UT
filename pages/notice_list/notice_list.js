// pages/notice_list/notice_list.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoticeList();
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

  // 获取公告列表
  getNoticeList() {
    var _this = this;
    api.getNoticeList().then(res => {
      _this.setData({
        noticeList:res.data.noticeData
      })
    }).catch(err => {
      util.hideLoading()
    })
  },

  // 跳转到公告详情
  jump(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/notice/notice?id=${id}`,
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