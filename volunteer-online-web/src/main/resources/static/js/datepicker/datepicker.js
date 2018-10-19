// JavaScript Document
$(function() {
    // 日期控件区间
    $('.dayBox .start_rise').datepicker({
        'format': 'yyyy-mm-dd',
        'clearBtn': false,//清除按钮
        'autoclose': true
    });
    $('.dayBox').datepair();
});