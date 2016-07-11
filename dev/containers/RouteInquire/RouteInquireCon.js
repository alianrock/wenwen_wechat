import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RouteInquire from '../../components/RouteInquire/RouteInquire';
import Bind from '../../components/Bind/Bind';
import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';

import * as routeActions from '../../actions/route';
import * as tipActions from '../../actions/tip';
import * as bindActions from '../../actions/bind';


class RouteInquireCon extends Component {

	render() {
		const {	route,tip,bind,
				routeActions,tipActions,bindActions} = this.props;
		let loadingComponent = '';
		if(route.isRequesting || bind.bindCode.isRequesting || bind.bindTel.isRequesting) {
			loadingComponent = <Loading />;
		}
		return (
			<div>
				<RouteInquire requestRoute = {routeActions.requestRoute} tipShowAndFade = {tipActions.tipShowAndFade}/>
				<Bind bind = {bindActions.bind} getCode = {bindActions.getCode} tipShowAndFade = {tipActions.tipShowAndFade}/>
				{loadingComponent}
				<Tip text = {tip.text} showTip = {tip.showTip} />
			</div>
		)
	}
}

RouteInquireCon.propTypes = {
	route: PropTypes.object.isRequired,
	tip:PropTypes.object.isRequired,
	bind:PropTypes.object.isRequired,
	routeActions:PropTypes.object.isRequired,
	tipActions:PropTypes.object.isRequired,
	bindActions: PropTypes.object.isRequired
}

function mapStateToProps(state){
	return {
		route: state.route,
		tip: state.tip,
		bind: state.bind
	}
}

function mapDispatchToProps(dispatch){
	return {
		routeActions: bindActionCreators(routeActions, dispatch),
		tipActions: bindActionCreators(tipActions, dispatch),
		bindActions: bindActionCreators(bindActions, dispatch) 
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RouteInquireCon);