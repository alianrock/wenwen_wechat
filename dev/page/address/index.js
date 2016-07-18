import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-fastclick';
import { Router, Route, hashHistory } from 'react-router';
import configureStore from '../../store/address';
import AddressListCon from '../../containers/Address/AddressListCon';
import AddressEditCon from '../../containers/Address/AddressEditCon';
import BindCon from '../../containers/Bind/BindCon';
import Loading from '../../components/Loading/Loading';
import '../../style/base.less';

const store = configureStore();

render(
	<Provider store = {store}>
		<Router history = {hashHistory}>
			<Route path = '/(:tabindex)' component = {AddressListCon}/>
			<Route path = '/edit/:type/(:id)' component = {AddressEditCon}/>
			<Route path = '/bind/(:back)' component = {BindCon}/>
		</Router>
	</Provider>,
	document.getElementById('j_wrap')
);

