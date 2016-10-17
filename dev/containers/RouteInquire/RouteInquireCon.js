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

	constructor(props,context){
		super(props,context);
		this.back = (this.props.params && this.props.params.back);
	}
	
	componentWillMount(){
		const {user,userActions} = this.props;
		userActions.getUser();
	}

	handleBineJump(){
		//如果有返回，返回首页
		if(this.back){
			hashHistory.push('/');
		//没有返回，绑定后返回绑定页面
		}else{
			hashHistory.push('/bind/back');
		}
	}

	render() {
		const {	user,route,tip,bind,
				routeActions,tipActions,bindActions,userActions} = this.props;
		let loadingComponent = '';
		let bindComponent;

		if(route.isRequesting || bind.bindCode.isRequesting || bind.bindTel.isRequesting || user.isRequesting) {
			loadingComponent = <Loading />;
		}
		if(!user.token){
			bindComponent = (
				<Bind
					tipType = 'routeinquire'
					bindTelResult = {bind.bindTel} 
					bindCodeResult = {bind.bindCode} 
					bind = {bindActions.bind} 
					getCode = {bindActions.getCode} 
					tipShowAndFade = {tipActions.tipShowAndFade} 
					handleBineJump = {this.handleBineJump.bind(this)}/>
			);
		}

		return (
			<div>
				<RouteInquire 
					requestRoute = {routeActions.requestRoute} 
					tipShowAndFade = {tipActions.tipShowAndFade}/>
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
	user:PropTypes.object.isRequired,
	routeActions:PropTypes.object.isRequired,
	tipActions:PropTypes.object.isRequired,
	bindActions: PropTypes.object.isRequired,
	userActions: PropTypes.object.isRequired
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