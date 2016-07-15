import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-fastclick';

import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, hashHistory } from 'react-router';
import configureStore from '../../store/bind';
import BindCon from '../../containers/Bind/BindCon';
import '../../style/base.less';

const store = configureStore();
render(
	<Provider store = {store}>
		<BindCon/>
	</Provider>,
	document.getElementById('j_wrap')
);

if (module.hot) {
  module.hot.accept();
}