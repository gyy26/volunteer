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

            var $fileInput = $(this);
            var $fileInputId = $fileInput.attr('id');
            var maxImage = opt.maxImage;
            var defaults = {
                fileType: ["jpg", "png", "bmp", "jpeg", "JPG", "PNG", "JPEG", "BMP"], // 上传文件的类型
                fileSize: 1024 * 1024 * 5,// 上传文件的大小 5M
                count: 0,
                // 计数器
            };

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
                var reader = new FileReader();
                var $inputVal = $(this);
                var idFile = $(this).attr("id");
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
                        var $section = $("<section class='up-section left loading'>");
                        imgContainer.prepend($section);
                        var $span = $("<span class='up-span'>");
                        $span.appendTo($section);
                        var $img0 = $("<img class='close-upimg'>");
                        $('.uploadImg').on("click", ".close-upimg", function () {
                            delParent = $(this).parent();
                            var numUp = delParent.siblings().length;
                            if (numUp < maxImage + 1) {
                                delParent.parent().find(".fileBox").show();
                            }
                            delParent.remove();
                            $inputVal.val('');
                        });

                        $img0.attr("src", "/static/images/img-del.png").appendTo($section);
                        var $img = $("<img class='up-img zoom-img'>").on("click", function (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        });
                        $img.attr("src", imgArr[i]).appendTo($section);
                        var $p = $("<p class='img-name-p hide'>");
                        $p.html(fileList[i].name).appendTo($section);
                        var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
                        $input.appendTo($section);
                        var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
                        $input2.appendTo($section);
                        uploadImg(opt, fileList[i], $section);   //本地测试需要注释
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
                // var name=opt.formData.name;
                var data = new FormData();
                //formdata参数插入
                data.append('module', module);
                data.append(filesName, file);
                // data.append('name',name);
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
                    	var dataData = data.data;
                    	var dataData0 = dataData[0];
                        obj.removeClass("loading");
                        obj.find(".up-img").removeClass("up-opcity");
                        obj.find(".up-img").attr('src', data.url);
                        var html = "<input type='hidden' myAttr = 'getAttr' "
                            // + "name='" + data.name + "'"
                            + "value='" + data.data + "'"
                            + "/>";
                        obj.append(html);
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