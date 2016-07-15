import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-fastclick';

import { Router, Route, hashHistory } from 'react-router';
import configureStore from '../../store/address';
import AddressCon from '../../containers/Address/AddressCon';
import '../../style/base.less';

const store = configureStore();
render(
	<Provider store = {store}>
		<AddressCon/>
	</Provider>,
	document.getElementById('j_wrap')
);

if (module.hot) {
  module.hot.accept();
}