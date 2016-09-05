import reqwest from 'reqwest';
import {tipShowAndFade} from './tip';
import {getUser} from './user';
import {API,CODE_MAP,SERVER_ERR_TIP,CLINET} from '../config';


export const START_ADDR_REQUEST = 'START_ADDR_REQUEST';
export const ADDR_REQUEST_FAIL = 'ADDR_REQUEST_FAIL';

//列表
export const RECEIVE_ADDRLIST = 'RECEIVE_ADDRLIST';
//删除地址
export const RECEIVE_DELELTE_RESULT = 'RECEIVE_DELELTE_RESULT';
//编辑地址
export const RECEIVE_EDIT_RESULT ='RECEIVE_EDIT_RESULT';
//获取区域信息
export const RECEIVE_AREA_PROVINCE = 'RECEIVE_AREA_PROVINCE';
export const RECEIVE_AREA_CITY = 'RECEIVE_AREA_CITY';
export const RECEIVE_AREA_DISTRICT = 'RECEIVE_AREA_DISTRICT';
export const RECEIVE_AREA_STREET = 'RECEIVE_AREA_STREET';

export const START_AREA_REQUEST = 'START_AREA_REQUEST';
export const AREA_REQUEST_FAIL  = 'AREA_REQUEST_FAIL';

export const SELECT_AREA = 'SELECT_AREA';
export const CLEAR_AREA = 'CLEAR_AREA';


//开始地址方面的请求
function startRequst(){
	return {
		type: START_ADDR_REQUEST
	}
}

//获取到失败的结果
function getResultFail(err,msg){
	return {
		type: ADDR_REQUEST_FAIL,
		result:{
			err,
			msg
		}
	}
}


//获取地址列表成功
function receiveAddrList(result){
	return {
		type: RECEIVE_ADDRLIST,
		result:result
	}
}


