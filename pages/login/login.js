let app = getApp()
Page({
  data: {

  },
  onLoad: function () {
  },
  getUserInfo() {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          //已授权，可以获取用户信息
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo
              wx.switchTab({
                url: '../index/index',
              })
            }
          })
        }
      }
    })
  }
})
