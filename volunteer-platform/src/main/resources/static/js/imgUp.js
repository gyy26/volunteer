/*
 *模块：图片上传控件
 *时间：20170511
 *作者：刘弘愿
 */
$(function () {

    var delParent;

    $("#imguploadFinish").val(false);
    $.fn.extend({
        takungaeImgup: function (opt, serverCallBack) {
            console.log("调用takungaeImgup");
            if (typeof opt != "object") {
                alert('参数错误!');
                return;
            }
            var isViewer = true;    //是否放大查看图片
            var isCover = false;    //是否设为封面
            var $fileInput = $(this);
            var $fileInputId = $fileInput.attr('id');
            var maxImage = opt.maxImage;
            isCover = opt.isCover;
            isViewer = opt.isViewer;
            var defaults = {
                fileType: ["jpg", "png", "bmp", "jpeg", "JPG", "PNG", "JPEG", "BMP"], // 上传文件的类型
                fileSize: 1024 * 1024 * 3,// 上传文件的大小 3M
                count: 0
                // 计数器
            };

            if(opt.fileType){
                defaults.fileType.push.apply(defaults.fileType,opt.fileType)
            }

            // 组装参数;

            if (opt.success) {
                var successCallBack = opt.success;
                delete opt.success;
            }

            if (opt.error) {
                var errorCallBack = opt.error;
                delete opt.error;
            }

            /* 点击图片的文本框 */
            $(this).change(function () {
                $(this).parents('.filePhoto').attr('maxImage', maxImage);
                var reader = new FileReader();
                var $inputVal = $(this);
                var idFile = $(this).attr("id");
                if(idFile=="icon1"){
                    $("#temp").val(1)
                }else if(idFile=="icon2"){
                    $("#temp").val(2)
                }else if(idFile=="icon3"){
                    $("#temp").val(3)
                }else if(idFile=="icon4"){
                    $("#temp").val(4)
                }
                var file = document.getElementById(idFile);
                var imgContainer = $(this).parents(".filePhoto"); //存放图片的父亲元素
                var fileList = file.files; //获取的图片文件
                var input = $(this).parent();//文本框的父亲元素
                var imgArr = [];
                //遍历得到的图片文件
                var numUp = imgContainer.find(".up-section").length;
                var totalNum = numUp + fileList.length;  //总的数量
                if (fileList.length > maxImage || totalNum > maxImage) {
                    alert("上传图片数目不可以超过" + maxImage + "个，请重新选择");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
                }
                else if (numUp < maxImage) {
                    fileList = validateUp(fileList);

                    for (var i = 0; i < fileList.length; i++) {
                        var imgUrl = window.URL.createObjectURL(fileList[i]);
                        imgArr.push(imgUrl);
                       var $section = $("<section class='up-section left loading'>");//正式环境请放开这条代码
                        //var $section = $("<section class='up-section left'>");//本地测试请使用这条代码
                        imgContainer.prepend($section);
                        var $span = $("<span class='up-span'>");
                        $span.appendTo($section);
                        if(isCover){
                            var $default = $('<input class="up-default" data-val="0" type="button" value="设为封面">');
                            $default.appendTo($section);
                            var $cover = $("<span class='ImgCover hideCover require'>封面</span>");
                            $cover.appendTo($section);
                        }
                        var $img0 = $("<img class='close-upimg'>");
                        $('.uploadImg').on("click",".close-upimg", function () {
                            var max = $(this).parents('.filePhoto').attr('maxImage');
                            delParent = $(this).parent();
                            var numUp = delParent.siblings().length;
                            if (numUp < max + 1) {
                                delParent.parent().find(".fileBox").show();
                            }
                            delParent.remove();
                            $inputVal.val('');
                        });
                        $(".uploadImg").on('click','.up-default',function(){
                            $(this).parents('.up-section').addClass('showCover').siblings().removeClass('showCover');
                            $('.up-default').attr("data-val","0");
                            $(this).attr("data-val","1");
                            //$cover.appendTo($section);
                        });
                        $img0.attr("src", "/static/images/img-del.png").appendTo($section);
                        if(isViewer){                 //正式环境请放开这条代码
                            var $img = $('<img class="up-img zoom-img up-opacity">').viewer({
                                    url: 'src',
                                    navbar: false,
                                    keyboard: true,
                                    title: true
                                });
                        }else{
                            var $img = $('<img class="up-img zoom-img up-opacity">')
                        }

                        /*if(isViewer){
                            var $img = $('<img class="up-img zoom-img">').viewer({//本地测试请使用这条代码
                                url: 'src',
                                navbar: false,
                                keyboard: true,
                                title: true
                            });
                        }else{
                            var $img = $('<img class="up-img zoom-img">');
                        }*/
                        $img.attr("src", imgArr[i]).appendTo($section);
                        var $p = $("<p class='img-name-p hide'>");
                        $p.html(fileList[i].name).appendTo($section);
                        uploadImg(opt, fileList[i], $section);   //本地测试需要注释
                                                                   //正式环境请去掉注释
                    }

                }
                numUp = imgContainer.find(".up-section").length;
                if (numUp >= maxImage) {
                    $(this).parent().hide();
                }


            });


            function validateUp(files) {
                var arrFiles = [];//替换的文件数组
                for (var i = 0, file; file = files[i]; i++) {
                    //获取文件上传的后缀名
                    var newStr = file.name.split("").reverse().join("");
                    if (newStr.split(".")[0] != null) {
                        var type = newStr.split(".")[0].split("").reverse().join("");
console.log("index:",jQuery.inArray(type, defaults.fileType),defaults.fileType)
                        if (jQuery.inArray(type, defaults.fileType) > -1) {
                            // 类型符合，可以上传
                            if (file.size >= defaults.fileSize) {
                                alert(file.size);
                                alert('您这个"' + file.name + '"文件大小过大');
                            } else {
                                // 在这里需要判断当前所有文件中
                                arrFiles.push(file);
                                //console.log('a' + arrFiles);
                            }
                        } else {
                            alert('您这个"' + file.name + '"上传类型不符合');
                        }
                    } else {
                        alert('您这个"' + file.name + '"没有类型, 无法识别');
                    }
                }
                return arrFiles;

            }


            function uploadImg(opt, file, obj) {

                // 验证通过图片异步上传
                var url = opt.url;
                var filesName = opt.formData.filesname;
                var module = opt.formData.module;
                /*console.log(opt);
                console.log(file);
                console.log(obj);
                console.log(url);
                console.log(filesName);
                console.log(module);*/
                var name=opt.formData.name;
                var data = new FormData();
                //formdata参数插入
                data.append('module', module);
                data.append(filesName, file);
                 data.append('name',name);
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: data,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    // jsonp:'callback',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("X-Custom-Header1", "Bar");
                    },
                    success: function (data) {
                        if (successCallBack) {
                            obj.removeClass("loading");
                            obj.find(".up-img").removeClass("up-opacity");
                            obj.find(".up-img").prop('src', data.data);
                            var html = "<input type='hidden'"
                                + "name='" + name
                                + "'"
                                + "value='" + data.data + "'"
                                + "/>";
                            obj.after(html);
                            successCallBack(data);
                        } else {
                            obj.removeClass("loading");
                            obj.find(".up-img").removeClass("up-opacity");
                            obj.find(".up-img").attr('src', data.url);
                            var html = "<input type='hidden'"
                                + "name='" + name
                                + "'"
                                + "value='" + data.data + "'"
                                + "/>";
                            obj.after(html);
                        }
                    },
                    error: function (e) {
                        obj.remove();
                        var err = "上传失败，请联系管理员！";
                        $("#imguploadFinish").val(false);
                        if (errorCallBack) {
                            errorCallBack(err);
                        }
                    }
                });
            }
        }
    });
});
