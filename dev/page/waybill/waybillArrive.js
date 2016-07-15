import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, hashHistory } from 'react-router';
import configureStore from '../../store/waybillArrive';
import WaybillArriveCon from '../../containers/WaybillArrive/WaybillArriveCon';
import BindCon from '../../containers/Bind/BindCon';

import '../../style/base.less';
import 'react-fastclick';

const store = configureStore();

render(
	<Provider store = {store}>
		<Router history = {hashHistory}>
			<Route path = '/' component = {WaybillArriveCon}/>
			<Route path = '/bind' component = {BindCon}/>
		</Router>
	</Provider>,
	document.getElementById('j_wrap')
);

if (module.hot) {
  module.hot.accept();
}