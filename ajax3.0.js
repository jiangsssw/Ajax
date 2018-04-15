/**
* ajax工具函数3.0版
* option是一个对象
 * 属性名是
 * type 请求方法post or get
 * url
 * data 发送的数据
 * callback 执行的回调函数
* */

function ajaxLast(option) {
    //构建异步对象
    var xhr = new XMLHttpRequest();
    // 设置请求行post或get方法
    if(option.url=='get'&&data){
        option.url+='?';
        option.url+=option.data;
        option.data=null;
    }
    xhr.open(option.type,option.url);
    //设置请求头
    if(option.url=='post'){
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    }
    //回调函数
    xhr.onreadystatechange=function () {
        if (xhr.readyState==4&&xhr.status==200){
            //option.callback(xhr.responseText);
            var type = xhr.getResponseHeader('Content-type');
            if(type.indexOf('xml')!=-1){
                option.callback(xhr.responseXML);
            }else if(type.indexOf('json')!=-1){
                option.callback(JSON.parse(xhr.responseText));
            }else {
                option.callback(xhr.responseText);
            }
        }
    }
    //请求主体send方法
    xhr.send(option.data);
}