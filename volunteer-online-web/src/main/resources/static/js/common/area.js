var Area = function () {

};

//将提交的表单数据转换成json数据格式
(function($) {
    $.fn.serializeJson = function() {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function() {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [ serializeObj[this.name], this.value ];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);

//获取省市区公共js
//查询市
$(function () {
    var provinceId = 0;
    $(".selectpicker").selectpicker('val', '');
    $(".selectpicker").selectpicker('refresh', '');
    $.ajax({
        url: '/web/positions',
        type: 'post',
        data: {
            provinceId: provinceId
        },
        dataType: 'json',
        success: function (json) {
            json = json.data;
            for (var i = 0; i < json.length; i++) {
                $("#provinceId1").append("<option value='" + json[i].provinceId + "'>" + json[i].name + "</option>");
                $("#provinceId").append("<option value='" + json[i].provinceId + "'>" + json[i].name + "</option>");
            }
            $(".selectpicker").selectpicker('refresh');
        }

    });
});
//获取市
Area.getCityies = function (provinceId, cityId, countyId, townId, guildId) {
    var provinceId = $("#" + provinceId).val();
    $("#" + cityId).empty();
    $("#" + cityId).prepend("<option value=''>请选择市</option>");
    $("#" + countyId).empty();
    $("#" + countyId).prepend("<option value=''>请选择区</option>");
    clData(townId, guildId);
    $.ajax({
        url: '/web/positions',
        type: 'post',
        data: {
            provinceId: provinceId
        },
        dataType: 'json',
        success: function (json) {
            json = json.data;
            for (var i = 0; i < json.length; i++) {
                $("#" + cityId).append("<option value='" + json[i].cityId + "'>" + json[i].name + "</option>");
            }
            $(".selectpicker").selectpicker('refresh');
        }
    });
}

//获取区
Area.getCounties = function (cityId, countyId, townId, guildId) {
    var cityId = $("#" + cityId).val();
    $("#" + countyId).empty();
    $("#" + countyId).prepend("<option value=''>请选择区</option>");
    clData(townId, guildId);
    $.ajax({
        url: '/web/positions',
        type: 'post',
        data: {
            cityId: cityId
        },
        dataType: 'json',
        success: function (json) {
            json = json.data;
            for (var i = 0; i < json.length; i++) {
                $("#" + countyId).append("<option value='" + json[i].countyId + "'>" + json[i].name + "</option>");
            }
            $(".selectpicker").selectpicker('refresh');
        }
    });
}

//获取社区
Area.getTowns = function (countyId, townId) {
    var countyId = $("#" + countyId).val();
    $("#" + townId).empty();
    $("#" + townId).prepend("<option value=''>请选择社区</option>");

    $.ajax({
        url: '/web/positions',
        type: 'post',
        data: {
            countyId: countyId
        },
        dataType: 'json',
        success: function (json) {
            json = json.data;
            for (var i = 0; i < json.length; i++) {
                $("#" + townId).append("<option value='" + json[i].townId + "'>" + json[i].name + "</option>");
            }
            $(".selectpicker").selectpicker('refresh');
        }
    });
}

function clData (townId, guildId) {
    if(!!townId) {
        $("#" + townId).empty();
        $("#" + townId).prepend("<option value=''>请选择社区</option>");
    }
    if(!!guildId) {
        $("#" + guildId).empty();
        $("#" + guildId).prepend("<option value=''>请选择工会</option>");
    }
}