import reqwest from 'reqwest';
import {API,CODE_MAP,SERVER_ERR_TIP} from '../config';
import {getQueryString,setUserCookie,getUserCookie} from '../utils';
import {tipShow} from './tip';

export const START_GET_USER = 'START_GET_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const GET_USER_FAIL = 'GET_USER_FAIL';
export const USER_NO_BIND = 'USER_NO_BIND';

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
	const userToken = getUserCookie().userToken;
	const userTel = getUserCookie().userTel;
	//判断本地是否有缓存
	if(userToken && userTel){
		dispatch(receiveUser({token:userToken,phone:userTel}));
		if(callback){
			callback(userToken,userTel);
		}
		return true;
	}else if(userToken){
		dispatch(receiveUser({token:userToken}));
		if(callback){
			callback(userToken,userTel);
		}
		return true;
	}
	return false; 
}


//获取user
export function getUser(callback){
	return (dispatch) => {
		dispatch(startGetUser());
		const code = getQueryString('code');

		//找不到code参数
		if(!code) {
			dispatch(getUserFail('code_err','code_err'));
			dispatch(tipShow(SERVER_ERR_TIP));
				return;
		}

		//从cookie获取user
		if(getUserFromLocal(dispatch,callback)){
			
			return;
		}

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
				setUserCookie(res.token,res.phone);
				dispatch(receiveUser(res));
				if(callback){
					callback(res.token,res.phone);
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
