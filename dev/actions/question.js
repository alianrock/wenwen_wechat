import reqwest from 'reqwest';
import {API,CODE_MAP,SERVER_ERR_TIP} from '../config';
import {tipShowAndFade} from './tip';


export const START_GET_QS = 'START_GET_QS';
export const GET_QSLIST_FAIL = 'GET_QSLIST_FAIL';
export const RECEIVE_QSLIST = 'RECEIVE_QSLIST';
export const GET_QS_FAIL = 'GET_QS_FAIL';
export const RECEIVE_QS = 'RECEIVE_QS';

/* 开始获取列表 */
export function startGetQs(){
    return {
        type: START_GET_QS
    }
}

/* 获取列表成功 */
export function receiveQsList(result){
    return {
        type: RECEIVE_QSLIST,
        result:result
    }
}

/* 获取列表失败 */
export function getQsListFail(result){
    return {
        type: GET_QSLIST_FAIL,
        result: result
    }
}


/* 获取列表 */
export function getQsList(cb){
    
    return dispatch => {
        dispatch(startGetQs());
        return  reqwest({
			url:API.getQsList,
			type:'json',
		})
		.then(res => {
			if(CODE_MAP[res.code].pass){
				dispatch(receiveQsList(res.list));
				if(cb) cb();
			}else{
				dispatch(getQsListFail(res.respCode,CODE_MAP[res.respCode].msg));
				dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
			}
		})	
		.fail((err, msg) =>{
			dispatch(getQsListFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
    }
}

/* 获取问题内容成功 */
export function receiveQs(result){
    return {
        type: RECEIVE_QS,
        result:result
    }
}

/* 获取问题内容失败 */
export function getQsFail(result){
    return {
        type: GET_QS_FAIL,
        result: result
    }
}


/* 获取问题详情 */
export  function getQs(cb){
    return dispatch => {
        dispatch(startGetQs());
        return  reqwest({
			url:API.getQs,
			type:'json',
		})
		.then(res => {
			if(CODE_MAP[res.code].pass){
				dispatch(receiveQs({title:res.title, con:res.con}));
				if(cb) cb();
			}else{
				dispatch(getQsFail(res.respCode,CODE_MAP[res.respCode].msg));
				dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
			}
		})	
		.fail((err, msg) =>{
			dispatch(getQsFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
    }
}

