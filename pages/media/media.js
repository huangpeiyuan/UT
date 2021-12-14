const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mediaList: [],
		searchContent: "",
		is_show: "",
		isUpload: true,
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
		this.getMedia();
	},

	// 列表数据
	getMedia() {
		api.getMedia({
			data: {
				search: this.data.searchContent
			}
		}).then(res => {
			// if (res.is_show === 1) {
			// 	this.setData({
			// 		isUpload: true
			// 	})
			// } else {
			// 	this.setData({
			// 		isUpload: false
			// 	})
			// }
			this.setData({
				mediaList: res.data.mediaData,
				is_show: res.is_show
			})
			console.log(this.data.mediaList);
		}).catch(err => {
			util.hideLoading()
		})
	},

	// 搜索
	bindInputBlur(e) {
		this.setData({
			searchContent: e.detail.value.trim()
		})
		this.getMedia();
	},

	// 跳转视频
	jumpVideo(e) {
		// if (this.data.is_show === 1) {
			const id = e.currentTarget.dataset.id;
			wx.navigateTo({
				url: `/pages/video/video?id=${id}`,
			})
		// }
	},

	// 清空输入框
	closeInput() {
		this.setData({
			searchContent: "",
		})
	},

	// 跳转上传页面
	goUpload() {
		let userId = wx.getStorageSync('userId')
		if (userId === "") {
			wx.navigateTo({
				url: "/pages/login/login"
			})
		} else {
			wx.navigateTo({
				url: '/pages/upload/upload',
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