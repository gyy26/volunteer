$(function () {
    // table点击和双击点击事件
    $('#memberListTable').on('click', 'tbody tr', function () {
        $(this).addClass('wareBg').siblings('tr').removeClass('wareBg');
        $(this).find('.ids').prop('checked', true);
        $(this).siblings().find('.ids').prop('checked', false);
    });

    $('#memberListTable').on('dblclick', 'tbody tr', function () {
        var memberId = $('input[name="memberId"]:checked').val();
        var index = layer.open({
            type: 2,
            title: '会员详情',
            closeBtn: 1,
            //area: ['442px','280px'],
            //maxmin: true,
            shade: 0,
            btn: ['返回'],
            btnAlign: 'c',
            content: "/web/member/memberDetail?memberId=" + memberId
        });
        layer.full(index);
    });

    $('.ph_snbBtn').on('click', '.js_addLabour,.js_editLabour', function () {
        layer.open({
            type: 1,
            title: '添加会员',
            closeBtn: 1,
            area: ['442px', '270px'],
            //maxmin: true,
            btn: ['保存', '取消'],
            yes: function (index, layero) {
                var flag = $("#addMemberForm").validationEngine("validate");
                if (!flag) {
                    return false;
                }
                var addData = $("#addMemberForm").serializeJson();
                $.ajax({
                    url: '/web/member/addMember',
                    type: 'post',
                    data: addData,
                    dataType: 'json',
                    success: function (json) {
                        if (json.code == 200) {
                            Dialog.alertInfo(json.message);
                            layer.close(index);
                            Dialog.refreshTable('memberListTable');
                        } else {
                            Dialog.alertWarn(json.message);
                        }
                    }
                });
            },
            btnAlign: 'c',
            content: $('#ph_modifyBox')
        });
    });

    //验证
    $("#memberForm").validationEngine({
        addPromptClass: 'formError-text',
        showArrow: false,
        promptPosition: 'bottomLeft:10 0'
    });

    //添加猎头标签
   /* $('.addList').on('click', '.js_addhuntBtn', function () {
        layer.open({
            type: 1,
            title: '添加标签',
            closeBtn: 1,
            area: ['540px', '320px'],
            btn: ['确定', '取消'],
            btnAlign: 'c',
            content: $('#ph_LabelBox')
        });
    });*/

    $('#memberListTable').DataTable({
        "bServerSide": true,
        "sPaginationType": "full_numbers",
        //"bJQueryUI": true,
        "sDom": '<"">t<"F"ip>',
        "autoWidth": false,  //自适应宽度
        "sAjaxSource": "/web/member/getMemberList", //ajax调用接口
        "aoColumnDefs": [{sDefaultContent: '', orderable: false, aTargets: ['_all']}],
        "aoColumns": [
            {
                "sWidth": "40px",
                "sTitle": "<input class= \"check-all\" name=\"\" type=\"checkbox\">",
                "mData": "memberId",
                "mRender": function (data, type, full) {
                    return '<input class="ids" name="memberId" value="' + full.memberId + '" type="checkbox">';
                }
            },
            {"sWidth": "50px", "sTitle": "序号", "mData": null},
            {
                "sWidth": "110px",
                "sTitle": "会员姓名",
                "mData": "nickName",
                "sClass": "class-nick"
            },
            {
                "sWidth": "100px",
                "sTitle": "会员账号",
                "mData": "telPhone",
                "sClass": "class-tel"
            },
            {"sWidth": "110px", "sTitle": "可用积分", "mData": "enableScore"},
            {
                "sWidth": "110px",
                "sTitle": "账号状态",
                "mData": "isFrozen",
                "mRender": function (data, type, full) {
                    var text = '-';
                    if (full.isFrozen == 0) {
                        text = '<span class="frezonTxt" data-val="' + full.isFrozen + '">正常</span>';
                    } else if (full.isFrozen == 1) {
                        text = '<span class="frezonTxt" data-val="' + full.isFrozen + '">已冻结</span>';
                    } else {
                        text = '<span class="frezonTxt" data-val="' + full.isFrozen + '">未知状态</span>';
                    }
                    return text;
                }
            },
            {"sWidth": "110px", "sTitle": "注册时间", "mData": "createTime"}
        ],
        "oLanguage": {
            "sProcessing": "数据加载中······",
            "sLengthMenu": "显示 _MENU_ 条记录",
            "sZeroRecords": "没有您要搜索的内容！",
            "sEmptyTable": "列表中无数据存在！",
            "sInfo": "当前显示 _START_ 到 _END_ 条数据，共 _TOTAL_ 条数据",
            "sInfoEmpty": "显示 0 到 0 条记录",
            "sInfoFiltered": "数据列表中共  _MAX_ 条记录",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "末页"
            }
        },
        "fnServerData": function (sSource, aoData, fnCallback, oSettings) {
            oSettings.jqXHR = $.ajax({
                "dataType": 'json',
                "type": "POST",
                "async": 'false',
                "url": sSource,
                "data": {
                    'pageNum': (aoData[3].value / aoData[4].value) + 1,
                    'pageSize': aoData[4].value,
                    'nickName': $("#nickName").val(),
                    'telPhone': $('#telPhone').val(),
                    'startTime': $('#startTime').val(),
                    'endTime': $('#endTime').val(),
                    'isFrozen': $('#isFrozen').val()
                },
                "success": fnCallback
            });
        },
        "fnDrawCallback": function () {
            var api = this.api();
            var startIndex = api.context[0]._iDisplayStart;//获取到本页开始的条数
            api.column(1).nodes().each(function (cell, i) {
                cell.innerHTML = startIndex + i + 1;
            });
        }
    });
});

