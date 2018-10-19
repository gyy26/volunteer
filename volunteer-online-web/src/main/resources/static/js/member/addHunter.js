$(function () {
    //关闭iframe
    /*$('.cancel').click(function () {
        parent.layer.close(index);
    });*/
    //图片初始化
    $("#upImage").takungaeImgup({
        formData: {
            'name':'image',
            'filesname': 'file'
        },
        url: '/web/attachment/uploadImage',
        maxImage: 1,
        success: function (data) {
            layer.alert(data);
            // $("#image").val(data.data);
        },
        error: function (err) {
            layer.alert(err, {icon: 2, btnAlign: 'c', closeBtn: 0});
        }
    });
    $('.submit').click(function () {
        $('#formID').submit();
    });
    //验证
    $("#addHunterForm").validationEngine({
        addPromptClass: 'formError-text',
        showArrow: false,
        promptPosition: 'bottomLeft:10 0',
        autoHidePrompt: true,
        autoHideDelay: 3000,
        fadeDuration: 0.6
    });
    //图片点击放大
    $('.zoom-img').viewer({
        url: 'src',
        navbar: false,
        keyboard: true,
        title: true
    });

    $('.guild .selectpicker').change(function () {
        $('.guild .selectpicker').addClass('validate[required]');
        if ($('.guild .selectpicker>option:selected').val() == '') {
            $('.guild .selectpicker').removeClass('validate[required]');
        }
    });
    $('.lt .selectpicker').change(function () {
        $('.lt .selectpicker').addClass('validate[required]');
        if ($('.lt .selectpicker>option:selected').val() == '') {
            $('.lt .selectpicker').removeClass('validate[required]');
        }
    });
});

function getCityies(provinceId, cityId, countyId, townId, guildId) {
    Area.getCityies(provinceId, cityId, countyId, townId, guildId);
}

function getCounties(cityId, countyId, townId, guildId) {
    Area.getCounties(cityId, countyId, townId, guildId);
}

function getCommities(countyId, townId) {
    Area.getTowns(countyId, townId);
}

function findGuild(provinceId, cityId, countryId, guildId) {
    $("#" + guildId).empty();
    $("#" + guildId).prepend("<option value=''>请选择工会</option>");
    var data = {
        provinceId: $("#provinceId1").val(),
        cityId: $("#cityId1").val(),
        countyId: $("#countyId1").val()
    }
    $.ajax({
        url: '/web/positions/findGuild',
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (json) {
            json = json.data;
            for (var i = 0; i < json.length; i++) {
                $("#" + guildId).append("<option value='" + json[i].id + "'>" + json[i].name + "</option>");
            }
            $(".selectpicker").selectpicker('refresh');
        }
    });
}

function addHunter() {
    var hunterName = $("#hunterName").val();
    if(!hunterName) {
        Dialog.alertWarn("猎头名称不能为空");
        return;
    }

    var data = $("#addHunterForm").serializeJson();
    data["provinceName"] = $("#provinceId option:selected").text();
    data["cityName"] = $("#cityId option:selected").text();
    data["countyName"] = $("#countyId option:selected").text();
    data["townName"] = $("#townId option:selected").text();
    var type = $('input[name="type1"]:checked').val();
    if(type == 1) {
        data["type"] = 0;
    }
    if(type == 2) {
        data["type"] = 1;
    }

    var len = $(".addLabel").length;
    var lableIds = "";
    for(var i=0; i<len; i++) {
        lableIds += $(".addLabel")[i].getAttribute("id") + ",";
    }
    lableIds = lableIds.substring(0,lableIds.length-1);
    if(!lableIds || lableIds.length == 0) {
        Dialog.alertWarn("请选择标签");
        return;
    }
    data["lableIds"] = lableIds;
    //经度
    var lng =data.longitude;
    data["longitude"] = lng[0];
    //纬度
    var lat = data.latitude;
    data["latitude"] = lat[0];
    // alert(JSON.stringify(data));
    $.ajax({
        url: '/web/member/upgradeToHunter',
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (json) {
            if (json.code == 200) {
                Dialog.alertInfoCol(json.message);
            } else {
                Dialog.alertWarn(json.message);
            }
        }
    });
}

function cancel() {
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);
}