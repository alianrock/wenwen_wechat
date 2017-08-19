import {
	START_GET_QS,
    GET_QSLIST_FAIL,
    RECEIVE_QSLIST,
    GET_QS_FAIL,
    RECEIVE_QS,
} from '../actions/question';

export function question(state = {
    isRequesting: false,
    list:[],
    qsdetail:{
        title:'',
        con:''
    },
    err:null
}, action){
    console.log();
    switch(action.type){
        case START_GET_QS:
            return Object.assign({},state,{
                isRequesting:true
            });
        case GET_QSLIST_FAIL:
            return Object.assign({}, state, {
                isRequesting:false,
                err: action.result
            });
        case RECEIVE_QSLIST:
            return Object.assign({}, state, {
                isRequesting: false,
                list: action.result
            });
        case GET_QS_FAIL:
            return Object.assign({}, state, {
                isRequesting:false,
                err: action.result
            });
        case RECEIVE_QS:
            return Object.assign({}, state, {
                isRequesting: false,
                qsdetail: Object.assign({}, state.qsdetail, action.result)
            });
        default:
            return state;
    }

}