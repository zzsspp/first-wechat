
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
let app = getApp()
let showLikes = [
  { name: 'Pelicana百利家炸鸡', detail: '[12店通用]低至6.6折单人餐', saleMoney: '13.8', money: '21', amount: '304', pic: 'g1.jpg' },
  { name: '御风人商务减脂餐', detail: '[市中心区]超值双人餐', saleMoney: '38', money: '68', amount: '128', pic: 'g2.jpg' },
  { name: 'Pelicana百利家炸鸡', detail: '[12店通用]低至6.6折单人餐', saleMoney: '13.8', money: '21', amount: '304', pic: 'g1.jpg' },
  { name: '御风人商务减脂餐', detail: '[市中心区]超值双人餐', saleMoney: '38', money: '68', amount: '128', pic: 'g2.jpg' },
  { name: 'Pelicana百利家炸鸡', detail: '[12店通用]低至6.6折单人餐', saleMoney: '13.8', money: '21', amount: '304', pic: 'g1.jpg' },
  { name: '御风人商务减脂餐', detail: '[市中心区]超值双人餐', saleMoney: '38', money: '68', amount: '128', pic: 'g2.jpg' }
]
let pages = 1

Page({
  data: {
    showIcon:[
      { pic: '1.png', name: '美食' }, { pic: '2.png', name: '外卖' },
      { pic: '3.png', name: '休闲娱乐' }, { pic: '4.png', name: '酒店' },
      { pic: '5.png', name: '电影/演出' }, { pic: '6.png', name: '丽人' },
      { pic: '7.png', name: '周边游' }, { pic: '8.png', name: '购物/商场' },
      { pic: '9.png', name: '机票' }, { pic: '10.png', name: '维修' },
    ],
    showDetailIcon:[
      { pic: 'd1.png', name: '蛋糕' }, { pic: 'd2.png', name: '果汁' },
      { pic: 'd3.png', name: '煎饼' }, { pic: 'd4.png', name: '烤鸡' },
      { pic: 'd5.png', name: '披萨' }, { pic: 'd6.png', name: '沙拉' },
      { pic: 'd7.png', name: '意大利面' }, { pic: 'd8.png', name: '鱼' },
      { pic: 'd9.png', name: '葡萄酒' }, { pic: 'd10.png', name: '香槟' },
    ],
    adPic: ['ad1.jpg', 'ad2.jpg', 'ad3.jpg', 'ad4.jpg'],
    countdown:[],
    city: '深圳市',
    showLikes:[
      { name: 'Pelicana百利家炸鸡', detail: '[12店通用]低至6.6折单人餐', saleMoney: '13.8', money: '21', amount: '304', pic: 'g1.jpg' },
      { name: '御风人商务减脂餐', detail: '[市中心区]超值双人餐', saleMoney: '38', money: '68', amount: '128', pic: 'g2.jpg' }
    ],
    footerInfo: ''
  },

  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: '4N4BZ-44HYU-IFMV4-BVZUW-XLRMF-HYFT7'
    });
    this.getcountDown('03:00:00')  //获取当前时间
  },
  onShow: function() {
    if (app.globalData.cityName) {
      this.setData({
        city: app.globalData.cityName
      })
    } else {
      this.loadInfo()  //wx获取当前定位
    }
  },
  /*wx获取当前定位*/
  loadInfo: function () {
    var _this = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        var longitude = res.longitude
        var latitude = res.latitude
        _this.loadCity(longitude, latitude)
      },fail: function (err) {
        console.log(err)
      }
    })
  },
  /*获取wx定位对应的城市*/
  loadCity: function (longitude, latitude) {
    const _this = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        const city = res.result.ad_info.city
        _this.setData({
          city: city
        })

      },fail: function (res) {
        console.log(res);
      }
    })
  },
  //搜索
  searchDetail: function(e){
    console.log(e.detail.value)
  },
  /*获取当前时间*/
  getcountDown:function(data){
    const _this = this
    //初始赋值
    this.setData({
      countdown: data.split(':')
    })
    let countdown = data.split(':').map(Number)

    //每隔一秒显示当前时间
    let time = setInterval(function () {
      countdown = countdown.map(Number)
      if (countdown[0] === 0 && countdown[1] === 0 && countdown[2] === 0) {
        clearTimeout(time)
      } else {
        if (countdown[2] === 0) {
          if (countdown[1] === 0) {
            countdown[0]--
            countdown[1] = 59
            countdown[2] = 59
          } else {
            countdown[1]--
            countdown[2] = 59
          }
        } else {
          countdown[2]--
        }
      }
      countdown[0] = countdown[0] < 10 ? '0' + countdown[0] : countdown[0]
      countdown[1] = countdown[1] < 10 ? '0' + countdown[1] : countdown[1]
      countdown[2] = countdown[2] < 10 ? '0' + countdown[2] : countdown[2]
      _this.setData({
        countdown: countdown
      })
    }, 1000)
  },
  /*变化城市*/
  changeCity() {
    wx.navigateTo({
      url: 'changeCity/changeCity?city='+this.data.city
    })
  },
  //滑动到底部触发懒加载  一页；两条
  onReachBottom: function () {
    let _this = this
    pages++;
    if (showLikes.length > pages * 2) {
      this.setData({
        footerInfo: '加载中...'
      })
      setTimeout(function () {
        _this.setData({
          showLikes: showLikes.slice(0, pages * 2 + 1)
        })
      }, 2000)
    } else {
      this.setData({
        showLikes: showLikes,
        footerInfo: '已经到底了'
      })
    }
  }
})