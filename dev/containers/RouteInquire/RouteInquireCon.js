import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router'
import RouteInquire from '../../components/RouteInquire/RouteInquire';

import Bind    from '../../components/Bind/Bind';
import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';

import * as routeActions from '../../actions/route';
import * as tipActions from '../../actions/tip';
import * as bindActions from '../../actions/bind';
import * as userActions from '../../actions/user';


class RouteInquireCon extends Component {

	componentWillMount(){
		this.props.userActions.getUser();
	}

	handleBineCallBack(){
		hashHistory.push('/bind');
	}

	render() {
		const {	user,route,tip,bind,
				routeActions,tipActions,bindActions} = this.props;
		let loadingComponent = '';
		let bindComponent;

		if(route.isRequesting || bind.bindCode.isRequesting || bind.bindTel.isRequesting || user.isRequesting) {
			loadingComponent = <Loading />;
		}
		if(!user.tel){
			bindComponent = (
					<Bind  bindTelResult = {bind.bindTel} bindCodeResult = {bind.bindCode} bind = {bindActions.bind} getCode = {bindActions.getCode} tipShowAndFade = {tipActions.tipShowAndFade} bindCallBack = {this.handleBineCallBack.bind(this)}/>
				);
		}

		return (
			<div>
				<RouteInquire user = {user} requestRoute = {routeActions.requestRoute} tipShowAndFade = {tipActions.tipShowAndFade}/>
				{bindComponent}
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
		user:state.user,
		route: state.route,
		tip: state.tip,
		bind: state.bind
	}
}

function mapDispatchToProps(dispatch){
	return {
		routeActions: bindActionCreators(routeActions, dispatch),
		tipActions: bindActionCreators(tipActions, dispatch),
		bindActions: bindActionCreators(bindActions, dispatch),
		userActions: bindActionCreators(userActions,dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RouteInquireCon);