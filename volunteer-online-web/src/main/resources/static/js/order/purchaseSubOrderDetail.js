$(function () {
    $('#subOrderDetailTable').DataTable({
        "bServerSide": true,
        "sPaginationType": "full_numbers",
        //"bJQueryUI": true,
        "sDom": '<"">t<"F"ip>',
        "autoWidth": false,  //自适应宽度
        //"sAjaxSource": "${ctx}/api/user/list", //ajax调用接口
        //<div class="btn-group" style="text-align:left;"><button type="button" class="btn btn-info dropdown-toggle"data-toggle="dropdown">操作 <span class="caret"></span></button>
        "sAjaxSource": "/web/purchaseSubOrder/getPurchaseSubOrderProd", //ajax调用接口
        "aoColumnDefs": [{sDefaultContent: '', orderable: false, aTargets: ['_all']}],
        "aoColumns": [
            {"sWidth": "50px", "sTitle": "序号", "mData": ""},
            {
                "sTitle": "商品名称",
                "mData": "productName"
            },
            {"sTitle": "总数量", "mData": "skuNum"},
            {"sTitle": "总金额(元)", "mData": "totalMoney"},
            {"sTitle": "型号", "mData": "createTime"}
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
                    'orderNo': $("#orderNo").val(),
                    'telPhone': $("#telPhone").val(),
                    'status': $('#status').val()
                },
                "success": fnCallback
            });
        },
        "fnDrawCallback": function () {
            var api = this.api();
            var startIndex = api.context[0]._iDisplayStart;//获取到本页开始的条数
            api.column(0).nodes().each(function (cell, i) {
                cell.innerHTML = startIndex + i + 1;
            });
        }
    });
});