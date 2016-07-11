import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, hashHistory } from 'react-router';
import configureStore from '../../store/waybillArrive';
import WaybillArriveCon from '../../containers/WaybillArrive/WaybillArriveCon';
import '../../style/base.less';

const store = configureStore();

render(
	<Provider store = {store}>
		<WaybillArriveCon/>
	</Provider>,
	document.getElementById('j_wrap')
);

if (module.hot) {
  module.hot.accept();
}