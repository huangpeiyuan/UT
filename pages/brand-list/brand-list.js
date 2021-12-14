// pages/brand-list/brand-list.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catId: "",
    catList: '', // 品牌介绍大分类
    catMiniList: "", // 品牌介绍子分类
    catListId: "", // 选中item
    brandList: "", // 品牌介绍数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      catId: options.id
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
    this.catMiniData();
  },

  // 获取子分类详情
  catMiniData() {
    api.catMiniData({
      data: {
        catId: this.data.catId
      }
    }).then(res => {
      this.setData({
        catList: res.data.catData,
        catMiniList: res.data.catMiniData
      })
      this.getBrand();
    }).catch(err => {
      util.hideLoading()
    })
  },

  // 品牌介绍数据接口
  getBrand() {
    api.getBrand({
      data: {
        catId: this.data.catListId || this.data.catMiniList[0].id
      }
    }).then(res => {
      if (this.data.catListId === "") {
        this.setData({
          catListId: this.data.catMiniList[0].id
        })
      }
      this.setData({
        brandList: res.data.brandData,
      })
    }).catch(err => {
      util.hideLoading()
    })
  },

  // 切换
  changeYear: function (e) {
    let id = e.currentTarget.dataset.id
    if (id !== this.data.catListId) {
      this.setData({
        catListId: id
      })
      this.getBrand()
    }
  },

  // 跳转到详情页
  goDetails(e) {
    let id = e.currentTarget.dataset.id
    console.log(id);
    wx.navigateTo({
      url: `/pages/brand-details/brand-details?id=${id}`,
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