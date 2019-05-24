// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleInfo: {},
    hasShared: false,
    hasCollected: false,
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index
    let {search} = require('../../datas/list-data.js')
    let sharedList = wx.getStorageSync('sharedList')
    let hasShared = sharedList && sharedList[index] ? sharedList[index] : false
    this.setData({
      articleInfo: search(index),
      hasShared
    })
    // 设置音乐播放器监听
    const m = wx.getBackgroundAudioManager()
    m.onEnded(() => {
      this.data.isPlayingMusic = false
    })
    m.onPlay(()=>{
      this.setData({
        isPlayingMusic: true
      })
    })
    m.onPause(()=>{
      this.setData({
        isPlayingMusic: false
      })
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
    const m = wx.getBackgroundAudioManager()
    m.stop()
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

  },
  onOperate(e){
    let type = e.target.dataset.operation
    switch (type){
      case 'share':
        let res = !this.data.hasShared
        let oldList = wx.getStorageSync('sharedList') || {}
        console.log(oldList)
        oldList[this.data.articleInfo.postId] = res
        let newList = oldList
        wx.setStorage({
          key: 'sharedList',
          data: newList,
          success: () => {
            this.setData({
              hasShared: res
            })
          }
        })
        break
      case 'collect':
        this.setData({
          hasCollected: !this.data.hasCollected
        })
        break
      default:
        return
    }
  },
  onMusicPlay(){
    const music = this.data.articleInfo.music
    const m = wx.getBackgroundAudioManager()
    if (m.src === music.dataUrl){
      this.data.isPlayingMusic ? m.pause() : m.play()
    } else {
      m.title = music.title
      m.epname = music.title
      m.coverImgUrl = music.coverImgUrl
      m.src = music.dataUrl
    }
    this.setData({
      isPlayingMusic: !this.data.isPlayingMusic
    })
  }
})