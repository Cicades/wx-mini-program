// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isAuthenticated: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      // 判断是否授权
      success: (data) => {
        let userInfoStatus = data.authSetting['scope.userInfo']
        if(userInfoStatus === true){
          //已授权
          wx.getUserInfo({
            // 获取用户信息
            success: (data) => {
              this.setData({
                userInfo: data.userInfo,
                isAuthenticated: true
              })
            }
          })
        } else if(userInfoStatus === false){
          // 未设置权限，
          wx.openSetting({
            // 打开设置
            success: (data) => {
              // 设置完毕
              if(data['scope.userInfo']){
                wx.getUserInfo({
                  // 获取用户信息
                  success: (data) => {
                    this.setData({
                      userInfo: data.userInfo,
                      isAuthenticated: true
                    })
                  }
                })
              }
            }
          })
        } else{
          // 未获取权限
          wx.showToast({
            title: '点击按钮获取权限！',
            icon: 'none'
          })
        }
      }
    })
  },
  getUserInfoHandle(e) {
    e.detail.userInfo && this.setData({
      userInfo: e.detail.userInfo,
      isAuthenticated: true
    }) 
  },
  goList(){
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }
})