import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunMiddleware from 'redux-thunk';
import {tip} from '../reducers/tip';
import {question} from '../reducers/question';



const rootReducer = combineReducers({
	tip,
	question
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