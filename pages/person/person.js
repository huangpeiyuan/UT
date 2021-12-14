// pages/person/person.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		code: '',
		userinfo: null,
		phoneinfo: null,
		hasUserInfo: false,
		isLoading: false, //是否正在保存用户信息
		notice: "",
		userCode: "",
		rawData: {},
		userInof: "",
		banner: "",
		isUser: true,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getBannerData();
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
		this.getNotice();
		this.getUserInfo();
	},

	// 个人信息
	getUserInfo() {
		let userId = wx.getStorageSync('userId')
		api.getUserInfo({
			data: {
				userId: userId
			}
		}).then(res => {
			this.setData({
				userInof: res.data.user,
				isUser: false,
			})
		}).catch(err => {
			util.hideLoading()
		})
	},

	// 通知
	getNotice() {
		api.getFirstNoticeData().then(res => {
			this.setData({
				notice: res.data.noticeData
			})
		}).catch(err => {
			util.hideLoading()
		})
	},

	// 跳转到通知详情
	jumpNotice(e) {
		const id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: `/pages/notice/notice?id=${id}`,
		})
	},

	// banner图
	getBannerData() {
		api.getBannerData().then(res => {
			this.setData({
				banner: res.data.bannerData[2]
			})
		}).catch(err => {
			util.hideLoading()
		})
	},

	// 跳转到收藏
	goCollection() {
		let userId = wx.getStorageSync('userId')
		if (userId === "") {
			wx.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			wx.navigateTo({
				url: '/pages/collection/collection'
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