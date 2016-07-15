import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunMiddleware from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import {route} from '../reducers/route';
import {tip} from '../reducers/tip';
import {bind} from '../reducers/bind';
import {user} from '../reducers/user';

const rootReducer = combineReducers({
	user,
	route,
	tip,
	bind,
});

const createStoreWithMiddleware = 
	compose(
		applyMiddleware(
			thunMiddleware,
			sequenceAction
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)(createStore);


export default function configureStore(){
	const store = createStoreWithMiddleware(rootReducer);

	return store;
}