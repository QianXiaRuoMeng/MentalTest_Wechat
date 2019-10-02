define("wkcommon:widget/ui/pay/cart/cart.js",function(t,s,e){var a=t("wkcommon:widget/ui/lib/jquery/jquery.js"),o=t("wkcommon:widget/ui/js_core/mvp/event/event.js").custEvent,r=t("wkcommon:widget/lib/fis/data/data.js"),c=function(){var t=this;a.extend(t,new o),this.goodsNum=null,this.listGoods(0)};c.prototype={api:{add:"/cart/interface/additem",del:"/cart/interface/deleteitem",check:"/cart/interface/checkitem",list:"/cart/interface/getcartgoods"},defaultsSetting:{type:"POST",dataType:"json",success:function(){},error:function(){},defaultImage:!0},_msg:{UNKNOW_ERROR:"\u64cd\u4f5c\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5",ADD_GOODS_SUCESS:"\u6dfb\u52a0\u8d2d\u7269\u8f66\u6210\u529f",DELETE_GOODS_SUCESS:"\u5220\u9664\u6210\u529f",DELETE_GOODS_ERROR:"\u5220\u9664\u5931\u8d25",100:"\u6dfb\u52a0\u8d2d\u7269\u8f66\u5931\u8d25",101:"\u56fe\u4e66\u5df2\u8d2d\u4e70",104:'\u8d2d\u7269\u8f66\u5df2\u6ee1\uff0c\u8bf7\u5148<a href="/cart/mycart">\u53bb\u652f\u4ed8</a>'},_getMsg:function(t){return this._msg[t]?this._msg[t]:this._msg[100]
},addGoods:function(t,s){var e=this;a.isArray(t)&&(t=t.join("|")),s=s||{};var o=s.success;s.success=function(t,a,i){var r;try{r=t.data.cart,e._setGoodsNum(r.goodsnum),+r.status>=200||102==+r.status?(o&&o(r,e._getMsg("ADD_GOODS_SUCESS")),e.fire("onAddGoods",r)):s.error(i,e._getMsg(+r.status),r)}catch(c){s.error(i,e._getMsg("UNKNOW_ERROR"),t)}},s=a.extend({},this.defaultsSetting,s),s.url=this.api.add,s.data={doc_ids:t},a.ajax(s)},deleteGoods:function(t,s){var e=this;a.isArray(t)&&(t=t.join("|")),s=s||{};
var o=s.success;s.success=function(t,a,i){var r;try{r=t.data.cart,e._setGoodsNum(r.goodsnum),+r.status>=200?(o&&o(r,e._getMsg("DELETE_GOODS_SUCESS")),e.fire("onDeleteGoods",r)):s.error(i,e._getMsg("DELETE_GOODS_ERROR"),r)}catch(c){s.error(i,e._getMsg("UNKNOW_ERROR"),t)}},s=a.extend({},this.defaultsSetting,s),s.url=this.api.del,s.data={doc_ids:t},a.ajax(s)},checkGoods:function(t,s){var e=this;a.isArray(t)&&(t=t.join("|")),s=s||{};var o=s.success;s.success=function(t,a,i){var r;try{r=t.data.cart,e._setGoodsNum(r.goodsnum),102==+r.status?o&&o(r,!0):300==+r.status?o&&o(r,!1):s.error(i,e._getMsg("DELETE_GOODS_ERROR"),r)
}catch(c){s.error(i,e._getMsg("UNKNOW_ERROR"),t)}},s=a.extend({},this.defaultsSetting,s),s.url=this.api.check,s.data={doc_ids:t},a.ajax(s)},listGoods:function(t,s){var e=this;"object"==typeof t&&(s=t,t=""),s=s||{};var o=s.success;s.success=function(t,a,i){var r;try{r=t.data.cart,e._setGoodsNum(r.goodsnum),s.defaultImage&&e._defaultImage(r),o&&o(r)}catch(c){s.error(i,e._getMsg("UNKNOW_ERROR"),t)}},s=a.extend({},this.defaultsSetting,s),s.url=this.api.list,s.data={gn:t},a.ajax(s)},getGoodsNum:function(){return this.goodsNum
},readGoodsList:function(t){var s=r.get("cartInfo"),e=s.goodsList,o=s.totalPrice;if(e){t=a.extend({},this.defaultsSetting,t);var c=a.parseJSON(e),d=[];if(!a.isArray(c))if("object"==typeof c){for(i in c)d.push(c[i]);c=d}else c=[];var n={list:c,totalPrice:o};t.defaultImage&&this._defaultImage(n),t.success(n)}else this.listGoods(t)},_setGoodsNum:function(t){a.isNumeric(t)&&this.goodsNum!==+t&&(this.goodsNum=t,this.fire("onGoodsNumChange",{goodsNum:t}))},_defaultImage:function(t){var s,e=t.list;if(e&&e.length)for(var a=e.length-1;a>=0;a--)s=e[a],s.img_url||(s.img_url="/static/pay/book_index/book_default_photo/b"+(s.doc_id.charCodeAt(1)%10+1)+".png",s.defaultImage=!0)
}},e.exports=new c});
;define("wkcommon:widget/ui/pay/flow.js",function(n,e,t){var r=n("wkcommon:widget/lib/tangram/base/base.js"),h={when:"confirmBuy",then:[{when:"waitBuy",then:[{when:"buySuccess",then:[{when:"end"}]},{when:"buyFail",then:[{when:"waitBuy"}]}]},{when:"cancel"}]},a=function(){var n={};return function(e,t){if(!(!e.when||r.array.indexOf(["start","end","cancel"],e.when)>=0||n[e.when])&&(n[e.when]={then:e.then||!1,parent:t||"start"},e.then)){for(var h=0;h<e.then.length;h++)r.lang.isObject(e.then[h])&&a(e.then[h],e.when);
return n}}}(),c=a(h),u=h.when,i={start:function(){return u=h.when},getCurrentStepName:function(){return u},nextStep:function(n){if("end"===u||"cancel"===u)return u;n=n||0;var e=c[u].then;if(e){var t=e.length-1;n=n>t?t:n,u=c[u].then[n].when}else u="end";return u},needStepList:function(){var n=r.object.keys(c);return n.push("cancel","end"),n},cancel:function(){u="cancel"},end:function(){u="end"}};t.exports.flow=i});
;define("wkcommon:widget/ui/pay/mediator.js",function(e,t,n){var o=e("wkcommon:widget/ui/js_core/mvp/event/event.js");n.exports.mediator=new o.custEvent});
;define("wkcommon:widget/ui/pay/util.js",function(o,e,n){var t=o("wkcommon:widget/lib/tangram/base/base.js"),a=o("wkcommon:widget/ui/js_core/_dialog/_dialog.js"),i=function(o,e,n){var a=t.json.parse(o);1==a.status?e&&e():n&&n()},s=function(o,e,n,a){e=e||t.fn.blank,n=n||t.fn.blank,a=a||t.fn.blank;({goods_id:o.goodsId,goods_type:o.goodsType});t.ajax.request("/pay/api/tradecheck",{async:!1,data:"goods_id="+o.goodsId+"&goods_type="+o.goodsType+"&t="+(new Date).getTime(),onsuccess:function(o,t){i(t,e,n)
},onfailure:a})},d=function(){a.alert({title:"\u63d0\u793a",content:'<p style="margin:20px;text-align:center;line-height:24px;font-size:14px;">\u4f60\u5df2\u8d2d\u4e70\u8fc7\u6b64\u6587\u6863\uff0c\u8bf7\u52ff\u91cd\u590d\u8d2d\u4e70\u3002<br/>\u70b9\u51fb\u786e\u8ba4\uff0c\u5237\u65b0\u9875\u9762\uff0c\u9605\u8bfb\u5168\u6587\u3002</p>',width:300,height:180,onConfirmBefore:function(){location.reload(!0)},onCloseBefore:function(){location.reload(!0)}})};n.exports.hasBuyAlert=d,n.exports.checkPayStatus=s
});
;define("wkcommon:widget/ui/pay/presenter.js",function(e,t,i){var n=e("wkcommon:widget/lib/tangram/base/base.js"),o=e("wkcommon:widget/ui/pay/flow.js").flow;P=e("wkcommon:widget/ui/js_core/mvp/presenter/presenter.js").Presenter,payUtil=e("wkcommon:widget/ui/pay/util.js"),Presenter=n.lang.createClass(function(e){this._init(e)},{superClass:P}).extend({_init:function(){var e=this;e.mediator.fire("v:init",{mediator:e.mediator}),e.mediator.on("p:step",n.fn.bind(e.step,e)),e.mediator.on("p:check",n.fn.bind(e.checkPayStatus,e))
},start:function(){var e=this;payUtil.checkPayStatus({goodsId:e.goodsId,goodsType:e.goodsType},function(){payUtil.hasBuyAlert()},function(){o.start(),e.mediator.fire("p:step")})},step:function(){var e=this,t=o.getCurrentStepName();return"cancel"===t?void o.start():"end"===t?void(e.dispatchEvent("pay.buySuccess")&&location.reload(!0)):void e.mediator.fire("v:show",{stepName:o.getCurrentStepName()}).then(function(t){e.mediator.fire("p:step",{stepName:o.nextStep(t)})})}}),i.exports.Presenter=Presenter
});
;define("wkcommon:widget/ui/pay/view/setting.js",function(e,i,n){n.exports={}});
;define("wkcommon:widget/ui/pay/view/confirmBuy.js",function(a,t,e){var s=a("wkcommon:widget/lib/tangram/base/base.js"),i=a("wkcommon:widget/ui/js_core/mvp/view/view.js").View,o=a("wkcommon:widget/ui/js_core/mvp/template/template.js").template,n=a("wkcommon:widget/ui/js_core/_dialog/_dialog.js").dialogCreate,c=(a("wkcommon:widget/ui/js_core/util/util.js"),a("wkcommon:widget/ui/pay/view/setting.js")),p=a("wkcommon:widget/ui/pay/util.js"),r=["\u975e\u4f1a\u5458","\u666e\u901a\u9605\u8bfb\u4f1a\u5458","\u94f6\u724c\u9605\u8bfb\u4f1a\u5458","\u91d1\u724c\u9605\u8bfb\u4f1a\u5458"],d=s.lang.createClass(function(a){this._init(a)
},{superClass:i}).extend({_init:function(a){var t=this,e={title:"\u8d2d\u4e70\u6587\u6863",width:360,height:320,buttons:['<div class="dialog-btns-confirm" style="text-align:center;">','<a target="_blank" id="baifubaobtn" href="'+(a.tradeUrl?a.tradeUrl:"//wenku.baidu.com/trade/submit/maketrade")+"?goods_id="+t.goodsId+"&goods_type="+t.goodsType+"&paytools=baifubao&t="+(new Date).getTime()+'" class="bt ui-btn ui-btn-26-green mr5"><b class="btc"><b class="btText">\u94f6\u884c\u5361\u652f\u4ed8</b></b></a>','<a target="_blank" id="alibtn" href="'+(a.tradeUrl?a.tradeUrl:"//wenku.baidu.com/trade/submit/maketrade")+"?goods_id="+t.goodsId+"&goods_type="+t.goodsType+"&paytools=alipay&t="+(new Date).getTime()+'" class="bt ui-btn ui-btn-26-green mv5"><b class="btc"><b class="btText">\u652f\u4ed8\u5b9d\u652f\u4ed8</b></b></a>','<a href="###" class="dialog-close ml5"><b class="btc"><b class="btText">\u53d6\u6d88</b></b></a>',"</div>",'<p class="pay-dialog-foot"><a href="//wenku.baidu.com/topic/szbq/index.html" target="_blank">\u767e\u5ea6\u6587\u5e93\u7248\u6743\u6587\u6863\u5f00\u59cb\u652f\u6301\u4ed8\u8d39\u8d2d\u4e70\u5566\uff01</a></p>'].join(""),content:t.content(a)};
t.viewConfig=e},template:{normal:['<div class="confirmBuy">','<p class="goods-title"><%=data.goodsTitle%><span class="page-count"><%=data.totalPageNum?"(\u5171"+data.totalPageNum+"\u9875)":""%></span></p>','<p class="wenkuprice">\u6587\u5e93\u4ef7\uff1a<span class="price-number"><strong><%=(data.price/100).toFixed(2)%>\u5143</strong></span></p>','<%if(data.is_discount_doc || data.isOtherActivity){%><p class="member-tip mb20"><%=data.memberTip%></p><%}%>',"<%=data.dc%>","</div>"].join(""),member:['<div class="confirmBuy">','<p class="goods-title"><%=data.goodsTitle%><span class="page-count"><%=data.totalPageNum?"(\u5171"+data.totalPageNum+"\u9875)":""%></span></p>','<p class="original-price">\u539f\u4ef7\uff1a<%=(data.price/100).toFixed(2)%>\u5143</p>','<p class="wenkuprice <%if(!data.isOtherActivity){%>mb20<%}%>"><strong>\u4f18\u60e0\uff1a</strong><span class="bg-member mr10"><%=data.memberLevel%></span><span class="price-number" style="font-size:20px"><%=(data.vip_price/100).toFixed(2)%>\u5143</span></p>','<%if(data.isOtherActivity){%><p class="member-tip"><%=data.memberTip%></p><%}%>',"<%=data.dc%>","</div>"].join(""),activity:['<div class="confirmBuy">','<p class="goods-title"><%=data.goodsTitle%><span class="page-count"><%=data.totalPageNum?"(\u5171"+data.totalPageNum+"\u9875)":""%></span></p>','<p class="original-price">\u539f\u4ef7\uff1a<%=(data.price/100).toFixed(2)%>\u5143</p>','<p class="wenkuprice mb20"><strong>\u4f18\u60e0\uff1a</strong><span class="bg-member mr10">\u9650\u65f6\u4fc3\u9500</span><span class="price-number" style="font-size:20px"><%=(data.confirm_price/100).toFixed(2)%>\u5143</span></p>',"<%=data.dc%>","</div>"].join("")},content:function(a){var t=a.JOINVIP_URL||"/vip/privilege",e=a.goodsPayStatus||"",s="PCActivity"==e.split("_")[0],i="OtherActivity"==e.split("_")[0],n=a.tpls||{};
return a.dc=a.isdownloaded?'<p class="dc">\u53ef\u5728\u7ebf\u9605\u8bfb\u548c\u4e0b\u8f7d\u5168\u6587(\u652f\u6301ipad\u7aef\u79bb\u7ebf\u9605\u8bfb)</p><p class="dc">\u8be5\u8d44\u6e90\u53ea\u4f9b\u9605\u8bfb\u4f7f\u7528\uff0c\u4e0d\u53ef\u7528\u4e8e\u5546\u4e1a\u8425\u9500\u3002</p>':'<p class="dc">\u53ef\u5728\u7ebf\u9605\u8bfb\u5168\u6587,<strong>\u4e0d\u652f\u6301\u4e0b\u8f7d</strong></p><p class="dc">\u76ee\u524d\u65e0\u6cd5\u786e\u4fdd\u6700\u4f18\u624b\u673a\u9605\u8bfb\u4f53\u9a8c\uff0c\u6211\u4eec\u6b63\u5728\u52aa\u529b\u5efa\u8bbe\u3002</p><p class="dc">\u8be5\u8d44\u6e90\u53ea\u4f9b\u9605\u8bfb\u4f7f\u7528\uff0c\u4e0d\u53ef\u7528\u4e8e\u5546\u4e1a\u8425\u9500\u3002</p>',n.confirmBuy?o(n.confirmBuy,{data:a}):s?o(this.template.activity,{data:a}):a.vip_type>0&&a.is_discount_doc?(a.memberLevel=r[a.vip_type]||"",i&&(a.memberTip=a.price_supported_devices_info+'\u5ba2\u6237\u7aef <span class="price-number">\u9650\u65f6\u4fc3\u9500</span> \uff0c<a href="/apps" target="_blank">\u7acb\u5373\u4e0b\u8f7d&gt;&gt;</a>',a.isOtherActivity=!0),o(this.template.member,{data:a})):(i?(a.memberTip=a.price_supported_devices_info+'\u5ba2\u6237\u7aef <span class="price-number">\u9650\u65f6\u4fc3\u9500</span> \uff0c<a href="/apps" target="_blank">\u7acb\u5373\u4e0b\u8f7d&gt;&gt;</a>',a.isOtherActivity=!0):a.is_discount_doc&&!i&&(a.memberTip=a.is_vip_free_doc?'<span class="bg-member mr5">\u9605\u8bfb\u4f1a\u5458\u514d\u8d39</span> \u9605\u8bfb\u4f1a\u5458<span class="price-number">0\u5143</span>\u9605\u8bfb\u5168\u6587\uff0c<a href="'+t+'" target="_blank">\u7acb\u5373\u52a0\u5165&gt;&gt;</a>':'<span class="bg-member mr5">\u9605\u8bfb\u4f1a\u5458\u6253\u6298</span>'+(a.vip_price/100).toFixed(2)+'\u5143\uff0c<a href="'+t+'" target="_blank">\u7acb\u5373\u52a0\u5165\u9605\u8bfb\u4f1a\u5458\uff0c<span class="price-number">\u5168\u7ad98\u6298</span>\u8d77&gt;&gt;</a>'),o(this.template.normal,{data:a}))
},show:function(a){var t=this,e=a.promise,i=function(a,s){c.link=s,t.dialog.close(),p.checkPayStatus({goodsId:t.goodsId,goodsType:t.goodsType},function(){p.hasBuyAlert(),e.resolve(1)},function(){e.resolve(0)})};t.dialog||(t.dialog=new n(t.viewConfig)),t.dialog.show(),s.dom.addClass(t.dialog.getElement(),"pay-dialog"),s.event.once("baifubaobtn","click",function(a){var t=a.currentTarget.href+"&nt="+ +new Date;i(a,t)}),s.event.once("alibtn","click",function(a){var t=a.currentTarget.href+"&nt="+ +new Date;
i(a,t)})},hide:function(){var a=this;a.dialog&&(a.dialog.close(),a.dialog=null)},dispose:function(){}});e.exports.confirmBuy=d});
;define("wkcommon:widget/ui/pay/view/payDialog.js",function(o,e,t){var a=o("wkcommon:widget/lib/tangram/base/base.js"),i=o("wkcommon:widget/ui/js_core/util/util.js"),n=o("wkcommon:widget/ui/js_core/_dialog/_dialog.js"),l=(o("wkcommon:widget/ui/pay/mediator.js").mediator,function(o,e){var t=o.getElement();return a.dom.addClass(t,"pay-dialog"),e.foot&&(foot=o.getElement("buttons"),a.dom.insertHTML(foot,"afterEnd",'<div class="pay-dialog-foot">'+e.foot+"</div>")),o}),d=function(o){var e=new n.confirm(o),t=e.getElement(),d=e.getElement("buttons"),r=a.dom.q("dialog-close",d,"a")[0];
return a.dom.addClass(r,"dialog-cancel"),a.dom.removeClass(r,"dialog-close"),i.delegate(t,".dialog-cancel","click",function(){e.fire("onCancelBefore")&&e.close()}),l(e,o)},r=function(o){var e=new n.alert(o);return l(e,o)};t.exports.payAlert=r,t.exports.payConfirm=d});
;define("wkcommon:widget/ui/pay/view/waitBuy.js",function(i,e,o){var t=i("wkcommon:widget/lib/tangram/base/base.js"),n=i("wkcommon:widget/ui/js_core/mvp/view/view.js").View,a=i("wkcommon:widget/ui/js_core/mvp/template/template.js").template,s=i("wkcommon:widget/ui/pay/view/payDialog.js").payConfirm,w=(i("wkcommon:widget/ui/js_core/util/util.js"),i("wkcommon:widget/ui/pay/util.js")),c=t.lang.createClass(function(i){this._init(i)},{superClass:n}).extend({_init:function(i){var e=this,o={title:"\u7b49\u5f85\u652f\u4ed8",width:370,height:195,btnText:["\u5b8c\u6210\u652f\u4ed8","\u652f\u4ed8\u9047\u5230\u95ee\u9898"],content:e.content(i)};
e.viewConfig=o},template:['<div class="waitBuy">','<p class="dc">\u8bf7\u5728\u65b0\u6253\u5f00\u7684\u652f\u4ed8\u9875\u9762\u4e2d\uff0c\u5b8c\u6210\u652f\u4ed8\u3002</p>',"</div>"].join(""),content:function(i){return a(this.template,{data:i})},show:function(i){var e=this,o=i.promise;e.viewConfig.onConfirmBefore=function(){w.checkPayStatus({goodsId:e.goodsId,goodsType:e.goodsType},function(){o.resolve(0)},function(){o.resolve(1)})},e.viewConfig.onCancelBefore=function(i){window.open("http://www.baidu.com/search/wenku/help/help.html?nav=21","_blank"),t.event.stop(i)
},e.dialog||(e.dialog=new s(e.viewConfig)),e.dialog.show()},hide:function(){var i=this;i.dialog&&(i.dialog.close(),i.dialog=null)},dispose:function(){}});o.exports.waitBuy=c});
;define("wkcommon:widget/ui/pay/view/buySuccess.js",function(i,e,o){var n=i("wkcommon:widget/lib/tangram/base/base.js"),t=i("wkcommon:widget/ui/js_core/mvp/view/view.js").View,s=i("wkcommon:widget/ui/js_core/mvp/template/template.js").template,a=i("wkcommon:widget/ui/pay/view/payDialog.js").payAlert,c=i("wkcommon:widget/ui/pay/view/payDialog.js").payConfirm,l=(i("wkcommon:widget/ui/js_core/util/util.js"),n.lang.createClass(function(i){this._init(i)},{superClass:t}).extend({_init:function(i){var e=this,o={title:"\u652f\u4ed8\u6210\u529f",width:300,height:238,btnText:function(){return e.options.isdownloaded?["\u73b0\u5728\u9605\u8bfb","\u4e0b\u8f7d"]:"\u73b0\u5728\u9605\u8bfb"
}(),content:e.content(i)};e.viewConfig=o},template:['<div class="buySuccess">','<h3><img src="/static/view/ui/pay/img/buySuccess.png"/></h3>','<div class="content-border">','<p class="in-room mb10">\u6587\u6863\u5df2\u540c\u6b65\u6dfb\u52a0\u5230\u201c<a href="/room">\u6211\u7684\u6587\u5e93</a>\u201d</p>',"<p>(\u652f\u6301ipad\u7aef\u79bb\u7ebf\u9605\u8bfb)</p>","</div>","</div>"].join(""),content:function(i){return s(this.template,{data:i})},show:function(i){var e=this;e.viewConfig.onConfirmBefore=function(){i.promise.resolve()
},e.viewConfig.onCloseBefore=function(){i.promise.resolve()},e.viewConfig.onCancelBefore=function(i){n.lang.eventCenter.dispatchEvent("download.doc",{from:"payDialog"}),n.event.stop(i)};var o=e.isdownloaded?c:a;e.dialog||(e.dialog=new o(e.viewConfig)),e.dialog.show()},hide:function(){var i=this;i.dialog&&(i.dialog.close(),i.dialog=null)}}));o.exports.buySuccess=l});
;define("wkcommon:widget/ui/pay/view/buyFail.js",function(i,e,o){var n=i("wkcommon:widget/lib/tangram/base/base.js"),t=i("wkcommon:widget/ui/js_core/mvp/view/view.js").View,a=i("wkcommon:widget/ui/js_core/mvp/template/template.js").template,s=i("wkcommon:widget/ui/pay/view/payDialog.js").payConfirm,w=i("wkcommon:widget/ui/pay/view/setting.js"),d=(i("wkcommon:widget/ui/js_core/util/util.js"),n.lang.createClass(function(i){this._init(i)},{superClass:t}).extend({_init:function(i){var e=this,o={title:"\u652f\u4ed8\u5931\u8d25",width:370,height:199,btnText:["\u91cd\u65b0\u652f\u4ed8","\u652f\u4ed8\u9047\u5230\u95ee\u9898"],content:e.content(i)};
e.options=i,e.viewConfig=o},template:['<div class="buyFail">','<p class="dc">\u62b1\u6b49\uff01\u60a8\u8fd8\u6ca1\u6709\u5b8c\u6210\u652f\u4ed8\u3002</p>',"</div>"].join(""),content:function(i){return a(this.template,{data:i})},show:function(i){var e=this,o=e.options;e.viewConfig.onConfirmBefore=function(){w.link?window.open(w.link,"_blank"):window.open((o.tradeUrl?o.tradeUrl:"//wenku.baidu.com/trade/submit/maketrade")+"?goods_id="+e.goodsId+"&goods_type="+e.goodsType,"_blank"),i.promise.resolve()
},e.viewConfig.onCancelBefore=function(){window.open("http://www.baidu.com/search/wenku/help/help.html","_blank"),n.event.stop(i)},e.dialog||(e.dialog=new s(e.viewConfig)),e.dialog.show()},hide:function(){},dispose:function(){}}));o.exports.buyFail=d});
;define("wkcommon:widget/ui/pay/viewList.js",function(i,e,o){var u=(i("wkcommon:widget/lib/tangram/base/base.js"),i("wkcommon:widget/ui/pay/view/confirmBuy.js").confirmBuy),n=i("wkcommon:widget/ui/pay/view/waitBuy.js").waitBuy,w=i("wkcommon:widget/ui/pay/view/buySuccess.js").buySuccess,t=i("wkcommon:widget/ui/pay/view/buyFail.js").buyFail,m=(i("wkcommon:widget/ui/js_core/util/util.js"),i("wkcommon:widget/ui/lib/jquery/jquery.js"));defMap={confirmBuy:u,waitBuy:n,buySuccess:w,buyFail:t};var s=function(i){var e=i.mediator,o=null,u=m.extend({},defMap,i.map||{});
e.on("v:init",function(){}),e.on("v:show",function(e){var n=(e.promise,e.stepName);return o=new u[n](i),o.show(e),e.promise})};o.exports.ViewList=s});
;define("wkcommon:widget/ui/pay/pay.js",function(e,n,t){var i=(e("wkcommon:widget/lib/tangram/base/base.js"),e("wkcommon:widget/ui/pay/presenter.js").Presenter),o=e("wkcommon:widget/ui/js_core/mvp/event/event.js").custEvent,s=e("wkcommon:widget/ui/pay/viewList.js").ViewList,w=function(e){return e.mediator=new o,s(e),new i(e)};t.exports.pay=w});
;define("wkcommon:widget/ui/payCheck/payCheck.js",function(o,e,t){var i=o("wkcommon:widget/lib/tangram/base/base.js"),n=o("wkcommon:widget/ui/lib/jquery/jquery.js"),a=o("wkcommon:widget/ui/js_core/_dialog/_dialog.js"),s=o("wkcommon:widget/ui/js_core/login/login.js"),c=i.lang.createClass(function(o){var e=this;e.goods_id=o.goods_id,e.goods_type=o.goods_type}).extend({start:function(o){var e=this;e.check(o)},check:function(o){var e=this;s.login.verlogin(function(){n.ajax({url:"/pay/api/tradecheck",cache:!1,async:!1,data:{goods_type:e.goods_type,goods_id:e.goods_id},dataType:"json"}).done(function(t){if(0===+t.status){o=o||{};
var a=o.query||{},s=i.object.merge({id:e.goods_id,stt:e.goods_type},a,{overwrite:!0}),c="";c=1==e.goods_type?"/cashier/browse/doccashier?":"/coupon/browse/buybook?";var r=c+n.param(s);window.location.href=r}else e.hasBuyAlert()})},null,null,{},!1)},hasBuyAlert:function(){a.alert({title:"\u63d0\u793a",content:'<p style="margin:20px;text-align:center;line-height:24px;font-size:14px;">\u4f60\u5df2\u8d2d\u4e70\u8fc7\u6b64\u5546\u54c1\uff0c\u8bf7\u52ff\u91cd\u590d\u8d2d\u4e70\u3002<br/>\u70b9\u51fb\u786e\u8ba4\uff0c\u5237\u65b0\u9875\u9762\uff0c\u9605\u8bfb\u5168\u6587\u3002</p>',width:300,height:180,onConfirmBefore:function(){location.reload(!0)
},onCloseBefore:function(){location.reload(!0)}})}});t.exports=c});