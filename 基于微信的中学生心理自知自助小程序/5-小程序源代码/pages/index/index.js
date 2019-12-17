//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
	  name: '面对考试，你焦虑吗？',
    introduction:'考试焦虑（test anxiety），是指因考试压力过大而引发的系列异常生理心理现象，包括考前焦虑，临场焦虑（晕考）及考后焦虑紧张。心理学认为，心理紧张水平与活动效果呈倒“U ”字曲线关系。紧张水平过低和过高，都会影响成绩。适度的心理紧张，可以使人对考试有种激励作用，产生良好的活动效果。但过度的考试紧张则导致考试焦虑，影响考场表现，并波及身心健康。'
  },
	onLaunch: function () {
		app.globalData.q[1] = "喵喵喵";
		app.globalData.q[2] = "汪汪汪";
		app.globalData.q[3] = "咕咕咕";
	},

	popConfirm: function () {
		wx.showModal({
			title: '指导语',
			showCancel: false,
			content: '此量表用于测定初中以上学生在考试期间的焦虑水平。下列37个句子描述人们对参加考试的感受，请你阅读每一个句子，然后根据你的实际情况（感受）回答（是或否），答案没有对错、好坏之分，只求按实际情况选择，尽可能快些作答，但切勿遗漏。',
		})
	},

  startTest:function(){
	  this.popConfirm();
	  wx.navigateTo({
		  url: '/pages/test/test',
	  })
  },

  jump: function () {
		this.popConfirm();
		wx.navigateTo({
			url: '/pages/result/result',
		})
	}
})
