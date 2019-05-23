// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    articleList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    let images = require('../../datas/carousel-data.js')
    let {list_data} = require('../../datas/list-data.js')
    this.setData({
      images,
      articleList: list_data
    })
  },
  goDetail: () => {
    
  }
})