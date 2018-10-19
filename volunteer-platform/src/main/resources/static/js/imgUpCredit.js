/*
 *模块：图片上传控件
 *时间：20170511
 *作者：刘弘愿
 */
var defaults,typeName;
var word = ['doc', 'docx'];
var excel=['xls','xlsx'];
var pdf=['pdf'];
var ppt=['ppt','pptx'];
var zip = ['rar', 'zip'];
var jpg=["jpg", "png", "bmp", "jpeg", "JPG", "PNG", "JPEG", "BMP"];
var wordIco_url='/static/images/word.jpg';
var excelIco_url='/static/images/excel.jpg';
var pdfIco_url='/static/images/pdf.jpg';
var pptIco_url='/static/images/ppt.jpg';
var rarIco_url='/static/images/rar.jpg';
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

            var isCover;   //是否设为封面
            var isFiles;   //多格式文件上传开关
            if(opt.isCover){
                isCover=opt.isCover;
            }else{
                isCover=false;
            }
            if(opt.isFiles){
                isFiles=opt.isFiles;
            }else{
                isFiles=false;
            }
            var $fileInput = $(this);
            var $fileInputId = $fileInput.attr('id');
            var maxImage = opt.maxImage;

            if (!isFiles) {
                defaults = {
                    fileType: ["jpg", "png", "bmp", "jpeg", "JPG", "PNG", "JPEG", "BMP"], // 上传文件的类型
                    fileSize: 1024 * 1024 * 5,// 上传文件的大小 5M
                    count: 0
                    // 计数器
                };
            } else {
                defaults = {
                    fileType: ["jpg", "png", "bmp", "jpeg", "JPG", "PNG", "JPEG", "BMP", 'doc', 'docx', 'DOC', 'DOCX', 'pdf', 'PDF', 'rar', 'RAR', 'zip', 'ZIP', 'ppt', 'PPT', 'xls', 'XLS', 'xlsx', 'XLSX','pptx','PPTX'], // 上传文件的类型
                    fileSize: 1024 * 1024 * 100,// 上传文件的大小 5M
                    count: 0
                    // 计数器
                };
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
                        typeName = GetFileExt(fileList[i].name);
                        var imgUrl, flag_word, flag_zip,flag_excel,flag_ppt,flag_pdf;
                        console.log(typeName);
                        if (contains(word, typeName)) {
                            flag_word = true;
                        } else {
                            flag_word = false;
                        }
                        if (contains(pdf, typeName)) {
                            flag_pdf = true;
                        } else {
                            flag_pdf = false;
                        }
                        if (contains(ppt, typeName)) {
                            flag_ppt = true;
                        } else {
                            flag_ppt = false;
                        }
                        if (contains(excel, typeName)) {
                            flag_excel = true;
                        } else {
                            flag_excel = false;
                        }
                        if (contains(zip, typeName)) {
                            flag_zip = true;
                        } else {
                            flag_zip = false;
                        }
                        console.log('是否图片：'+contains(jpg,typeName));
                        if (flag_word && !flag_zip&&!flag_pdf&&!flag_excel&&!flag_ppt) {
                            imgUrl =wordIco_url ;
                        } else if (!flag_word && flag_zip&&!flag_pdf&&!flag_excel&&!flag_ppt) {
                            imgUrl =rarIco_url ;
                        }else if(!flag_word && !flag_zip&&flag_pdf&&!flag_excel&&!flag_ppt){
                            imgUrl=pdfIco_url;
                        }
                        else if(!flag_word && !flag_zip&&!flag_pdf&&flag_excel&&!flag_ppt){
                            imgUrl=excelIco_url;
                        }
                        else if(!flag_word && !flag_zip&&!flag_pdf&&!flag_excel&&flag_ppt){
                            imgUrl=pptIco_url;
                        }
                        else {
                            imgUrl = window.URL.createObjectURL(fileList[i]);

                        }
                        imgArr.push(imgUrl);
                        // var $section = $("<section class='up-section left loading'>");//正式环境请放开这条代码
                        var $section = $("<section class='up-section left'>");//本地测试请使用这条代码
                        imgContainer.prepend($section);
                        var $span = $("<span class='up-span'>");
                        $span.appendTo($section);
                        if (isCover) {
                            var $default = $('<input class="up-default" data-val="0" type="button" value="设为封面">');
                            $default.appendTo($section);
                            var $cover = $("<span class='ImgCover hideCover require'>封面</span>");
                            $cover.appendTo($section);
                        }
                        var $img0 = $("<img class='close-upimg'>");
                        $('.uploadImg').on("click", ".close-upimg", function () {
                            var max = $(this).parents('.filePhoto').attr('maxImage');
                            delParent = $(this).parent();
                            var numUp = delParent.siblings().length;
                            if (numUp < max + 1) {
                                delParent.parent().find(".fileBox").show();
                            }
                            delParent.remove();
                            $inputVal.val('');
                        });
                        $(".uploadImg").on('click', '.up-default', function () {
                            $(this).parents('.up-section').addClass('showCover').siblings().removeClass('showCover');
                            $('.up-default').attr("data-val", "0");
                            $(this).attr("data-val", "1");
                            //$cover.appendTo($section);
                        });
                        $img0.attr("src", "/static/images/img-del.png").appendTo($section);
                        /*if(isViewer){                 //正式环境请放开这条代码
                            var $img = $('<img class="up-img zoom-img up-opacity">').viewer({
                                    url: 'src',
                                    navbar: false,
                                    keyboard: true,
                                    title: true
                                });
                        }else{
                            var $img = $('<img class="up-img zoom-img up-opacity">')
                        }*/
                        if (contains(jpg,typeName)) {
                            var $img = $('<img class="up-img zoom-img">').viewer({//本地测试请使用这条代码
                                url: 'src',
                                navbar: false,
                                keyboard: true,
                                title: true
                            });
                        } else {
                            var $img = $('<img class="up-img zoom-img">');
                        }
                        $img.attr("src", imgArr[i]).appendTo($section);
                        var $p = $("<p class='img-name-p'>");
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
                        console.log(defaults.fileType);
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
                var name = opt.formData.name;
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
                        if(data.data.type==0){
                            console.log('图片');
                            obj.removeClass("loading");
                            obj.find(".up-img").removeClass("up-opacity");
                            obj.find(".up-img").attr('src', data.data.url);
                            var html = "<input  type='hidden'"
                                 + "name='" + name + "'"
                                + "value='" + data.data.url + "'"
                                + "data-fileName='" + data.data.name + "'"
                                + "data-fileType='" + data.data.type + "'"
                                + "/>";
                            obj.append(html);
                            successCallBack&&successCallBack(data)
                        }else{
                            console.log('文档');
                            obj.removeClass("loading");
                            obj.find(".up-img").removeClass("up-opacity");
                            var txt=obj.children().eq(2);
                            if(!contains(jpg,typeName)){
                                txt.click(function () {
                                    window.open(data.data.url,'_blank');
                                })
                            }
                            var html = "<input type='hidden'"
                                 + "name='" + name + "'"
                                + "value='" + data.data.url + "'"
                                + "data-fileName='" + data.data.name + "'"
                                + "data-fileType='" + data.data.type + "'"
                                + "/>";
                            obj.append(html);
                            successCallBack&&successCallBack(data)
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

function  init_File(obj,isDetail,name) {
    //isDetail 判断详情页、修改页；
    // 参数：0 修改页；1 详情页
    var length=obj.length;
    var imgContainer = $(".filePhoto"); //存放图片的父亲元素
    var imgArr=[];
    var imgUrl;
    var $inputVal=$('input[type="file"]');
    var $hidden;//隐藏域元素;
    for(var i=0;i<length;i++){
        if(obj[i].type){
            var typeName = GetFileExt(obj[i].name);
            var flag_word, flag_zip,flag_excel,flag_ppt,flag_pdf;
            if (contains(word, typeName)) {
                flag_word = true;
            } else {
                flag_word = false;
            }
            if (contains(pdf, typeName)) {
                flag_pdf = true;
            } else {
                flag_pdf = false;
            }
            if (contains(ppt, typeName)) {
                flag_ppt = true;
            } else {
                flag_ppt = false;
            }
            if (contains(excel, typeName)) {
                flag_excel = true;
            } else {
                flag_excel = false;
            }
            if (contains(zip, typeName)) {
                flag_zip = true;
            } else {
                flag_zip = false;
            }
            if (flag_word && !flag_zip&&!flag_pdf&&!flag_excel&&!flag_ppt) {
                imgUrl =wordIco_url ;
            } else if (!flag_word && flag_zip&&!flag_pdf&&!flag_excel&&!flag_ppt) {
                imgUrl =rarIco_url ;
            }else if(!flag_word && !flag_zip&&flag_pdf&&!flag_excel&&!flag_ppt){
                imgUrl=pdfIco_url;
            }
            else if(!flag_word && !flag_zip&&!flag_pdf&&flag_excel&&!flag_ppt){
                imgUrl=excelIco_url;
            }
            else if(!flag_word && !flag_zip&&!flag_pdf&&!flag_excel&&flag_ppt){
                imgUrl=pptIco_url;
            } else {
                imgUrl = obj[i].url;

            }
        }else{
            imgUrl=obj[i].url;
        }
        imgArr.push(imgUrl);
        var $section = $("<section class='up-section left'>");
        imgContainer.prepend($section);
        $('.uploadImg').on("click", ".close-upimg", function () {
            var max = $(this).parents('.filePhoto').attr('maxImage');
            delParent = $(this).parent();
            var numUp = delParent.siblings().length;
            if (numUp < max + 1) {
                delParent.parent().find(".fileBox").show();
            }
            delParent.remove();
            $inputVal.val('');
        });
        //判断当前页：0 修改页、1 详情页
        if(isDetail==0){
            $("<span class='up-span'>").appendTo($section);
            $("<img class='close-upimg'>").attr("src", "/static/images/img-del.png").appendTo($section);
        }

        $hidden= $("<input type='hidden' name='" + name + "' data-fileName='"+obj[i].name+"' data-fileType='" + obj[i].type +"' value='" + obj[i].url + "'/>");
        if(obj[i].type){
            if (obj[i].type=='0') {
                var $img = $('<img class="up-img zoom-img">').viewer({
                    url: 'src',
                    navbar: false,
                    keyboard: true,
                    title: true
                });
            } else {
                var openUrl=obj[i].url;
                var $img = $('<img class="up-img zoom-img" onclick="down(\'' +  openUrl +  '\');">');
            }
        }else{
            var $img = $('<img class="up-img zoom-img">').viewer({//本地测试请使用这条代码
                url: 'src',
                navbar: false,
                keyboard: true,
                title: true
            });
        }
        $img.attr("src", imgArr[i]).appendTo($section);
        var $p = $("<p class='img-name-p'>");
        $p.html(obj[i].name).appendTo($section);
        $hidden.appendTo($section);
    }
}

//取文件后缀名
function GetFileExt(filepath) {
    if (filepath != "") {
        var pos = filepath.replace(/.+\./, "");
        return pos;
    }
}

//检查文件名
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

function down(url) {
    window.open(url,'_blank');
}