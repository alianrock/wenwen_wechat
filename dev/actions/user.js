import reqwest from 'reqwest';
import {API,CODE_MAP,SERVER_ERR_TIP,COOKIE_NAME_TOKEN,USER_AGENT,CLINET} from '../config';
import {getQueryString,setTokenCookie,getTokenCookie,setCookie} from '../utils';
import {tipShow} from './tip';

export const START_GET_USER = 'START_GET_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const GET_USER_FAIL = 'GET_USER_FAIL';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';

//开始获取token
function startGetUser(){
	return {
		type: START_GET_USER
	}
}
//获取user失败
function getUserFail(err,msg){
	return {
		type: GET_USER_FAIL,
		result:{
			err,
			msg
		}
	}
}
//获取到user
export function receiveUser(result){
	
	return {
		type: RECEIVE_USER,
		result:result
	}
}

//从本地获取user
function getUserFromLocal(dispatch,callback){
	const userToken = getTokenCookie();
	//判断本地是否有缓存
	if(userToken){
		dispatch(receiveUser({token:userToken}));
		if(callback){
			callback(userToken);
		}
		return true;
	}
	return false; 
}


//获取user
export function getUser(callback,refresh,respCode){
	return (dispatch) => {
		//从cookie获取user
		if(!CLINET == 'app' && !refresh && getUserFromLocal(dispatch,callback)) return;

        if(CLINET == 'app'){
        	//等待获取token
        	dispatch(startGetUser());

        	//android获取token
        	if(refresh && USER_AGENT == 'android'){
        		window.jeepei.GET_APP_TOKEN(respCode);
        	}else if(refresh){
        		window.GET_APP_TOKEN(window.location.href,respCode);
        	}
        	
        	if(!refresh){
	            window.SENG_APP_TOKEN = function(token){
	                getUserFromApp(token,dispatch,callback);
	            }
            }
        }else{
            //从本地获取user
        	if(getUserFromLocal(dispatch,callback)) return;
            //从服务器获取user
		    dispatch(getUserFromRemote(callback));
        }
	}
}

export function getUserFromRemote(callback){
	return (dispatch) => {
		const code = getQueryString('code');

		//找不到code参数
		if(!code) {
			dispatch(getUserFail('code_err','code_err'));
			dispatch(tipShow(SERVER_ERR_TIP));
				return;
		}

		dispatch(startGetUser());

		return reqwest({
				url: API.getUser,
				type:'json',
				data:{
					direct:'user',
					action:'getToken',
					code: code
				}
			}).then((res) => {
				if(CODE_MAP[res.respCode].pass){
					setTokenCookie(res.token);
					dispatch(receiveUser(res));
					if(callback){
						callback(res.token);
					}
				}else{
					dispatch(getUserFail(res.respCode,CODE_MAP[res.respCode].msg));
					dispatch(tipShow(CODE_MAP[res.respCode].msg));
				}
			}).fail((err,msg) =>{
				dispatch(getUserFail(err,msg));
				dispatch(tipShow(SERVER_ERR_TIP));
			});
	}
}

//从客户端获取用户token
function getUserFromApp(token,dispatch,callback){
    setTokenCookie(token);
	dispatch(receiveUser({token:token}));
	if(callback){
		callback(token);
	}
}

export function clearToken(){
	//清除cookie
	setCookie(COOKIE_NAME_TOKEN,'',-100000000);
	return {
		type:'CLEAR_TOKEN'
	}
}

