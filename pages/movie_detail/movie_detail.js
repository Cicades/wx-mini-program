// pages/movie_detail/movie_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const api_url = 'http://t.yushu.im/v2/movie/top250'
    wx.request({
      url: api_url,
      success: (data) => {
        let movies = data.data.subjects
        let id = options.id
        let movie = movies.find(item => {
          return item.id == id
        })
        movie.casts = movie.casts.map(item => item.name).join(' ')
        movie.directors = movie.directors.map(item => item.name).join(' ')
        this.setData({
          movie
        })
      }
    })
  }
})