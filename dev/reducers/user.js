import {START_GET_USER,RECEIVE_USER,GET_USER_FAIL,USER_NO_BIND} from '../actions/user';

export function user(state = {
	token:'',
	tel:'',
	noBind:false,
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
				noBind:false,
				isRequesting:false
			});
		case 'GET_USER_FAIL':
			return Object.assign({},state,{
				isRequesting:false,
				err:action.result
			});
		case 'USER_NO_BIND':
			return Object.assign({},state,{
				isRequesting:false,
				noBind:true,
				token:action.result.token
			});
		default:
			return state; 

	}
}
