//获取应用实例
const app = getApp()

Page({
  data: {
    front: '../../../images/mine/bg_sfzzm.png',
    reverse: '../../../images/mine/bg_sfzzm.png',
    hand: '../../../images/mine/bg_sfzzm.png'
  },
  onLoad: function () {
  },
  openPic: function (e) {
    var self = this
    wx.chooseImage({
      count: 1, // 只能选择一张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(e.currentTarget.dataset.type)
        if (e.currentTarget.dataset.type === '1') {
          self.setData({ front: res.tempFilePaths })
        } else if (e.currentTarget.dataset.type === '2') {
          self.setData({ reverse: res.tempFilePaths })
        } else {
          self.setData({ hand: res.tempFilePaths })
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  }
})
