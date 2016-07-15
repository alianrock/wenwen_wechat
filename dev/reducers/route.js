import {START_REQUEST_ROUTE, RECEIVE_ROUTE, REQUEST_ROUTE_FAIL} from '../actions/route';

export function route(state = {
	isRequesting: false,
	result:null,
	showTip: false
},action){
	switch(action.type){
		case START_REQUEST_ROUTE:
			return Object.assign({},state, {
				isRequesting: true
			});
		case REQUEST_ROUTE_FAIL:
			return Object.assign({}, state, {
				isRequesting: false,
				result: 
					action.result
			});
		case RECEIVE_ROUTE:
			return Object.assign({}, state, {
				isRequesting: false,
				result: 
					action.result
			});
		default: 
			return state;
	}
}


