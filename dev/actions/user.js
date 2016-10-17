import reqwest from 'reqwest';
import {API,CODE_MAP,SERVER_ERR_TIP,COOKIE_NAME_TOKEN,USER_AGENT,CLINET} from '../config';
import {getQueryString,setTokenCookie,getTokenCookie,setCookie} from '../utils';
import {tipShow} from './tip';
import { hashHistory } from 'react-router'


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
export function receiveUser(result,fromRemote){
	return {
		type: RECEIVE_USER,
		result:result,
		fromRemote:fromRemote || false
	}
}



/* 
* 获取user 
* @callback 回调函数
* @needBind 是否需要进行调整绑定界面处理
* @refresh 是否需要强制刷新
* @respCode 返回的code参数
*/
export function getUser(callback,needBind,refresh,respCode){

	return (dispatch,getState) => {

		//从cookie获取user
		// if(!CLINET == 'app' && !refresh && getUserFromLocal(dispatch,callback)) return;
		//有token，直接执行callback
		let token = getState().user.token;
		if(!refresh && token){
			if(callback) callback(token);
			return;
		}
		if(CLINET == 'app'){
			dispatch(getUserFromApp(callback,refresh,respCode));
		} else {

			//从本地获取user
			if(!refresh && getUserFromLocal(dispatch,callback)) return;
			//从服务器获取user

			dispatch(getUserFromRemote(function(token){
				//如果这个界面需要token，则在获取不到token后跳转到绑定界面
				if(needBind && !token){
					userBind();
				}else{
					if(callback) callback(token);
				}
			}));
		}
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


export function getUserFromRemote(callback){
	return (dispatch,getState) => {
		const code = getQueryString('code');

		//找不到code参数
		if(!code) {
			dispatch(getUserFail('code_err','code_err'));
			dispatch(tipShow(SERVER_ERR_TIP));
				return;
		}


		//已经获取过一次token，不能再次获取
		if(getState().user.hasGetTokenFromRemote){
			if(callback) callback(null);
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
					dispatch(receiveUser(res,true));
					if(callback) callback(res.token);
				}else{

					//用户未绑定
					if(CODE_MAP[res.respCode].action == 'bind'){
						if(callback) callback(null);
						dispatch(getUserFail(res.respCode, CODE_MAP[res.respCode].msg));
					//其他服务器错误
					}else{
						dispatch(getUserFail(res.respCode, CODE_MAP[res.respCode].msg));
						dispatch(tipShow(CODE_MAP[res.respCode].msg));
					}
				}
			}).fail((err,msg) =>{
				dispatch(getUserFail(err,msg));
				dispatch(tipShow(SERVER_ERR_TIP));
			});
	}
}

/* 从客户端获取用户token */
function getUserFromApp(callback,refresh,respCode){
	return (dispatch) => {
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
	            setTokenCookie(token);
				dispatch(receiveUser({token:token}));
				if(callback){
					callback(token);
				}
	        }
	    }
	}
    
}

/* 用户未绑定，跳转到绑定界面 */
export function userBind(){
	hashHistory.push('/bind/back');
}

/* 登陆判断处理 */
export function loginCharge(dispatch,code,callback){

	if(CODE_MAP[code].action === 'reGetUser' || CODE_MAP[code].action === 'bind'){
		dispatch(clearToken());
		dispatch(getUser(function(token){
            if(callback) callback(token);
		}, true, true, code));
		return true;
	}else{
		return false;
	}
	
}

/* 清除token cookie */
export function clearToken(){
	//清除cookie
	setCookie(COOKIE_NAME_TOKEN,'',-100000000);
	return {
		type:'CLEAR_TOKEN'
	}
}
