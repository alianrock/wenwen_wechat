import {TIP_HIDE,TIP_SHOW} from '../actions/tip';

export function tip(state = {
	showTip: false,
	text: ''
},action){
	switch(action.type){
		case TIP_SHOW:
			return Object.assign({}, state, {
				showTip: true,
				text:action.text
			});
		case TIP_HIDE:
			return Object.assign({}, state, {
				showTip: false
			});
		default: 
			return state;
	}
}


