// pages/university/university.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		type: 1, // 1是视频，2是语音
		CurriculumList: "",
		banner: "",
		is_show: "",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getBannerData();
		this.getShowStatus();
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
		this.getCurriculum();
	},

	// 行动力大学数据
	getCurriculum() {
		api.Curriculum({
			data: {
				type: this.data.type
			}
		}).then(res => {
			this.setData({
				CurriculumList: res.data.curriculumData
			})
		}).catch(err => {
			util.hideLoading()
		})
	},

	// 切换视频和语音
	changeHandle(e) {
		let type = Number(e.currentTarget.dataset.type)
		console.log(type);
		this.setData({
			type: type,
			CurriculumList: []
		})
		this.getCurriculum();
	},

	// 跳转
	jump(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '/pages/classroom-details/classroom-details?id=' + id
		})
	},

	// banner图
	getBannerData() {
		api.getBannerData().then(res => {
			this.setData({
				banner: res.data.bannerData[3]
			})
		}).catch(err => {
			util.hideLoading()
		})
	},

	getShowStatus() {
		api.getShowStatus().then(res => {
			this.setData({
				is_show: res.is_show
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