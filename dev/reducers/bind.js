import {combineReducers} from 'redux';
import {
	START_GET_CODE, RECEIVE_CODE,GET_CODE_FAIL,
	START_BIND,RECEIVE_BIND_RESULT,BIND_FAIL
} from '../actions/bind';

function bindCode(state = {
	isRequesting: false,
	result:null
},action){
	switch(action.type){
		case START_GET_CODE:
			return Object.assign({},state, {
				isRequesting: true
			});
		case GET_CODE_FAIL:
			return Object.assign({}, state, {
				isRequesting: false,
				result: 
					action.result
			});
		case RECEIVE_CODE:
			return Object.assign({}, state, {
				isRequesting: false,
				result: 
					action.result
			});
		default: 
			return state;
	}
}

function bindTel(state = {
	isRequesting: false,
	result:null
},action){
	switch(action.type){
		case START_BIND:
			return Object.assign({},state, {
				isRequesting: true
			});
		case BIND_FAIL:
			return Object.assign({}, state, {
				isRequesting: false,
				result: 
					action.result
			});
		case RECEIVE_BIND_RESULT:
			return Object.assign({}, state, {
				isRequesting: false,
				result: 
					action.result
			});
		default: 
			return state;
	}
}


export const bind = combineReducers({
	bindTel,
	bindCode
});



