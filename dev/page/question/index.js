import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-fastclick';
import { Router, Route, hashHistory } from 'react-router';

import QuestionListCon from '../../containers/Question/QuestionListCon';
import QuestionCon from '../../containers/Question/QuestionCon';


import configureStore from '../../store/question';
import '../../style/base.less';

const store = configureStore();

render(
	<Provider store = {store}>
		<Router history = {hashHistory}>
			<Route path = '/' component = {QuestionListCon}/>
			<Route path = '/qs/:id' component = {QuestionCon}/>
		</Router>
	</Provider>,
	document.getElementById('j_wrap')
);

//开发环境使用hotrelaod
if(!process.env.NODE_ENV){
	if (module.hot) {
	  module.hot.accept();
	}
}