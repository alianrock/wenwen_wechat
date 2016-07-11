import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	routing: routerReducer
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