// pages/result/result.js

const app = getApp()
var m = app.globalData.mark
var v

Page({

	data:{
		type:"喵喵喵",
		suggestion:"汪汪汪",
		_type : [,"你没有压力","你有轻度压力","你有中度压力","你已经处于重度压力之下"],
		_suggestion : [,
		"做一个有目标有追求的人，有自己的梦想，就勇敢的往前跑，每天努力一点点，向前迈一步，你就越来越靠近你的想要的生活和未来。",
		"整理一下自己的心情，忘记那些不愉快的往事，听听音乐，看看风景，说能说的话，做可做的事，走该走的路，见想见的人。",
		"命里有时终须有，命里无时莫强求。不要往强求那些不属于自己的东西，要学会适时的放弃。",
		"降低心理压力,要学会享受生活,享受大自然,经常运动一下,如果实在是压力太大,可以去寻求心理医生的帮助,保持心理的舒畅。"],
		// miao:1433223
	},

	onLoad: function () {

		if( app.globalData.mark<=15 ) v=1;
		else if ( 16<=app.globalData.mark && 30>=app.globalData.mark  ) v=2;
		else if ( 31<=app.globalData.mark && 45>=app.globalData.mark ) v=3;
		else v=4;

		this.setData({
			type: this.data._type[v]
		})

		this.setData({
			suggestion: this.data._suggestion[v]
		})

		// this.setData({
		// 	miao: m
		// })

	}

})

