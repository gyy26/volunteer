/**
 * 张志浩(作者)
 * 2018-04-1(开始日期)
 * 2018-04-09(最终更改日期)
 * xxx(最后更改者)
 * */
/* 输入密码start */
var pwd_length = 0;
$("#for_pwd").click(function() {
	$("#pwd").focus();
	$("#pay_pwd li")[pwd_length].className = "animation";
})
$("#pwd").blur(function() {
	$("#pay_pwd li").removeClass('animation');
})
$("#pwd").on("input", function() {
	var pwd = $(this).val();
	cur = pwd[pwd.length - 1]
	cur = parseInt(cur);
	if (isNaN(cur)) {
		cur = ""
	}
	pwd = pwd.substr(0, pwd.length - 1) + cur;
	$(this).val(pwd)
	pwd = pwd.toString()
	len = pwd.length - 1;
	if (len < 5) {
		$("#pay_pwd li")[len + 1].className = "animation";
	}
	if (pwd_length < len + 1) {
		$("#pay_pwd li")[len].className = "";
		$("#pay_pwd li")[len].innerHTML = pwd[len];
		(function(a) {
			setTimeout(function() {
				$("#pay_pwd li")[a].innerHTML = ""
				$("#pay_pwd li")[a].className = "active"
			}, 100)
		})(len)
	}
	for (var i = 5; i > len; i--) {
		if (i < 5) {
			$("#pay_pwd li")[i + 1].className = "";
		}
	}
	pwd_length = len + 1;
})
/* 输入密码end */