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
export function setUserCookie(token,phone){
    setCookie(COOKIE_NAME_TOKEN,token,COOKIETIME);
    setCookie(COOKIE_NAME_TEL,phone,COOKIETIME);
}
//获取用户信息
export function getUserCookie(){
    return {
        userToken : getCookie(COOKIE_NAME_TOKEN),
        userTel:getCookie(COOKIE_NAME_TEL)
    }
}
