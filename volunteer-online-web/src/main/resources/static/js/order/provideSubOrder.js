$(function () {
    //table点击和双击点击事件
	 $('#subOrderTable').on('click','tbody tr',function(){
         $(this).addClass('wareBg').siblings('tr').removeClass('wareBg');
         $(this).find('.ids').prop('checked',true);
         $(this).siblings().find('.ids').prop('checked',false);
         //代发货才有立即发货
         var status = $('.wareBg').children('td').eq(6).children('span').attr('data-val');
         if(status != 1){
        	  $('.ph_snbBtn').hide();
          }else{
        	$('.ph_snbBtn').show();
          }
     });
  	 
    $('#subOrderTable').on('dblclick', 'tbody tr', function () {
    	var subOrderId = $('.wareBg').children('td').eq(1).attr('title');
        var index = layer.open({
            type: 2,
            title: '供货订单详情',
            closeBtn: 1,
            area: ['100%', '100%'],
            //maxmin: true,
            shade: 0,
            //btn: ['返回'],
            btnAlign: 'c',
            content: "/web/purchaseSubOrder/getPurchaseSubOrderDetail?subOrderId=" + subOrderId
        });
        layer.full(index);
    });
  //立即发货
    $('.ph_snbBtn').on('click','.js_delivery',function(){
    	  //供货订单表主键id
    	  var subOrderId = $('.wareBg').children('td').eq(1).attr('title');
    	  
    	  var id = $('input[name="ids"]:checked').val();
          if (!id || id == '') {
              layer.alert("请先选择要发货的数据", {icon: 2,btnAlign: 'c', closeBtn : 0});
              return;
          }
          
          //地址回填
       	 $.ajax({
                url:'/web/provideSubOrder/getSupplierAddress',
                type:'get',
                data:{},
                dataType:'json',
                success:function (data) {
             	   if(data != null && data.data != null && data.data.length > 0){
                       $('#address').find('option').remove();
                       $('#address').append('<option value="">全部</option>');
                       $('#address').selectpicker('refresh');
                 		 for (var i = 0; i < data.data.length; i++) {
                              $("#address").append("<option value='" + data.data[i].id + "'>" + data.data[i].address + "</option>");
                          }
                          $('#address').selectpicker('refresh');
                          //有数据才弹框
                          layer.open({
                              type: 1,
                              title: '立即发货',
                              closeBtn: 1,
                              area: ['800px','300px;'],
                              //maxmin: true,
                              btn: ['是', '返回'], //按钮
                              btnAlign: 'c',
                              content: $('#deliveryBox'),
                              btn1: function (index) {
                            	  var sendAddressId = $("select[name='address']").val();
                            	  if(sendAddressId == null || sendAddressId == ""){
                            		  layer.alert("请先选择要发货的地址", {icon: 2,btnAlign: 'c', closeBtn : 0});
                                      return;
                            	  }
                            	  $.ajax({
                                      async: false,
                                      url: "/web/provideSubOrder/supplierSendGoods",
                                      data: {
                                    	  subOrderId: subOrderId,
                                    	  sendAddressId: sendAddressId
                                    	  },
                                      type: "POST",
                                      dataType: "json",
                                      success: function (data) {
                                          if (data.success) {
                                              layer.alert("发货成功!", {
                                                  icon: 1,
                                                  title: '提示',
                                                  closeBtn: 0,
                                                  btnAlign: 'c'
                                              });
                                              tb.draw();
                                          } else {
                                              layer.alert(data.message, {
                                                  icon: 2,
                                                  title: '失败',
                                                  closeBtn: 0,
                                                  btnAlign: 'c'
                                              });
                                          }
                                      }
                                  });
                                  layer.close(index);
                              }
                          });
       	             } else{
       	            	  layer.alert("请先去添加发货地址", {icon: 2,btnAlign: 'c', closeBtn : 0});
       	                  return;
       	              }
                }
            });
    });
    
    var tb = $('#subOrderTable').DataTable({
        "bServerSide": true,
        "sPaginationType": "full_numbers",
        //"bJQueryUI": true,
        "sDom": '<"">t<"F"ip>',
        "autoWidth": false,  //自适应宽度
        //"sAjaxSource": "${ctx}/api/user/list", //ajax调用接口
        //<div class="btn-group" style="text-align:left;"><button type="button" class="btn btn-info dropdown-toggle"data-toggle="dropdown">操作 <span class="caret"></span></button>
        "sAjaxSource": "/web/provideSubOrder/getProvideSubOrders", //ajax调用接口
        "aoColumnDefs": [{sDefaultContent: '', orderable: false, aTargets: ['_all']}],
        "aoColumns": [
            { "sWidth": "40px","sTitle" : "<input class= \"check-all\" name=\"\" type=\"checkbox\">", "mData": "id","mRender": function(ata, type, full){
                return '<input class="ids"  type="checkbox" name="ids" type="checkbox"  value="' + full.subOrderId +'">';
            }},
            { "sWidth": "50px","sTitle" : "序号", "mData": "subOrderId"},
            {
                "sTitle": "工会id",
                "mData": "guildId",
                "bVisible": false,
                "sClass": "class-guild"
            },
            {"sTitle": "协会账号", "mData": "guildTel"},
            {"sTitle": "订单号", "mData": "orderNo"},
            {"sTitle": "下单时间", "mData": "createTime"},
            {"sTitle": "订单金额", "mData": "totalCost"},
            {
                "sWidth": "100px",
                "sTitle": "订单状态",
                "mData": "status",
                "mRender": function (data, type, full) {
                    var text;
                    //0待付款，1待发货，2待收货，3交易完成，4交易取消
                    if (full.status == 0) {
                        text = '<span class="cla-status" data-val="' + full.status + '" color=\'black\'>待付款</span>';
                    } else if (full.status == 1) {
                        text = '<span class="cla-status" data-val="' + full.status + '" color=\'black\'>待发货</span>';
                    } else if (full.status == 2) {
                        text = '<span class="cla-status" data-val="' + full.status + '" color=\'black\'>待收货</span>';
                    } else if (full.status == 3) {
                        text = '<span class="cla-status" data-val="' + full.status + '" color=\'black\'>交易完成</span>';
                    } else if (full.status == 4) {
                        text = '<span class="cla-status" data-val="' + full.status + '" color=\'gray\'>交易取消</span>';
                    }
                    return text;
                }
            }
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
                    'guildTel': $("#guildTel").val(),
                    'status': $('#status').val()
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

function handleOrder(oper) {
    var subOrderId = $('input[name="subOrderId"]:checked').val();
    if (!subOrderId) {
        Dialog.alertWarn("请选择行");
        return;
    }
    var guildId = $('input[name="subOrderId"]:checked').parents('tr').find(".class-guild").text();
    var status = $('input[name="subOrderId"]:checked').parents('tr').find(".cla-status").attr("data-val");
    // alert(subOrderId);
    if (oper == 1) {
        var jsonData = {
            subOrderId: subOrderId,
            guildId: guildId,
            operType: oper,
            status: status
        };
        layer.confirm('请核对您是否已经收到货物，确定收货？', {
            title: '确认收货',
            icon: 3,
            btnAlign: 'c',
            btn: ['确认', '返回'],
            yes: function (index, layero) {
                $.ajax({
                    url: '/web/purchaseSubOrder/modifyOrderStatus',
                    type: 'post',
                    data: jsonData,
                    dataType: 'json',
                    success: function (json) {
                        if (json.code == 200) {
                            Dialog.alertInfo(json.message);
                            Dialog.refreshTable("subOrderTable");
                            layer.close(index);
                        } else {
                            Dialog.alertWarn(json.message);
                            layer.close(index);
                        }
                    }
                });
            },
            closeBtn: 0
        });
    } else {
        var jsonData = {
            subOrderId: subOrderId,
            guildId: guildId,
            operType: oper,
            status: status
        };
        layer.confirm('请您确定是否取消订单？', {
            title: '取消订单',
            icon: 3,
            btnAlign: 'c',
            btn: ['确认', '返回'],
            yes: function (index, layero) {
                $.ajax({
                    url: '/web/purchaseSubOrder/modifyOrderStatus',
                    type: 'post',
                    data: jsonData,
                    dataType: 'json',
                    success: function (json) {
                        if (json.code == 200) {
                            Dialog.alertInfo(json.message);
                            Dialog.refreshTable("subOrderTable");
                            layer.close(index);
                        } else {
                            Dialog.alertWarn(json.message);
                            layer.close(index);
                        }
                    }
                });
            },
            closeBtn: 0
        });
    }
}