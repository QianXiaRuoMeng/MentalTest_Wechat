//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: '测测你的心理压力有多大'
  },
	onLaunch: function () {
		app.globalData.q[1] = "喵喵喵";
		app.globalData.q[2] = "汪汪汪";
		app.globalData.q[3] = "咕咕咕";
	},
  startTest:function(){
	  wx.navigateTo({
		  url: '/pages/test/test',
	  })
  }
})
