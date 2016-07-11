
export const TIP_HIDE = 'TIP_HIDE';
export const TIP_SHOW = 'TIP_SHOW';
let timer = null;

//删除消息提示
export function tipHide(){
	return {
		type: TIP_HIDE
	}
} 
export function tipShow(text){
	return {
		type: TIP_SHOW,
		text: text
	}
}

//延迟删除消息提示
export function tipShowAndFade(text){
	return dispatch => {
		dispatch(tipShow(text));
		clearTimeout(timer);
	    timer = setTimeout(() => {
	    	dispatch(tipHide());
	    }, 3200);
	}
}

