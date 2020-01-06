var foods = [
  { image: 'food1.jpg', title: '肯德基（南山店）', star: [2, 2, 2, 2, 2], money: 98, address: '南山大道 寿司', rank: '南山大道寿司排名第一', group: '工作日午市双人餐，精致豪华三人盛宴工作日午市双人餐，尽情享用', coupon: '100元代金券一张，可叠加' },
  { image: 'food2.jpg', title: '海鲜酒楼', star: [1, 1, 1, 1, 0], money: 98, address: '南山大道 寿司', rank: '南山大道寿司排名第一', group: '工作日午市双人餐，精致豪华三人盛宴工作日午市双人餐，尽情享用', coupon: '100元代金券一张，可叠加' },
  { image: 'food1.jpg', title: '肯德基（南山店）', star: [1, 1, 1, 0, 0], money: 88, address: '南山大道 寿司', rank: '南山大道寿司排名第一', group: '工作日午市双人餐，精致豪华三人盛宴工作日午市双人餐，尽情享用', coupon: '100元代金券一张，可叠加' },
  { image: 'food2.jpg', title: '海鲜酒楼', star: [1, 1, 0, 0, 0], money: 58, address: '南山大道 寿司', rank: '南山大道寿司排名第一', group: '工作日午市双人餐，精致豪华三人盛宴工作日午市双人餐，尽情享用', coupon: '100元代金券一张，可叠加' },
  { image: 'food1.jpg', title: '肯德基（南山店）', star: [1, 0, 0, 0, 0], money: 38, address: '南山大道 寿司', rank: '南山大道寿司排名第一', group: '工作日午市双人餐，精致豪华三人盛宴工作日午市双人餐，尽情享用', coupon: '100元代金券一张，可叠加' },
  { image: 'food2.jpg', title: '海鲜酒楼', star: [0, 0, 0, 0, 0], money: 28, address: '南山大道 寿司', rank: '南山大道寿司排名第一', group: '工作日午市双人餐，精致豪华三人盛宴工作日午市双人餐，尽情享用', coupon: '100元代金券一张，可叠加' }
]

var happy = [
  { image: 'happy1.jpg', title: '优剪（南山店）', star: [2, 2, 2, 2, 2], money: 45, address: '学府路 美发', rank: '学府路美发人气榜第一', group: '工作日享受8.8折', coupon: '45抵50代金券' }
]

Page({
  data: {
    foodRank: [
      { name: '热门榜' }, { name: '评价榜' }, { name: '口味榜' },
      { name: '小吃快餐榜' }, { name: '面包甜品榜' }, { name: '粤菜榜' },
      { name: '火锅榜' }, { name: '川菜榜' }, { name: '西餐榜' }
    ],
    qualityList: [
      { title: '必吃榜', detail: '19家餐厅上榜', image: 'food1.jpg'},
      { title: '人气菜品榜', detail: '热搜菜品', image: 'food2.jpg' },
    ],
    detailTitle: '1',
    detailTag: '1',
    tableList: foods
  },
  onLoad: function (options) {
  },
  onPageScroll: function (e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  chooseTitle: function(e) {
    this.setData({
      detailTitle: e.currentTarget.dataset.title
    })
  },
  chooseTag: function (e) {
    if (e.currentTarget.dataset.tag == '1') {
      this.setData({
        tableList: foods,
        detailTag: e.currentTarget.dataset.tag
      }) 
    } else {
      this.setData({
        tableList: happy,
        detailTag: e.currentTarget.dataset.tag
      }) 
    }
  },
})