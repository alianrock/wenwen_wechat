import {
	START_GET_LIST,RECEIVE_LIST,GET_LIST_FAIL,FILTER_LIST,
	SHOW_COVER,HIDE_COVER,
	START_CHANGE_DILIVER_WAY,RECEIVE_CHANGE_DILIVER_WAT,CHANGE_DILIVER_WAT_FAIL,
	START_GET_LOG,RECEIVE_LOG,GET_LOG_FAIL,
	START_GET_ADDRLIST,GET_ADDRLIST_FAIL,RECEIVE_ADDRLIST
} from '../actions/waybillArrive';

export function waybillArrive(state = {
	isRequesting:false,
	list:null,
	cover:{
		isShow:false,
		data:{},
		addrList:[]
	},
	err:{}
}, action){
	switch(action.type){
		case START_GET_LIST:
		case GET_LIST_FAIL:
		case RECEIVE_LIST: 
		case FILTER_LIST:
			return waybillList(state,action);
		case SHOW_COVER:
		case HIDE_COVER:
		case CHANGE_DILIVER_WAT_FAIL:
		case RECEIVE_CHANGE_DILIVER_WAT:
		case START_CHANGE_DILIVER_WAY:
			return cover(state,action);
		case START_GET_LOG:
		case GET_LIST_FAIL:
		case RECEIVE_LOG:
			return item(state,action);
		case START_GET_ADDRLIST:
		case GET_ADDRLIST_FAIL:
		case RECEIVE_ADDRLIST:
			return addrList(state,action);
		default:
			return state;
	}
}

//item处理
function item(state,action){
	switch(action.type){
		case START_GET_LOG:
			return Object.assign({},state, {
				list: state.list.map(
					(item) => item.id == action.item.id ? Object.assign({},item,{isRequestLog:true}):item
				)
			});
		case GET_LOG_FAIL:
			return Object.assign({},state, {
				list: state.list.map(
					(item) => item.id == action.item.id ? Object.assign({},item,{isRequestLog:false,err: action.result}):item
				)
			});
		case RECEIVE_LOG:
			return Object.assign({},state, {
				list: state.list.map(
					(item) => item.dataId == action.dataId ? Object.assign({},item,{isRequestLog:false,log: action.result.dataList}):item
				)
			});
		default:
			return state;
	}
}

//弹层的处理
function cover(state,action){
	switch(action.type){
		case SHOW_COVER:
			return Object.assign({},state,{
				cover: Object.assign({},state.cover,{
					isShow: true,
					data: action.data
				})
			});
		case HIDE_COVER:
			return Object.assign({},state,{
				cover: Object.assign({},state.cover,{isShow:false})
			});
		case START_CHANGE_DILIVER_WAY:
			return Object.assign({},state,{
				isRequesting: true
			});
		case CHANGE_DILIVER_WAT_FAIL: 
			return Object.assign({},state,{
				isRequesting: false,
				err:action.result
			});
		case RECEIVE_CHANGE_DILIVER_WAT: 
			return Object.assign({},state,{
				isRequesting: false,
				list: state.list.map( item => 
					item.dataId == action.data.dataId ? Object.assign({},item,{dispatchingWay:action.data.dispatchingWay,log:null}):item
				)
			});
		default:
			return state;
	}
}


//弹层中addrlist的处理
function addrList(state,action){
	switch(action.type){
		case START_GET_ADDRLIST:
			return Object.assign({},state,{
				isRequesting: true
			});
		case GET_ADDRLIST_FAIL:
			return Object.assign({},state,{
				isRequesting: false,
				err:action.result
			});
		case RECEIVE_ADDRLIST:
			return Object.assign({},state,{
				isRequesting: false,
				cover:Object.assign({},state.cover,{
					addrList:action.result.dataList.filter(item => item.type === '0')
				})
			});
		default:
			return state;
	}
}

//列表的处理
function waybillList(state,action){
	switch(action.type){
		case START_GET_LIST:
			return Object.assign({},state,{
				isRequesting: true
			});
		case GET_LIST_FAIL:
			return Object.assign({},state,{
				isRequesting: false,
				err:action.result
			});
		case RECEIVE_LIST: 
			return Object.assign({},
				state,{
					isRequesting: false,
					list:action.result.dataList
				})
		case FILTER_LIST:
			return Object.assign({},
				state,{
					list: state.list.map((item) =>
						(action.value == '' || item.waybillNo.indexOf(action.value) != -1) ? Object.assign({},item, {hide:false}) : Object.assign({},item, {hide:true}) 
					)	
				})
		default:
			return state;

	}
}
