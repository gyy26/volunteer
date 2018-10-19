/** index.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */

var tab;

layui.config({
    base: '/static/js/modules/',
	version:new Date().getTime()
}).use(['element', 'layer', 'tab'], function() {
	var element = layui.element(),
		$ = layui.jquery,
		layer = layui.layer,
		//navbar = layui.navbar();
		tab = layui.tab({
			elem: '.admin-nav-card' //设置选项卡容器
				,
			//maxSetting: {
			//	max: 5,
			//	tipMsg: '只能开5个哇，不能再开了。真的。'
			//},
			contextMenu:true
		});
	//iframe自适应
	$(window).on('resize', function() {
		var $content = $('.admin-nav-card .layui-tab-content');
		$content.height($(this).height() - 146);
		$content.find('iframe').each(function() {
			$(this).height($content.height());
		});
	}).resize();

	//监听点击事件
    navTabSub('#accordion', function(data) {
		tab.tabAdd(data.field);
	});

	//左侧菜单收缩
	$('.shrinkBtn').on('click', function() {
		var sideWidth = $('#accordion').width();
		if(sideWidth === 239) {
			$(this).attr('title','展开菜单');
			$('#admin-body').animate({
				left: '0'
			});
			$('#accordion').animate({
				width: '0'
			});
		} else {
            $(this).attr('title','收缩菜单');
			$('#admin-body').animate({
				left: '250px'
			});
			$('#accordion').animate({
				width: '240px'
			});
		}
	});
	/*$('.admin-side-full').on('click', function() {
		var docElm = document.documentElement;
		//W3C  
		if(docElm.requestFullscreen) {
			docElm.requestFullscreen();
		}
		//FireFox  
		else if(docElm.mozRequestFullScreen) {
			docElm.mozRequestFullScreen();
		}
		//Chrome等  
		else if(docElm.webkitRequestFullScreen) {
			docElm.webkitRequestFullScreen();
		}
		//IE11
		else if(elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		}
		layer.msg('按Esc即可退出全屏');
	});*/
});

/*var isShowLock = false;
function lock($, layer) {
	if(isShowLock)
		return;
	//自定页
	layer.open({
		title: false,
		type: 1,
		closeBtn: 0,
		anim: 6,
		content: $('#lock-temp').html(),
		shade: [0.9, '#393D49'],
		success: function(layero, lockIndex) {
			isShowLock = true;
			//给显示用户名赋值
			layero.find('div#lockUserName').text('admin');
			layero.find('input[name=lockPwd]').on('focus', function() {
					var $this = $(this);
					if($this.val() === '输入密码解锁..') {
						$this.val('').attr('type', 'password');
					}
				})
				.on('blur', function() {
					var $this = $(this);
					if($this.val() === '' || $this.length === 0) {
						$this.attr('type', 'text').val('输入密码解锁..');
					}
				});
			//在此处可以写一个请求到服务端删除相关身份认证，因为考虑到如果浏览器被强制刷新的时候，身份验证还存在的情况			
			//do something...
			//e.g. 
			/!*
			 $.post(url,params,callback,'json');
			 *!/
			//绑定解锁按钮的点击事件
			layero.find('button#unlock').on('click', function() {
				var $lockBox = $('div#lock-box');

				var userName = $lockBox.find('div#lockUserName').text();
				var pwd = $lockBox.find('input[name=lockPwd]').val();
				if(pwd === '输入密码解锁..' || pwd.length === 0) {
					layer.msg('请输入密码..', {
						icon: 2,
						time: 1000
					});
					return;
				}
				unlock(userName, pwd);
			});
			/!**
			 * 解锁操作方法
			 * @param {String} 用户名
			 * @param {String} 密码
			 *!/
			var unlock = function(un, pwd) {
				//这里可以使用ajax方法解锁
				/!*$.post('api/xx',{username:un,password:pwd},function(data){
				 	//验证成功
					if(data.success){
						//关闭锁屏层
						layer.close(lockIndex);
					}else{
						layer.msg('密码输入错误..',{icon:2,time:1000});
					}					
				},'json');
				*!/
				isShowLock = false;
				//演示：默认输入密码都算成功
				//关闭锁屏层
				layer.close(lockIndex);
			};
		}
	});
};*/
function navTabSub(events, callback) {
	var _con = $(events);
	//if(_con.attr('lay-filter') !== undefined) {
	_con.children('ul').find('li').each(function() {
		var $this = $(this);
		if($this.find('dl').length > 0) {
			var $dd = $this.find('dd').each(function() {
				$(this).on('click', function() {
					var $a = $(this).children('a');
					var href = $a.data('url');
					//var icon = $a.children('i:first').data('icon');
					var title = $a.text();
					var data = {
						elem: $a,
						field: {
							href: href,
							//icon: icon,
							title: title
						}
					};
					callback(data);
				});
			});
		} else {
			$this.on('click', function() {
				var $a = $this.children('a');
				var href = $a.data('url');
				//var icon = $a.children('i:first').data('icon');
				var title = $a.text();
				var data = {
					elem: $a,
					field: {
						href: href,
						//icon: icon,
						title: title
					}
				};
				callback(data);
			});
		}
	});
	//}
}