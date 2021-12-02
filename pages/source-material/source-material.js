// pages/source-material/source-material.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catalog: [
      {
        id: 1,
        name: "健康滋补"
      },
      {
        id: 2,
        name: "健康滋补"
      },
      {
        id: 3,
        name: "健康滋补"
      },
      {
        id: 4,
        name: "健康滋补"
      },
    ],
    catId: '',
    catalogIndex: 0,
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
            src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F19100122420C335-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640860079&t=372c766db9748f63fe26536660c6a95f"
          },
          {
            id: 2,
            src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F19100122420C335-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640860079&t=372c766db9748f63fe26536660c6a95f"
          },
          {
            id: 3,
            src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F19100122420C335-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640860079&t=372c766db9748f63fe26536660c6a95f"
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
    isCollection: true, // 收藏按钮
    isTips: false,// 弹框
    percent: 0,
    schedule: false,
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

  changeHandle: function (e) { //切换产品类型
    let index = Number(e.currentTarget.dataset.catalogindex)
    console.log(e.currentTarget.dataset.catalogindex);
    if (index !== this.data.catalogIndex) {
      this.setData({
        catalogIndex: index,
        catId: this.data.catalog[index].id
      })
      // this.resetLoadData()
      // // 当catalog的选中类型id为1时，默认为优惠券。其他为商品
      // if (this.data.catalog[index].id === 1) {
      //   this.loadCoupons() //产品列表
      // } else {
      //   this.loadMore() //产品列表
      // }
    }
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

  // 收藏
  switchCollection(e) {
    let id = e.currentTarget.dataset.id
    this.data.lists.forEach(item => {
      if (item.id === id) {
        item.isCollection = !item.isCollection;
        if (item.isCollection === false) {
          wx.showToast({
            title: '收藏成功',
            image: '../../images/success.png',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '取消成功',
            image: '../../images/success.png',
            duration: 2000
          })
        }
      }
    })
    this.setData({
      lists: this.data.lists
    })
  },

  // 下载
  downLoad(e) {
    let _this = this;
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index);
    this.data.lists.forEach(item => {
      if (item.id === id) {
        item.isOperation = !item.isOperation;
        // 复制文字
        wx.setClipboardData({
          data: item.title + item.text,
          success: function (res) {
            wx.hideLoading();
            wx.getClipboardData({
              success: function (res) {

              }
            })
          }
        })
        _this.getsave(0, this.data.lists[index].images.length, index)
      }
    })
    this.setData({
      lists: this.data.lists
    })
  },

  // 关闭弹框
  closeTips() {
    this.setData({
      isTips: false,
    })
  },

  // 保存图片
  getsave(i, length, index) {
    var _this = this;
    console.log(this.data.lists[index].images[i].src);
    wx.downloadFile({
      url: this.data.lists[index].images[i].src,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            if (i + 1 == length) {
              _this.setData({
                isTips: true
              })
            }
            wx.hideLoading()
            if (++i < length) {
              this.getsave(i, length, index);
            }
          },
          fail: (err) => {
            wx.showToast({
              title: '保存图片失败',
              icon: 'none',
            })
          },
        })
      },
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