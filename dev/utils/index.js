import {COOKIETIME,COOKIE_NAME_TOKEN,COOKIE_NAME_TEL} from '../config';
//获取cookie
export function getCookie(name){
 	var cookies = document.cookie.split(";");
    for(var t = 0; t < cookies.length; t++) {
        var n = cookies[t].split("=");
        if (-1 != n[0].indexOf(name))
            return n[1]
    }
    return !1
}

//设置cookie
export function setCookie(name,value,time){
     	var data = new Date();
        data.setTime(data.getTime() + time);
        document.cookie = name + "=" + value + ";expires =" + data.toGMTString();
}

//获取url参数
export function getQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//设置用户cookie
export function setTokenCookie(token){
    setCookie(COOKIE_NAME_TOKEN,token,COOKIETIME);
}
//获取用户信息
export function getTokenCookie(){
    return getCookie(COOKIE_NAME_TOKEN)
    
}

//获取时间
export function getTime(time){
    let date = new Date(time),
        year = date.getFullYear(),
        month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth() + 1,
        day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    return  ''+year+'-'+month+'-'+day+ ' ' + hour+':'+minutes+':'+seconds;
}

//错误判断
export function errorCodeJudge(){
    
}
