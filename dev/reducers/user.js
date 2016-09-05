import {START_GET_USER,RECEIVE_USER,GET_USER_FAIL,USER_NO_BIND,CLEAR_TOKEN} from '../actions/user';

export function user(state = {
	token:'',
	tel:'',
	hasGetToken:false,
	isRequesting:false,
	err:null
},action){
	switch(action.type){
		case 'START_GET_USER':
			return Object.assign({},state,{
				isRequesting:true
			});
		case 'RECEIVE_USER':
			return Object.assign({},state,{
				token:action.result.token,
				tel:action.result.phone,
				hasGetToken:true,
				isRequesting:false
			});
		case 'GET_USER_FAIL':
			return Object.assign({},state,{
				isRequesting:false,
				err:action.result
			});
		case 'CLEAR_TOKEN':
			return Object.assign({},state,{
				token:''
			});
		default:
			return state; 

	}
}
