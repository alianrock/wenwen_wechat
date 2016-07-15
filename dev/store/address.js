import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunMiddleware from 'redux-thunk';
import {tip} from '../reducers/tip';

const rootReducer = combineReducers({
	tip,
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