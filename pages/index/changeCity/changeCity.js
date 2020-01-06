let app = getApp()
let City = require('../../../utils/allcity.js')
let nationCity = require('../../../utils/nationcity.js')
let cityItem = []
let pages = 1
console.log(City)
Page({
  data: {
    tabType: 0,
    city: '深圳市',
    tagCity: [],  //右侧的字母排序
    hotCity:[],  //热门城市
    typeCity:[],   //字母对应的城市,
    tag: '',  //当前选中的字母
    tipsInfo: ''
  },
  onLoad: function (city) {
    if(city === '{}'){
      this.setData({
        city: city.city
      })
    }
    this.getDefaultCity()
  },

  // 初始默认页面内容获取
  getDefaultCity(){
    let tagCity = []
    for(let i=1;i<City.length;i++){
      tagCity.push(City[i].title)
    }
    cityItem = City[1].item
    this.setData({
      tagCity: tagCity,
      hotCity: City[0].item,
      typeCity: cityItem.slice(0, 11),
      tag:'A'
    })
  },

  //顶部tab改变
  changeTab:function(event){
    if(event.detail.index===1) {
      this.setData({
        tagCity: [],
        hotCity: nationCity[0].item,
        typeCity: [],
        tag: ''
      })
    } else {
      this.getDefaultCity()
    }
    this.setData({
      tabType: event.detail.index
    })
  },
  
  //选项城市标签
  chooseCityTag:function(e){
    for (let i = 0; i < City.length; i++) {
      if (e.target.dataset.item == City[i].title) {
        cityItem = City[i].item
        this.setData({
          typeCity: cityItem.slice(0,11),  //初次加载，只加载前10条
          tag: e.target.dataset.item
        })
        return
      }
    }
  },

  //城市选择
  chooseCity(e) {
    app.globalData.cityName = e.target.dataset.name
    console.log(app.globalData.cityName)
    wx.switchTab({
      url: '../index'
    })
  },

  //滑动到底部触发懒加载
  onReachBottom: function () {
    pages++;
    if (cityItem.length > pages*10) {
      this.setData({
        typeCity: cityItem.slice(0, pages*10+1),
        tipsInfo: '加载中...'
      })
    } else {
      this.setData({
        typeCity: cityItem,
        tipsInfo: '已经到底了'
      })
    }
  }
  
})