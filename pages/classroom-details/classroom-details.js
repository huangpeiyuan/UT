// pages/classroom-details/classroom-details.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoId: "",
    CurriculumList: "",
    playStatus: true,
    istype: "",
    is_show: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    this.setData({
      videoId: options.id,
    })
    _this.CurriculumDetails();
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
    this.getShowStatus()
  },

  // 行动力大学数据
  CurriculumDetails() {
    api.CurriculumDetails({
      data: {
        curriculumId: this.data.videoId
      }
    }).then(res => {
      let type = Number(res.data.curriculumData.type)
      this.setData({
        CurriculumList: res.data.curriculumData,
        istype: type
      })
      console.log(this.data.CurriculumList.path[0]);
      const extraProps = {
        //传递参数
        src: this.data.CurriculumList.path[0],
        controls: true,
        autoplay: true,
      };
      this.setData({
        extraProps: extraProps
      })
      if (this.data.istype === 2) {
        this.playMusic();
      }
    }).catch(err => {
      util.hideLoading()
    })
  },

  playMusic: function () {
    let audio = this.data.CurriculumList;
    console.log(audio.path[0]);
    let manager = wx.getBackgroundAudioManager();
    // 设置了 src 之后会自动播放
    manager.title = audio.title || "音频标题";
    manager.src = audio.path[0];
    manager.currentTime = 0;
    let that = this;
    manager.onPlay(function () {
      console.log("======onPlay======");
      that.setData({
        playStatus: true
      })
      that.countTimeDown(that, manager);
    });
    manager.onPause(function () {
      that.setData({
        playStatus: false
      })
      console.log("======onPause======");
    });
    manager.onEnded(function () {
      console.log("======onEnded======");
      that.setData({
        playStatus: false
      })
    });
  },

  //循环计时
  countTimeDown: function (that, manager, cancel) {
    if (that.data.playStatus) {
      setTimeout(function () {
        if (that.data.playStatus) {
          // console.log("duration: " + manager.duration);
          // console.log(manager.currentTime);
          that.setData({
            progress: Math.ceil(manager.currentTime),
            progressText: that.formatTime(Math.ceil(manager.currentTime)),
            duration: Math.ceil(manager.duration),
            durationText: that.formatTime(Math.ceil(manager.duration))
          })
          that.countTimeDown(that, manager);
        }
      }, 1000)
    }
  },

  //拖动事件
  sliderChange: function (e) {
    let manager = wx.getBackgroundAudioManager();
    manager.pause();
    manager.seek(e.detail.value);
    this.setData({
      progressText: this.formatTime(e.detail.value)
    })
    setTimeout(function () {
      manager.play();
    }, 1000);
  },


  //格式化时长
  formatTime: function (s) {
    let t = '';
    s = Math.floor(s);
    if (s > -1) {
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec;
    }
    return t;
  },

  //播放按钮
  playOrpause: function () {
    let manager = wx.getBackgroundAudioManager();
    if (this.data.playStatus) {
      manager.pause();
    } else {
      manager.play();
    }
  },

  getShowStatus() {
    api.getShowStatus().then(res => {
      this.setData({
        is_show: res.is_show
      })
      console.log(this.data.is_show);
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