import reqwest from 'reqwest';
import {tipShowAndFade} from './tip';
import {API,CODE_MAP,SERVER_ERR_TIP} from '../config';

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

//请求列表
export function getList(token){
	return (dispatch) => {
		dispatch(startRequestList());
		return reqwest({
			url:API.getArriveList,
			type:'json',
			data:{
				direct:'ex2u',
				action:'list',
				token:token,
				isCompleted:0
			}
		}).then(res => {
			if(CODE_MAP[res.respCode].pass){
				dispatch(receiveList(res));
			}else{
				dispatch(getListFail(res.respCode,CODE_MAP[res.respCode].msg));
				dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
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
function changeDiliverWayFail(err,msg){
	return {
		type: CHANGE_DILIVER_WAT_FAIL,
		result: {
			err,
			msg
		}
	}
}

//获取到改变配送方式的结果
function receiveChangeDiliverWay(result){
	return {
		type: RECEIVE_CHANGE_DILIVER_WAT,
		result:result
	}
}

//选择配送方式
export function changeDiliverWay(){
	return (dispatch) => {
		dispatch(startChangeDiliverWay());
		return reqwest({
			url:'/mock/changeDiliverWay',
			type:'json'
		}).then(res => dispatch(receiveChangeDiliverWay(res)))
		.fail((err,msg) => {
			dispatch(changeDiliverWayFail(err,msg));
			dispatch(tipShowAndFade('服务器开小差了，请稍后再试哦！'));
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
function receiveLog(result){
	return {
		type: RECEIVE_LOG,
		result: result
	}
}
export function getLog(token,tel){
	return (dispatch) => {
		dispatch(startGetLog);
		return reqwest({
			url:'/mock/getLog',
			type:'json'
		}).then(res => dispatch(receiveLog(res)))
		.fail((err,msg) => {
			dispatch(getLogFail(err,msg));
			dispatch(tipShowAndFade('服务器开小差了，请稍后再试哦！'));
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