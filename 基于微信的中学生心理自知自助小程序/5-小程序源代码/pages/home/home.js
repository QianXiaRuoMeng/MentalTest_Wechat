//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
	  
  },
  
	// onLaunch: function () {

  //   setTimeout(function () {
  //     // wx.navigateTo({
  //     //   url: '/pages/test/test',
  //     // })

  //     console.log('喵喵喵');

    
	// })
  // }

  miao: function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }

})