//获取地址列表
export function getAddrList(token){
	if(!token) {
		dispatch(startRequst(SERVER_ERR_TIP));
		return;
	}
	return dispatch =>{
		dispatch(startRequst());
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
				if(res.respCode == '7' || res.respCode == '8' || (res.respCode == '5' && CLINET == 'app')){
					dispatch(getUser(function(token){
                        dispatch(getAddrList(token));
					},true,res.respCode));
					return;
				}
				dispatch(getResultFail(res.respCode,CODE_MAP[res.respCode].msg));
				dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
			}
		})
		.fail((err,msg) => {
			dispatch(getResultFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
	}
}



//获取到删除结果
function receiveDeleteResult(result,id){

	return {
		type: RECEIVE_DELELTE_RESULT,
		addressId:id,
		result
	}
}


//删除地址
export function deleteAddr(token,id,callback){
	if(!token) {
		dispatch(tipShowAndFade(SERVER_ERR_TIP));
		return;
	}
	return dispatch =>{
		dispatch(startRequst());
		return reqwest({
			url:API.delAddr,
			type:'json',
			data:{
				direct:'address',
				action:'delete',
				token:token,
				addressId:id
			}
		}).then(res => {
			if(CODE_MAP[res.respCode].pass){
				dispatch(receiveDeleteResult(res,id));
				dispatch(tipShowAndFade('删除成功'));
				if(callback){
					callback(res);
				}
			}else{
				if(res.respCode == '7' || res.respCode == '8' || (res.respCode == '5' && CLINET == 'app')){
					dispatch(getUser(function(token){
                        dispatch(deleteAddr(token,id,callback));
					},true,res.respCode));
					return;
				}
				dispatch(getResultFail(res.respCode,CODE_MAP[res.respCode].msg));
				dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
			}
		})
		.fail((err,msg) => {
			dispatch(getResultFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
	}
}


//获取到编辑的结果
function receiveEditResult(result,data,type){
	return {
		type: RECEIVE_EDIT_RESULT,
		result,
		data,
		editType:type
	}
}


//编辑地址
export function editAddr(token,data,callback){
	if(!token) {
		dispatch(tipShowAndFade(SERVER_ERR_TIP));
		return;
	}
	return dispatch =>{
		dispatch(startRequst());
		return reqwest({
			url:API.editAddr,
			type:'json',
			data:{
				direct:'address',
				action:'set',
				token:token,
				addressId:data.addressId,
				name:data.name,
				phone:data.phone,
				pcdCode:data.pcdCode,
				pcdName:data.pcdName,
				detailAddress:data.detailAddress,
				isDefault:data.isDefault,
				type:data.type
			}
		}).then(res => {
			if(CODE_MAP[res.respCode].pass){
				const editType = data.addressId?'edit':'add';
				const tip = data.addressId?'编辑成功':'添加成功';
				data.addressId = res.addressId;
				dispatch(receiveEditResult(res,data,editType));
				dispatch(tipShowAndFade(tip));
				if(callback){
					callback(res);
				}
			}else{
				if(res.respCode == '7' || res.respCode == '8' || (res.respCode == '5' && CLINET == 'app')){
					dispatch(getUser(function(token){
                        dispatch(editAddr(token,data,callback));
					},true,res.respCode));
					return;
				}
				dispatch(getResultFail(res.respCode,CODE_MAP[res.respCode].msg));
				dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
			}
		})
		.fail((err,msg) => {
			dispatch(getResultFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
	}
}


//获取到省数据
function receiveAreaProvince(result){
	return {
		type:RECEIVE_AREA_PROVINCE,
		result:result
	}
}

//获取到城市数据
function receiveAreaCity(result){
	return {
		type:RECEIVE_AREA_CITY,
		result:result
	}
}

//获取到区数据
function receiveAreaDistrict(result){
	return {
		type:RECEIVE_AREA_DISTRICT,
		result:result
	}
}

//获取到街道数据
function receiveAreaStreet(result){
	return {
		type:RECEIVE_AREA_STREET,
		result:result
	}
}

//开始区域信息方面的请求（和原来的startaddrrequest独立开来，因为控制不同的loading组件）
function startAreaRequst(){
	return {
		type: START_AREA_REQUEST
	}
}

//获取区域信息失败
function areaRequstFail(err,msg){
	return {
		type: AREA_REQUEST_FAIL,
		result:{
			err,
			msg
		}
	}
}

//获取省市区
export function getArea(token,areaCode,type){
	if(!token) {
		dispatch(tipShowAndFade(SERVER_ERR_TIP));
		return;
	}
	return dispatch =>{
		dispatch(startAreaRequst());
		return reqwest({
			url:API.getArea,
			type:'json',
			data:{
				direct:'address',
				action:'area',
				token:token,
				areaCode:areaCode
			}
		}).then(res => {
			if(CODE_MAP[res.respCode].pass){
				if(type == 'province'){
					dispatch(receiveAreaProvince(res));
				}else if(type == 'city'){
					dispatch(receiveAreaCity(res));
				}else if(type == 'district'){
					dispatch(receiveAreaDistrict(res));
				}else if(type == 'street'){
					dispatch(receiveAreaStreet(res));
				}
			}else{
				if(res.respCode == '7' || res.respCode == '8'|| (res.respCode == '5' && CLINET == 'app')){
					dispatch(getUser(function(token){
                        dispatch(getArea(token,areaCode,type));
					}, true, res.respCode));
					return;
				}
				dispatch(areaRequstFail(res.respCode,CODE_MAP[res.respCode].msg));
				dispatch(tipShowAndFade(CODE_MAP[res.respCode].msg));
			}
		})
		.fail((err,msg) => {
			dispatch(areaRequstFail(err,msg));
			dispatch(tipShowAndFade(SERVER_ERR_TIP));
		});
	}
}

//选择区域
export function selectArea(code,type){
	return {
		type:SELECT_AREA,
		code,
		areaType:type
	}
}

//清除区域信息
export function clearArea(){
	return {
		type:CLEAR_AREA
	}
}



