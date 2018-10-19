//获取短信验证码
function obtainTxt(txt){
    var validCode = true;
    var time = 60;
    var code = $(txt);
    if (validCode) {
        validCode = false;
        code.addClass("disableCode");
        code.attr('disabled',true);
        code.css('cursor','default');
        var t = setInterval(function () {
            time--;
            code.val(time + "秒");
            if (time == 0) {
                clearInterval(t);
                code.val("重新获取");
                validCode = true;
                code.removeClass("disableCode");
                code.attr('disabled',false);
                code.css('cursor','pointer');
            }
        }, 1000)
    }
}

$(function() {
    //左侧导航
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        // Variables privadas
        var links = this.el.find('.link');
        var submenu = this.el.find('.submenu').find('a');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
        submenu.on('click',function(){
            $(this).addClass('link_a').parent('dd').siblings().find('a').removeClass('link_a');
            $(this).addClass('link_a').parents('.navBox li').siblings().find('a').removeClass('link_a');
        });
        //console.log(submenu);
    };
    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this);
        $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');
        //$el.find('.submenu a').removeClass('link_a');
        //console.log($this.parent().find('.submenu a'));

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        }
    };

    var accordion = new Accordion($('#accordion'), false);


    //右侧当前用户下拉
    $('.userListBox').hover(function(){
        $('.userList').show();
    },function(){
        $('.userList').hide();
    });
    //全选
    $('.ph_wareBox').on('click','.check-all',function(){
        $('.ids').prop('checked',this.checked);
        var trClass = $(this).parents('.ph_wareBox').find('tbody tr');
        if(trClass.hasClass('wareBg') && !this.checked ){
            trClass.removeClass('wareBg');
        }else{
            trClass.addClass('wareBg');
        }
        //console.log($('.ids:checkbox:disabled').prop('disabled'));
        if($('.ids:disabled').prop('disabled')){
            $('.ids:disabled').prop('checked',false);
        }
    });
    $('.ph_wareBox').on('click','.ids',function(){
        if($(this).parents('tr').hasClass('wareBg')){
            $(this).parents('tr').removeClass('wareBg');
        }else{
            $(this).parents('tr').addClass('wareBg');
        }
    });
    //操作按钮
    $('.ph_wareList').on('click', '.operate', function(event){
        //取消事件冒泡
        event.stopPropagation();
        if($(this).siblings('.operateList').hasClass('hide')){
            $(this).addClass('hover');
            $(this).siblings('.operateList').removeClass('hide');
        }else{
            $(this).removeClass('hover');
            $(this).siblings('.operateList').addClass('hide');
        }
        $(this).parents('tr').siblings('tr').find('.operateList').addClass('hide');
        $(this).parents('tr').siblings('tr').find('.operate').removeClass('hover');
        return false;
    });
    //点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
    $(document).click(function(event){
        var _con = $('.operateList');   // 设置目标区域
        if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
            //$('#divTop').slideUp('slow');   //滑动消失
            $('.operateList').addClass('hide');          //淡出消失
            $('.operate').removeClass('hover');
        }
    });

    $('.ph_wareBox').on('click','.mitAll',function(){
        $('.ids').prop('checked',true);
        $('.check-all').prop('checked',true);
        if($('.ids:disabled').prop('disabled')){
            $('.ids:disabled').prop('checked',false);
        }
    });
    $('.ph_wareBox').on('click','.ids',function(){
        var option = $('.ids');
        var Cnum=option.not(":disabled").size();
        var count=0;

        option.each(function(i) {
            if($(this).is(':checked')) {
                count++;
            }
        });
        if( Cnum == count) {
            $('.check-all').prop('checked',true);
        }else{
            $('.check-all').prop('checked',false);
        }

    });
});

function clickPersonInfo(url) {
    var personInfoBtn = $('a[data-url="'+url+'"]');
    personInfoBtn.parents('li').addClass('open').find('.submenu').show();
    personInfoBtn.click();

}

(function ($) {
    $.sendPost = function (url, data, success, fail) {
        $.ajax({
            "dataType": 'json',
            "contentType": "application/json;charset=UTF-8",
            "type": "POST",
            "url": url,
            "data": JSON.stringify(data),
            "success": function (res) {
                if (success) success(res);
            },
            "error": function (res) {
                if (fail) fail(res)
            }
        });
    }
})(jQuery)