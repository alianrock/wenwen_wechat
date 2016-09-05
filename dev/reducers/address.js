import {combineReducers} from 'redux';
import {
	START_ADDR_REQUEST,ADDR_REQUEST_FAIL,
	RECEIVE_ADDRLIST,
	RECEIVE_DELELTE_RESULT,
	RECEIVE_EDIT_RESULT,
	RECEIVE_AREA_PROVINCE,
	RECEIVE_AREA_CITY,
	RECEIVE_AREA_DISTRICT,
	RECEIVE_AREA_STREET,
	START_AREA_REQUEST,
	AREA_REQUEST_FAIL,
	SELECT_AREA,
	CLEAR_AREA
} from '../actions/address';

export function address(state = {
	isRequesting: false,
	list:null,
	err:null,
	areaProvince:[],
	areaCity:[],
	areaDistrict:[],
	areaStreet:[],
	areaIsRequesting:false,
	// showAreaSelect:false
},action){
	switch(action.type){
		case START_ADDR_REQUEST:
			return Object.assign({},state, {
				isRequesting: true
			});
		case ADDR_REQUEST_FAIL:
			return Object.assign({}, state, {
				isRequesting: false,
				err: action.result
			});
		case RECEIVE_ADDRLIST:
			return Object.assign({}, state, {
				isRequesting: false,
				list:action.result.dataList
			});
		case RECEIVE_DELELTE_RESULT:
			return Object.assign({}, state, {
				isRequesting: false,
				list:state.list.filter((item)=>item.addressId != action.addressId)
			});
		case RECEIVE_EDIT_RESULT:
			return Object.assign({}, state, {
				isRequesting: false,
				list:updateList(state.list,action.editType,action.data)
			});
		case RECEIVE_AREA_PROVINCE:
			return Object.assign({}, state, {
				areaIsRequesting: false,
				areaProvince:action.result.dataList
			});
		case RECEIVE_AREA_CITY:
			return Object.assign({}, state, {
				areaIsRequesting: false,
				areaCity:action.result.dataList
			});
		case RECEIVE_AREA_DISTRICT:
			return Object.assign({}, state, {
				areaIsRequesting: false,
				areaDistrict:action.result.dataList
			});
		case RECEIVE_AREA_STREET:
			return Object.assign({}, state, {
				areaIsRequesting: false,
				areaStreet:action.result.dataList
			});
		case START_AREA_REQUEST:
			return Object.assign({},state,{
				areaIsRequesting:true
			});
		case AREA_REQUEST_FAIL:
			return Object.assign({},state,{
				areaIsRequesting:false,
				err: action.result
			});
		case SELECT_AREA:
			return updateArea(state,action);
		case CLEAR_AREA:
			return Object.assign({},state,{
				areaProvince:state['areaProvince'].map((item)=>{
					return Object.assign({},item,{
						select:false
					})
				}),
				areaCity:[],
				areaDistrict:[],
				areaStreet:[]
			});
		default: 
			return state;
	}
}

function updateArea(state,action){
	const key = 'area' + action.areaType.replace(/(\w)/,function(v){return v.toUpperCase()});
	return Object.assign({}, state, {
		[key] : state[key].map((item)=>{
			if(item.code == action.code){
				return Object.assign({},item,{
					select:true
				})
			}else{
				return Object.assign({},item,{
					select:false
				})
			}
		})
	});
}


function updateList(list,editType,newData){
	if(editType == 'edit'){
		return list.map((item)=>{
			if(item.addressId == newData.addressId){
				return Object.assign({},item,newData);
			}else{
				return (newData.isDefault == '1' && newData.type == item.type)?Object.assign({},item,{isDefault:'0'}):item;
			}
		});
	}else{
		let newList;
		if(newData.isDefault == '1'){
			newList = list.map((item)=>{
				return (newData.type == item.type)?Object.assign({},item,{isDefault:0}):item;
			});
		}

		return [...(newList||list),newData];
	}
}



