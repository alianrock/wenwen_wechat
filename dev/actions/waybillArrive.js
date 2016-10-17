import reqwest from 'reqwest';
import {tipShowAndFade} from './tip';
import {getUser,loginCharge} from './user';
import {API,CODE_MAP,SERVER_ERR_TIP,CLINET} from '../config';

//获取列表
export const START_GET_LIST = 'START_REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const GET_LIST_FAIL = 'GET_LIST_FAIL';
//弹层action
export const SHOW_COVER = 'SHOW_COVER';
export const HIDE_COVER = 'HIDE_COVER';
//改变配送方式
export const START_CHANGE_DILIVER_WAY = 'START_CHANGE_DILIVER_WAY';
export const RECEIVE_CHANGE_DILIVER_WAT = 'RECEIVE_CHANGE_DILIVER_WAT';
export const CHANGE_DILIVER_WAT_FAIL = 'CHANGE_DILIVER_WAT_FAIL';
//获取log列表
export const START_GET_LOG = 'START_GET_LOG';
export const RECEIVE_LOG = 'RECEIVE_LOG';
export const GET_LOG_FAIL = 'GET_LOG_FAIL';
//筛选列表
export const FILTER_LIST = 'FILTER_LIST';
//获取地址列表
export const START_GET_ADDRLIST = 'START_GET_ADDRLIST';
export const GET_ADDRLIST_FAIL = 'GET_ADDRLIST_FAIL';
export const RECEIVE_ADDRLIST = 'RECEIVE_ADDRLIST';


//开始获取列表
function startRequestList(){
	return {
		type: START_GET_LIST
	}
}

//获取到列表
function receiveList(result){
	return {
		type: RECEIVE_LIST,
		result: result
	}
}

//获取列表失败
function getListFail(err,msg){
	return {
		type: GET_LIST_FAIL,
		result: {
			err:err,
			msg:msg
		}
	}
}
 // var hasTry = false;
//请求列表
export function getList(token,type,complete){
	
	return (dispatch) => {
		if(!token) {
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
			return;
		}
		dispatch(startRequestList());
		return reqwest({
			url:API.getArriveList,
			type:'json',
			data:{
				direct:type,
				action:'list',
				token:token,
				isCompleted:complete
			}
		}).then(res => {
			// if(!hasTry){
			// 	res.respCode = '5';
			// 	hasTry = true;
			// }
			if(CODE_MAP[res.respCode].pass){
				dispatch(receiveList(res));
			}else{
				if(loginCharge(dispatch, res.respCode, (token) => dispatch(getList(token,type,complete)))){
					dispatch(getListFail(res.respCode,CODE_MAP[res.respCode].msg));
				}else{
					dispatch(getListFail(res.respCode,CODE_MAP[res.respCode].msg));
					dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
				}
			}
		})
		.fail((err,msg) => {
			dispatch(getListFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
	}
}

//显示服务选择弹窗
export function showCover(data){
	return {
		type: SHOW_COVER,
		data: data
	}
}
//隐藏服务选择弹窗
export function hideCover(){
	return {
		type: HIDE_COVER
	}
}

//开始请求改变配送方式
function startChangeDiliverWay(){
	return {
		type: START_CHANGE_DILIVER_WAY
	}
}

//改变配送方式失败
// @coverShow 是否显示或者隐藏cover
function changeDiliverWayFail(err,msg,coverShow){
	console.log('coverShow',coverShow);
	return {
		type: CHANGE_DILIVER_WAT_FAIL,
		coverShow: coverShow != undefined ? coverShow : null,
		result: {
			err,
			msg
		}
	}
}

//获取到改变配送方式的结果
function receiveChangeDiliverWay(data){
	return {
		type: RECEIVE_CHANGE_DILIVER_WAT,
		data:data
	}
}

//选择配送方式
export function changeDiliverWay(token,data,callback){
	
	return (dispatch) => {
		if(!token) {
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
			return;
		}
		dispatch(startChangeDiliverWay());
		
		return reqwest({
			url:API.changeWay,
			type:'json',
			data:{
				direct:'ex2u',
				action:'appoint',
				token:token,
				dataId:data.dataId,
				dispatchingWay:data.dispatchingWay,
				name:data.name || null,
				phone:data.phone || null,
				address: data.address || null,
				appointTime: data.appointTime || null,
				remark:data.remark || null
			}
		}).then(res =>{
			if(CODE_MAP[res.respCode].pass){
				dispatch(receiveChangeDiliverWay(data));
				dispatch(hideCover());
				dispatch(tipShowAndFade('修改成功'));
			}else{
				if(loginCharge(dispatch, res.respCode, (token) => 
					dispatch(changeDiliverWay(token,data,callback))
				)){
					dispatch(changeDiliverWayFail(res.respCode, CODE_MAP[res.respCode].msg, false));
				}else{
					dispatch(changeDiliverWayFail(res.respCode,CODE_MAP[res.respCode].msg));
					dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
				}
			}
		})
		.fail((err,msg) => {
			dispatch(changeDiliverWayFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
	}
}

function startGetLog(){
	return {
		type: START_GET_LOG
	}
}
function getLogFail(err,msg){
	return {
		type: GET_LOG_FAIL
	}
}
function receiveLog(result,dataId){
	return {
		type: RECEIVE_LOG,
		result: result,
		dataId: dataId
	}
}
export function getLog(token,id){
	
	return (dispatch) => {
		if(!token) {
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
			return;
		}
		dispatch(startGetLog);
		return reqwest({
			url:API.getLog,
			type:'json',
			data:{
				direct:'ex2u',
				action:'logs',
				token:token,
				dataId:id
			}
		}).then(res => {
			if(CODE_MAP[res.respCode].pass){
				dispatch(receiveLog(res,id));
			}else{
				if(loginCharge(dispatch, res.respCode, (token) => 
					dispatch(getLog(token,id))
				)){
					dispatch(getLogFail(res.respCode,CODE_MAP[res.respCode].msg));
				}else{
					dispatch(getLogFail(res.respCode,CODE_MAP[res.respCode].msg));
					dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
				}
			}
		})
		.fail((err,msg) => {
			dispatch(getLogFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
	}
}


//筛选列表
export function filterList(value){
	return {
		type: FILTER_LIST,
		value: value
	}
}

//开始获取地址列表
function startGetAddrList(){
	return {
		type: START_GET_ADDRLIST
	}
}

//获取地址列表成功
function receiveAddrList(result){
	return {
		type: RECEIVE_ADDRLIST,
		result:result
	}
}

//获取地址列表失败
function receiveAddrFail(err,msg){
	return {
		type: GET_ADDRLIST_FAIL,
		result:{
			err,
			msg
		}
	}
}


//获取地址列表
export function getAddrList(token){
	
	return dispatch =>{
		if(!token) {
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
			return;
		}
		dispatch(startGetAddrList());
		return reqwest({
			url:API.getAddrList,
			type:'json',
			data:{
				direct:'address',
				action:'list',
				token:token
			}
		}).then(res => {
			if(CODE_MAP[res.respCode].pass){
				dispatch(receiveAddrList(res));
			}else{
				if(loginCharge(dispatch, res.respCode, (token) => 
					 dispatch(getAddrList(token))
				)){
					dispatch(receiveAddrFail(res.respCode,CODE_MAP[res.respCode].msg));
				}else{
					dispatch(receiveAddrFail(res.respCode,CODE_MAP[res.respCode].msg));
					dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
				}
			}
		})
		.fail((err,msg) => {
			dispatch(receiveAddrFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
	}
}

