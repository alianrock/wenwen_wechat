import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, hashHistory } from 'react-router';
import configureStore from '../../store/waybillArrive';
import WaybillArriveCon from '../../containers/WaybillArrive/WaybillArriveCon';
import RouteInquireCon from '../../containers/RouteInquire/RouteInquireCon';
import RouteCon from '../../containers/Route/RouteCon';


import '../../style/base.less';
import 'react-fastclick';

const store = configureStore();

render(
	<Provider store = {store}>
		<Router history = {hashHistory}>
			<Route path = '/' component = {WaybillArriveCon}/>
			<Route path = '/route/:com/:num' component = {RouteCon}/>
			<Route path = '/bind(/:back)' component = {RouteInquireCon}/>
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