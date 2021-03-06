import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunMiddleware from 'redux-thunk';
import {waybillArrive} from '../reducers/waybillArrive';
import {tip} from '../reducers/tip';
import {user} from '../reducers/user';
import {bind} from '../reducers/bind';
import {route} from '../reducers/route';


const rootReducer = combineReducers({
	tip,
	waybillArrive,
	user,
	tip,
	bind,
	route
});


const createStoreWithMiddleware = 
	compose(
		applyMiddleware(
			thunMiddleware
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)(createStore);

export default function configureStore(){
	const store = createStoreWithMiddleware(rootReducer);

	return store;
}