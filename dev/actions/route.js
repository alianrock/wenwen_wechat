import reqwest from 'reqwest';
import {tipShowAndFade} from './tip';
export const START_REQUEST_ROUTE = 'START_REQUEST_ROUTE'; 
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const REQUEST_ROUTE_FAIL = 'REQUEST_ROUTE_FAIL';


//开始获取路由信息
export function startRequestRoute(){
	return {
		type: START_REQUEST_ROUTE
	}
}

//收到路由信息
export function receiveRoute(result){
	return {
		type: RECEIVE_ROUTE,
		result: result
	}
} 

//路由信息失败
export function requestRouteFail(err, msg){
	return {
		type: REQUEST_ROUTE_FAIL,
		result:{
			err: err,
			msg: msg
		}
	}

}

//请求路由信息
export function requestRoute(number){
	return dispatch => {
		dispatch(startRequestRoute());
		return reqwest({
			url:'/mock/routeinquire',
			type:'json'
		})
		.then(res => dispatch(receiveRoute(res))
		)	
		.fail((err, msg) =>{
			dispatch(requestRouteFail(err,msg));
			dispatch(tipShowAndFade('服务器开小差了哦，请稍后再试！'));
		});
	}
} 
