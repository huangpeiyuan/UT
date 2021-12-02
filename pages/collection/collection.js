// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        id: 1,
        title: "抗衰修护燕窝美容油",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容。",
        images: [
          {
            id: 1,
            src: "../../images/banner-1.jpg"
          },
          {
            id: 2,
            src: "../../images/banner-2.jpg"
          },
          {
            id: 3,
            src: "../../images/banner-3.jpg"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
      {
        id: 2,
        title: "抗衰修护燕窝美容油22",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容22。",
        images: [
          {
            id: 1,
            src: "https://img0.baidu.com/it/u=3436810468,4123553368&fm=26&fmt=auto"
          },
          {
            id: 2,
            src: "https://img0.baidu.com/it/u=3436810468,4123553368&fm=26&fmt=auto"
          },
          {
            id: 3,
            src: "https://img0.baidu.com/it/u=3436810468,4123553368&fm=26&fmt=auto"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
      {
        id: 3,
        title: "抗衰修护燕窝美容油",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容。",
        images: [
          {
            id: 1,
            src: "../../images/banner-1.jpg"
          },
          {
            id: 2,
            src: "../../images/banner-2.jpg"
          },
          {
            id: 3,
            src: "../../images/banner-3.jpg"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
      {
        id: 4,
        title: "抗衰修护燕窝美容油",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容。",
        images: [
          {
            id: 1,
            src: "../../images/banner-1.jpg"
          },
          {
            id: 2,
            src: "../../images/banner-2.jpg"
          },
          {
            id: 3,
            src: "../../images/banner-3.jpg"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
      {
        id: 5,
        title: "抗衰修护燕窝美容油",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容。",
        images: [
          {
            id: 1,
            src: "../../images/banner-1.jpg"
          },
          {
            id: 2,
            src: "../../images/banner-2.jpg"
          },
          {
            id: 3,
            src: "../../images/banner-3.jpg"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
      {
        id: 6,
        title: "抗衰修护燕窝美容油",
        text: "素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容素材中心文字内容。",
        images: [
          {
            id: 1,
            src: "../../images/banner-1.jpg"
          },
          {
            id: 2,
            src: "../../images/banner-2.jpg"
          },
          {
            id: 3,
            src: "../../images/banner-3.jpg"
          },
        ],
        time: "2021-01-01 22:10:02",
        release: "发布",
        isCollection: true,
        isOperation: false,
      },
    ],
    isTips: false,// 弹框
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

  // 操作栏
  operation(e) {
    let id = e.currentTarget.dataset.id
    this.data.lists.forEach(item => {
      if (item.id === id) {
        item.isOperation = !item.isOperation;
      }
    })
    this.setData({
      lists: this.data.lists
    })
  },

  // 取消收藏
  cancelCollection(e) {
    let id = e.currentTarget.dataset.id
    this.data.lists.forEach(item => {
      if (item.id === id) {
        wx.showModal({
          title: '取消收藏',
          content: '是否取消收藏，请再次确定',
          cancelText:'关闭',
          confirmColor:'#EBCF9A',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
    this.setData({
      lists: this.data.lists
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