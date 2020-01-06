var tablelist = []
var pages = 1
Page({
  data: {
    tableList: [],
    footerInfo: ''
  },

  onLoad: function () {
    tablelist = []
    for(let i=0; i<19;i++) {
      let obj = {}
      obj.coverPic = `../../images/coupon/s${i>9 ? i-9 : i+1}.jpg`
      obj.title = `仅售${i+10}元!价值${i+20}元的${i}周年店庆午餐，提供免费酒水`
      obj.shop = `国际美食分店${i+1}`
      obj.money = i + 10
      obj.originMoney = i + 20
      obj.discount = i+1
      tablelist.push(obj)
    }

    this.setData({
      tableList: tablelist.slice(0,6)
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    let _this = this
    pages = 1
    setTimeout(function () {
      _this.setData({
        tableList: tablelist.slice(0, 6)
      })
      wx.stopPullDownRefresh()
    }, 2000)
  },

  //滑动到底部触发懒加载  一页；两条
  onReachBottom: function () {
    let _this = this
    pages++;
    if (tablelist.length > pages * 6) {
      this.setData({
        footerInfo: '加载中...'
      })
      setTimeout(function() {
        _this.setData({
          tableList: tablelist.slice(0, pages * 6 + 1)
        })
      },2000)
    } else {
      this.setData({
        tableList: tablelist,
        footerInfo: '已经到底了'
      })
    }
  }
})