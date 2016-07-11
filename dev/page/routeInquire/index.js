import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, hashHistory } from 'react-router';

import RouteInquireCon from '../../containers/RouteInquire/RouteInquireCon';
import RouteCon from '../../containers/Route/RouteCon';

import configureStore from '../../store/routeInquire';
import '../../style/base.less';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
	<Provider store = {store}>
		<Router history = {history}>
			<Route path = '/' component = {RouteInquireCon}/>
			<Route path = '/route/:com/:num' component = {RouteCon}/>
		</Router>
	</Provider>
	,
	document.getElementById('j_wrap')
);

if (module.hot) {
  module.hot.accept();
}