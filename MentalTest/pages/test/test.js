// pages/test/test.js

const app = getApp()

// var q = new Array();
var i = 1;
var n = 15;
// var text1="喵";
// var text2;

Page({

	data:{
		q: [,
		"我发现自己为很细微的事而烦恼",
		"我似乎神经过敏",
		"若受到阻碍，我会感到很不耐烦",
		"我对事情往往作出过度反应",
		"我发现自己很容易心烦意乱",
		"我发现自己很容易受刺激",
		"我感到长期处于高警觉的状态",
		"我感到自己很易被触怒",
		"我觉得自己消耗很多精神",
		"我觉得很难让自己安静下来",
		"受刺激后，我感到很难平心静气",
		"我神经紧张",
		"我感到很难放松",
		"我感到忐忑不安",
		"我很难忍受学习时受到阻碍"],
		// i : 1,
		// n : 3,
		text1 : "第1题",
		text2: "我发现自己为很细微的事而烦恼"
	},

	next: function () {
		i++;
		if (i <= n) {
			this.data.text1 = "第" + i + "题";
			this.setData({
				text1: this.data.text1
			})
			this.data.text2 = this.data.q[i];
			this.setData({
				text2: this.data.text2
			})
		}
		else {
			wx.navigateTo({
				url: '/pages/result/result',
			})
		}
	},

	select1: function()
	{
		getApp().globalData.mark += 1;
		this.next();
	},

	select2: function () {
		getApp().globalData.mark += 2;
		this.next();
	},

	select3: function () {
		getApp().globalData.mark += 3;
		this.next();
	},

	select4: function () {
		getApp().globalData.mark += 4;
		this.next();
	}

	
})
