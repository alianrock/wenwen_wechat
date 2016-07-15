import reqwest from 'reqwest';
import {tipShow} from './tip';
import {API,CODE_MAP,SERVER_ERR_TIP} from '../config';
import {getUser} from './user';
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

//请求路由队列
// export function requestRouteQueen(token,ShipperCode,number){
// 	if(token){
// 		return dispatch =>{
// 			requestRoute(dispatch,token,ShipperCode,number);
// 		}
// 	}else{
// 		return [
// 			dispatch => {
// 				dispatch(getUser());
// 			},
// 			(dispatch,getState) => {
// 				const token = getState().user.token;
// 				if(!token) return;
// 				requestRoute(dispatch,token,ShipperCode,number);
// 			}
// 		]
// 	}
// }

//请求路由信息
export function requestRoute(token,ShipperCode,number){
	return (dispatch) => {
		dispatch(startRequestRoute());
		return reqwest({
			url: API.getRoute,
			type:'json',
			data:{
				token: token,
				direct:'track',
				action:'query',
				ShipperCode:ShipperCode,
				LogisticCode:number
			}
		})
		.then(res => {
			if(CODE_MAP[res.respCode].pass){
				dispatch(receiveRoute(res));
			}else{
				dispatch(getUserFail(res.respCode,CODE_MAP[res.respCode].msg));
				dispatch(tipShow(CODE_MAP[res.respCode].msg));
			}
		})	
		.fail((err, msg) =>{
			dispatch(requestRouteFail(err,msg));
			dispatch(tipShow(SERVER_ERR_TIP));
		});
	}
} 
