import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunMiddleware from 'redux-thunk';
import {tip} from '../reducers/tip';
import {user} from '../reducers/user';
import {bind} from '../reducers/bind';


const rootReducer = combineReducers({
	bind,
	tip,
	user,
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