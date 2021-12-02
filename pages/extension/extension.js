// pages/home/index.js
// const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
import Card from './card';
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posterImg: 0, //海报图片数量
    image: "",
    message: "",
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

  imgOnLoad: function () {
    this.setData({
      paintPallette: new Card(this.data.message).palette(),
    });
  },

  // painter
  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.setData({
      image: this.imagePath
    })
  },

  loadFinish() {
    this.data.posterImg++
    if (this.data.posterImg == 2) {
      this.setData({
        paintPallette: new Card(this.data.message).palette(),
      });
      console.log(this.data.paintPallette)
    }
  },

  saveImage() {
    util.showLoading()
    this.isSave = true
    if (this.imagePath && typeof this.imagePath === 'string') {
      this.isSave = false;
      util.saveImageToPhotosAlbum(this.imagePath)
      util.hideLoading(true)
    }
    util.hideLoading()
    console.log(111)
  },
})