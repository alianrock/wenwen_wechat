import reqwest from 'reqwest';
import {tipShowAndFade} from './tip';

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
			url:'/mock/binecode',
			type:'json'
		})
		.then(res => dispatch(receiveCode(res))
		)	
		.fail((err, msg) =>{
			dispatch(getCodeFail(err,msg));
			dispatch(tipShowAndFade('服务器开小差了哦，请稍后再试！'));
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
export function bind(code){
	return dispatch => {
		dispatch(startBind());
		return reqwest({
			url:'/mock/bine',
			type:'json'
		})
		.then(res => dispatch(receiveBineResult(res))
		)	
		.fail((err, msg) =>{
			dispatch(bindFail(err,msg));
			dispatch(tipShowAndFade('服务器开小差了哦，请稍后再试！'));
		});
	}
} 