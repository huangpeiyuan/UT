// index.js
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rotationList: [], // 轮播图
    bannerList: [],  // banner图
    curriculumNum: '', // 总数
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
    this.getIndex();
  },

  getIndex: function () {
    let _this = this
    util.showLoading()
    api.getIndex().then(res => {
      util.hideLoading()
      _this.setData({
        rotationList: res.data.rotationData,
        bannerList: res.data.bannerData,
        curriculumNum: res.data.curriculumNum,
      })
    }).catch(err => {
      util.hideLoading()
    })
  },

  // 轮播图跳转
  jump(e) {
    let id = e.currentTarget.dataset.href_id;
    let type = Number(e.currentTarget.dataset.href_type);
    console.log(id);
    if (type === 1) {
      wx.navigateTo({
        url: `/pages/brand-list/brand-list?id=${id}`,
      })
    } else if (type === 2) {
      wx.reLaunch({
        url: `/pages/source-material/source-material?id=${id}`,
      })
    } else if (type === 3) {
      wx.navigateTo({
        url: `/pages/classroom-details/classroom-details?id=${id}`,
      })
    } else if (type === 4) {
      wx.navigateTo({
        url: `/pages/core-details/core-details?id=${id}`,
      })
    }
  },

  // banner跳转
  jumpBanner(e) {
    let id = e.currentTarget.dataset.href_id;
    let type = Number(e.currentTarget.dataset.href_type);
    console.log(id);
    if (type === 1) {
      wx.navigateTo({
        url: `/pages/brand-list/brand-list?id=${id}`,
      })
    } else if (type === 2) {
      wx.reLaunch({
        url: `/pages/source-material/source-material?id=${id}`,
      })
    } else if (type === 3) {
      wx.navigateTo({
        url: `/pages/classroom-details/classroom-details?id=${id}`,
      })
    } else if (type === 4) {
      wx.navigateTo({
        url: `/pages/core-details/core-details?id=${id}`,
      })
    }
  },

  // 课程跳转
  jumpClass(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: `/pages/classroom-details/classroom-details?id=${id}`,
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
