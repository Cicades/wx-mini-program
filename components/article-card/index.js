// components/article-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleInfo:{
      type: Object
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){
      wx.navigateTo({
        url: '/pages/detail/detail?index=' + this.properties.articleInfo.postId,
      })
    }
  }
})
