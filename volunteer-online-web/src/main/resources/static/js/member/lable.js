$(function () {
    var parentId = 0;
    var childTxt,childVal,labelTxt;//获取选择的猎头标签信息

    $(".select_One,.select_Two").selectpicker('refresh','');
    document.getElementById('childLable').options.length=0;
    $.ajax({
        url:'/web/classify/getProductClassify',
        type:'post',
        data:{parentId:parentId},
        success:function (json) {
            for (var i = 0; i < json.length; i++) {
                $("#parentLable").append("<option value='" + json[i].id + "'>" + json[i].classifyName + "</option>");
            }
            $('.selectpicker').selectpicker('refresh');
        }
    });

    //猎头下拉框选择赋值
    $('select[name="childLable"]').on('change',function(){
        childTxt=$('.select_Two button').attr('title');
        childVal=$(this).val();
        //标签文本缓存
        labelTxt=childTxt.split(",");

    });
    //猎头添加方法
    function addHunter(txt,val) {
        var stxt=txt.split(",");
        var sval=String(val).split(",");
        for(var i=0;i<stxt.length;i++){
            var html='<span class="addLabel" id="'+sval[i]+'">'+stxt[i]+'<i class="addLabelClose">x</i></span>';
            $('.js_addhuntBtn').before(html);
        }
    }
    $('.addList').on('click','.js_addhuntBtn',function(){
        var labelArr=[];//已添加标签缓存数组
        var obj=$('.addLabel');
        //有标签存在就缓存已有id值
        if(obj){
            for(var i=0;i<obj.length;i++){
                var currentId=obj.eq(i).attr('id');
                labelArr.push(currentId);
            }
        }
        if (labelArr.length <10) {
            layer.open({
                type: 1,
                title: '添加标签',
                closeBtn: 1,
                area: ['540px', '320px'],
                btn: ['确定', '取消'],
                btnAlign: 'c',
                content: $('#ph_LabelBox'),
                btn1: function (index) {
                    //剔除重复项
                    for (var i = 0; i < childVal.length; i++) {
                        for (var j = 0; j < labelArr.length; j++) {
                            if (labelArr[j] == childVal[i]) {
                                labelTxt.splice(i, 1);
                                childVal.splice(i, 1);
                            }
                        }
                    }
                    //统计非重复项和已存在标签总和是否达到最大限制
                    var count =labelTxt.length+labelArr.length;
                    //对非重复项执行操作
                    if (labelTxt.length > 0) {
                        labelTxt = labelTxt.join(',');
                    }else{
                        layer.alert('已达到最大当前选择项均重复，请重新选择',{icon: 2,btnAlign: 'c', closeBtn : 0});
                        $('.select_Two').selectpicker('val','');
                        $('.select_Two').selectpicker('refresh','');
                    }
                    if (count <= 10) {
                        addHunter(labelTxt, childVal);
                        //添加后的清空操作
                        document.getElementById('childLable').options.length = 0;
                        $(".select_One,.select_Two").selectpicker('val', '');
                        $(".select_One").selectpicker('refresh', '');
                        layer.close(index);
                    } else {
                        $(".select_Two").selectpicker('val', '');
                        $(".select_Two").selectpicker('refresh', '');
                        layer.alert('最多添加10个猎头标签，请重试',{icon: 2,btnAlign: 'c', closeBtn : 0});
                    }
                }
            });
        }else{
            layer.alert('已达到最大标签数量10个，无法继续添加',{icon: 2,btnAlign: 'c', closeBtn : 0});
        }
    });

    $('.ph_add_headhunt').on('click','.addLabelClose',function () {
        $(this).parent().remove();
    });

});

function getChildren() {
    $('#childLable').find('option').remove();

    var parentId = $("#parentLable").val();
    $.ajax({
        url:'/web/classify/getProductClassify',
        type:'post',
        data:{parentId:parentId},
        success:function (json) {
            for (var i = 0; i < json.length; i++) {
                $("#childLable").append("<option value='" + json[i].id + "'>" + json[i].classifyName + "</option>");
            }
            $('.selectpicker').selectpicker('refresh');
        }
    });
}