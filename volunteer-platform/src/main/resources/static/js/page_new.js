(function($){
	var zp = {
		init:function(obj,pageinit){
			return (function(){
				zp.addhtml(obj,pageinit);
				zp.bindEvent(obj,pageinit);
			}());
		},
		addhtml:function(obj,pageinit){
			return (function(){
				obj.empty();
				if (pageinit.shownum<5) {
					pageinit.shownum = 5;
				}
				if (pageinit.current<1) {
					pageinit.current = 1;
				}
				if (pageinit.pageNum<pageinit.current) {
					pageinit.current = pageinit.pageNum;
				}
				if (pageinit.pageNum<pageinit.shownum) {
					pageinit.shownum = pageinit.pageNum;
				}
				var numshow = pageinit.shownum-4;
				var numbefore = parseInt((pageinit.shownum - 5)/2);
				if ((pageinit.shownum - 5)%2>0) {
					var numafter = numbefore + 1;
				} else{
					var numafter = numbefore;
				}
				/*上一页*/
				if (pageinit.current > 1) {
					obj.append('<a href="javascript:;" class="firstbtn">首页</a>');
					obj.append('<a href="javascript:;" class="prebtn"><</a>');
				} else{
					obj.append('<a href="javascript:;" class="firstbtn disabled">首页</a>');
					obj.append('<a href="javascript:;" class="prebtn disabled"><</a>');
					/*obj.append('<span class="disabled">首页</span>');
					obj.append('<span class="disabled">上一页</span>');*/
				}
				/*中间页*/
				if (pageinit.current >4 && pageinit.pageNum > pageinit.shownum) {
					obj.append('<a href="javascript:;" class="dataPagenum">'+1+'</a>');
					obj.append('<a href="javascript:;" class="dataPagenum">'+2+'</a>');
					obj.append('<span class="ellipses">...</span>');
				}
				if (pageinit.current >4 && pageinit.current < pageinit.pageNum-numshow && pageinit.pageNum > pageinit.shownum) {
					var start  = pageinit.current - numbefore,end = pageinit.current + numafter;
				}else if(pageinit.current >4 && pageinit.current >= pageinit.pageNum-numshow && pageinit.pageNum > pageinit.shownum){
					var start  = pageinit.pageNum - numshow,end = pageinit.pageNum;
				}else{
					if (pageinit.pageNum <= pageinit.shownum) {
						var start = 1,end = pageinit.shownum;
					} else{
						var start = 1,end = pageinit.shownum-1;
					}
				}
				for (;start <= end;start++) {
					if (start <= pageinit.pageNum && start >=1) {
						if (start == pageinit.current) {
							obj.append('<span class="dataPagenum '+pageinit.activepage+'">'+ start +'</span>');
						} else if(start == pageinit.current+1){
							obj.append('<a href="javascript:;" class="dataPagenum '+pageinit.activenext+'">'+ start +'</a>');
						} else{
							obj.append('<a href="javascript:;" class="dataPagenum">'+ start +'</a>');
						}
					}
				}
				if (end < pageinit.pageNum) {
					obj.append('<span  class="ellipses">...</span>');
				}
				/*下一页*/
				if (pageinit.current >= pageinit.pageNum) {
					/*obj.append('<span class="disabled">下一页</span>');
					obj.append('<span class="disabled">末页</span>');*/
					obj.append('<a href="javascript:;" class="nextbtn disabled">></a>');
					obj.append('<a href="javascript:;" class="lastbtn disabled">末页</a>');
				} else{
					obj.append('<a href="javascript:;" class="nextbtn">></a>');
					obj.append('<a href="javascript:;" class="lastbtn">末页</a>');
				}
				/*尾部*/
				if(pageinit.showPageNum===true){
					obj.append('<span>'+'共'+'<b>'+pageinit.pageNum+'</b>'+'页&nbsp;'+'</span>');
				}
				if(pageinit.showToPage===true){
					obj.append('<span>'+'跳至'+'<input type="text" class="datainput" value="'+pageinit.current+'"/>'+'页'+'</span>');
					obj.append('<span class="dataokbtn btn">'+'确定'+'</span>');
				}
				//$(".ellipses").next().addClass("borderL");
			}());
		},
		bindEvent:function(obj,pageinit){
			return (function(){
				obj.off("click");
				obj.on("click","a.firstbtn",function(){
					if($(this).hasClass("disabled")){return}
					var current = $.extend(pageinit, {"current":1});
					zp.addhtml(obj,current);
					if (typeof(pageinit.backfun)=="function") {
						pageinit.backfun(current);
					}
				});
				obj.on("click","a.prebtn",function(){
					if($(this).hasClass("disabled")){return}
					var cur = parseInt(obj.children("span.current").text());
					var current = $.extend(pageinit, {"current":cur-1});
					zp.addhtml(obj,current);
					if (typeof(pageinit.backfun)=="function") {
						pageinit.backfun(current);
					}
				});
				obj.on("click","a.dataPagenum",function(){
					var cur = parseInt($(this).text());
					var current = $.extend(pageinit, {"current":cur});
					zp.addhtml(obj,current);
					if (typeof(pageinit.backfun)=="function") {
						pageinit.backfun(current);
					}
				});
				obj.on("click","a.nextbtn",function(){
					if($(this).hasClass("disabled")){return}
					var cur = parseInt(obj.children("span.current").text());
					var current = $.extend(pageinit, {"current":cur+1});
					zp.addhtml(obj,current);
					if (typeof(pageinit.backfun)=="function") {
						pageinit.backfun(current);
					}
				});
				obj.on("click","a.lastbtn",function(){
					if($(this).hasClass("disabled")){return}
					var current = $.extend(pageinit, {"current":pageinit.pageNum});
					zp.addhtml(obj,current);
					if (typeof(pageinit.backfun)=="function") {
						pageinit.backfun(current);
					}
				});
				obj.on("click","span.dataokbtn",function(){
					var cur = parseInt($("input.datainput").val());
					if(isNaN(cur)){
						$("input.datainput").val("");
						return;
					}
					var current = $.extend(pageinit, {"current":cur});
					zp.addhtml(obj,current);
					if (typeof(pageinit.backfun)=="function") {
						pageinit.backfun(current);
					}
				});
				obj.on("keydown","input.datainput",function(){
					if (event.keyCode == "13") {
						$(".dataokbtn").click();
					}
				});
			}());
		}
	}
	$.fn.createPage = function(options){
		var pageinit = $.extend({
			pageNum : 15,
			current : 1,
			shownum: 9,
			showPageNum : true,
			showToPage : true,
			activepage: "current",
			activeprev: "borderL",
			activenext: "nextpage",
			backfun : function(){}
		},options);
		zp.init(this,pageinit);
	}
}(jQuery));