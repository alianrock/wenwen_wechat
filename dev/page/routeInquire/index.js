import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-fastclick';
import { Router, Route, hashHistory } from 'react-router';

import RouteInquireCon from '../../containers/RouteInquire/RouteInquireCon';
import RouteCon from '../../containers/Route/RouteCon';
import BindCon from '../../containers/Bind/BindCon';

import configureStore from '../../store/routeInquire';
import '../../style/base.less';

const store = configureStore();

render(
	<Provider store = {store}>
		<Router history = {hashHistory}>
			<Route path = '/' component = {RouteInquireCon}/>
			<Route path = '/route/:com/:num' component = {RouteCon}/>
			<Route path = '/bind' component = {BindCon}/>
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