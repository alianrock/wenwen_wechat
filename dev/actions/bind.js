import reqwest from 'reqwest';
import {tipShowAndFade} from './tip';
import {API,CODE_MAP,SERVER_ERR_TIP,COOKIE_NAME_TOKEN} from '../config';
import {getQueryString,getUserCookie,setUserCookie} from '../utils';
import {receiveUser} from './user';
//获取验证码acitons
export const START_GET_CODE = 'START_GET_CODE';
export const RECEIVE_CODE = 'RECEIVE_CODE';
export const GET_CODE_FAIL = 'GET_CODE_FAIL';
//绑定actions
export const START_BIND = 'START_BIND';
export const RECEIVE_BIND_RESULT = 'RECEIVE_BIND_RESULT';
export const BIND_FAIL = 'BIND_FAIL';

//开始获取验证码
export function startGetCode(){
	return {
		type: START_GET_CODE
	}
}
//获取到验证码
export function receiveCode(result){
	return {
		type: RECEIVE_CODE,
		result: result
	}
}


//获取验证码失败
export function getCodeFail(err, msg){
	return {
		type: GET_CODE_FAIL,
		result:{
			err: err,
			msg: msg
		}
	}

}

//请求验证码
export function getCode(tel){
	return dispatch => {
		dispatch(startGetCode());
		return reqwest({
			url:API.getCode,
			type:'json',
			data:{
				direct:'user',
				action:'verificationCode',
				phone:tel,
				type:'r'
			}
		})
		.then(res => {
			if(CODE_MAP[res.respCode].pass){
				dispatch(receiveCode(res));
			}else{
				dispatch(getCodeFail(res.respCode,CODE_MAP[res.respCode].msg));
				dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
			}
		})	
		.fail((err, msg) =>{
			dispatch(getCodeFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
	}
} 


//开始绑定
export function startBind(){
	return {
		type: START_BIND
	}

}
//获取到绑定结果
export function receiveBineResult(result){
	return {
		type: RECEIVE_BIND_RESULT,
		result: result
	}
}


//绑定失败
export function bindFail(err, msg){
	return {
		type: BIND_FAIL,
		result:{
			err: err,
			msg: msg
		}
	}

}


//绑定
export function bind(code,tel,callback){
	return dispatch => {
		const wxcode = getQueryString('code');

		//找不到code参数
		if(!code) {
			dispatch(getUserFail('code_err','code_err'));
			dispatch(tipShow(SERVER_ERR_TIP));
				return;
		}

		dispatch(startBind());
		return reqwest({
			url:'/mock/bine',
			type:'json',
			data:{
				direct:'user',
				action:'bindingTel',
				code:wxcode,
				phone:tel,
				verificationCode:code
			}
		})
		.then(res => {
			if(CODE_MAP[res.respCode].pass){
				dispatch(receiveBineResult(res));
				setUserCookie(res.token,res.phone);
				dispatch(receiveUser({token:res.token,phone:res.phone}));
				dispatch(tipShowAndFade('绑定成功！'));
				if(callback){
					callback();
				}
			}else{
				dispatch(bindFail(res.respCode,CODE_MAP[res.respCode].msg));
				dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
			}
		})	
		.fail((err, msg) =>{
			dispatch(bindFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
	}
} 