function doFrezon(oper) {
    var memberId = $('input[name="memberId"]:checked').val();
    if (!memberId) {
        Dialog.alertWarn("请选择行");
        return;
    }
    var type = $('input[name="memberId"]:checked').parents('tr').find(".frezonTxt").attr("data-val");
    var url = "";
    if (oper == 1) {
        url = "/web/member/doMemberFrezon";
        if (type == 1) {
            Dialog.alertWarn("此会员已冻结，无效操作");
            return;
        }
    }

    if (oper == 2) {
        url = "/web/member/unMemberFrezon";
        if (type == 0) {
            Dialog.alertWarn("此会员正常，无效操作");
            return;
        }
    }

    var data = {oper: oper, memberId: memberId};
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (json) {
            if (json.code == 200) {
                Dialog.alertRefreshInfo(json.message);
            } else {
                Dialog.alertWarn(json.message);
            }
        }
    });
}

function resetPwd() {
    var memberId = $('input[name="memberId"]:checked').val();
    if (!memberId) {
        Dialog.alertWarn("请选择行");
        return;
    }
    $.ajax({
        url: '/web/member/memberResetPwd',
        type: 'post',
        data: {memberId: memberId},
        dataType: 'json',
        success: function (json) {
            if (json.code == 200) {
                Dialog.alertInfo(json.message);
            } else {
                Dialog.alertWarn(json.message);
            }
        }
    });
}

function promotedHunter() {
    var memberId = $('input[name="memberId"]:checked').val();
    if (!memberId) {
        Dialog.alertWarn("请选择行");
        return;
    }
    var telPhone = $('input[name="memberId"]:checked').parents('tr').find(".class-tel").text();
    var nickName = $('input[name="memberId"]:checked').parents('tr').find(".class-nick").text();
    var index = layer.open({
            type: 2,
            title: '荣升猎头',
            closeBtn: 1,
            area: ['100%','100%'],
            // maxmin: true,
            shade: 0,
        btnAlign : 'c',
        content : "/web/member/toPromotedHunter?telPhone=" + telPhone + "&nickName=" + nickName + "&memberId=" + memberId
});
    layer.full(index);
}
