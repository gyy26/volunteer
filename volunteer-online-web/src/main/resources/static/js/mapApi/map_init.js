/*
 *模块：添加行业
 *时间：20170516
 *作者：刘弘愿
 */

// var map = new AMap.Map('map_container', {
//     resizeEnable: true,
//     zoom: 10,
//     center: [116.480983,40.0958],
//     // position: [116.480983, 39.989628],//marker所在的位置
//     scrollWheel: true,
//     isHotspot:true
// });

var map = new AMap.Map('map_container',{
    resizeEnable: true,
    zoom: 16,
    center: [116.39,39.9],
    isHotspot:true,
    dragEnable:true,
    doubleClickZoom:true,
    keyboardEnable:true,
    scrollWheel:true,
    features:['bg','point','road','building']
});
AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
    map.addControl(new AMap.ToolBar());

    map.addControl(new AMap.Scale());

});
AMap.plugin('AMap.Geocoder',function(){
    var geocoder = new AMap.Geocoder({
        city: ""//城市，默认：“全国”
    });
    var marker = new AMap.Marker({
        map:map,
        bubble:true
    })
    var input = document.getElementById('tipinput');
    var lng=document.getElementById('lng');
    var lat=document.getElementById('lat');
    var message = document.getElementById('message');
    map.on('click',function(e){
        marker.setPosition(e.lnglat);
        geocoder.getAddress(e.lnglat,function(status,result){
            console.log(result);
            console.log(e.lnglat);
            if(status=='complete'){
                input.value = result.regeocode.formattedAddress
                var lngCode =e.lnglat.lng;
                var latCode =e.lnglat.lat;
                var latInput =document.createElement("input");
                latInput.type="hidden";
                latInput.name="latitude";
                latInput.value=latCode;
                lat.innerHTML=latCode;
                lat.appendChild(latInput);
                var lngInput =document.createElement("input");
                lngInput.type="hidden";
                lngInput.name="longitude";
                lngInput.value=lngCode;
                lng.innerHTML=lngCode;
                lng.appendChild(lngInput);
            }
            else{
               layer.msg('网络异常，无法获取地址，请重试或者联系管理员！');
               return;
            }
        })
    })

    input.onchange = function(e){
        var address = input.value;
        geocoder.getLocation(address,function(status,result){

            if(status=='complete'&&result.geocodes.length){
                marker.setPosition(result.geocodes[0].location);
                lng.innerHTML=result.geocodes[0].location.lng
                lat.innerHTML=result.geocodes[0].location.lat
                map.setCenter(marker.getPosition())
            }else{
                layer.msg('网络异常，无结果返回，请重试或者联系管理员！');
                return
            }
        })
    }

});