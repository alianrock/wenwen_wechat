import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';
import Bind from '../../components/Bind/Bind';
import HadBind from '../../components/Bind/HadBind';

import * as bindActions from '../../actions/bind';
import * as userActions from '../../actions/user';
import * as tipActions from '../../actions/tip';

import './style.less'


class BindCon extends Component {
	constructor(props,context){
		super(props,context);
		this.state = {
			rebind:false
		}
	}
	componentDidMount(){
		const {user,userActions} = this.props;
		if(!user.token){
			userActions.getUser();
		}
	}
	handleRebind(){
		this.setState({
			rebind:true
		});
	}

	handleBind(){
		this.setState({
			rebind:false
		});
	}

	render(){
		const {tip,user,bind,bindActions,tipActions} = this.props;
		let loadingComponent;
		let mainComponent;
		if(user.isRequesting || bind.bindCode.isRequesting || bind.bindTel.isRequesting) {
			loadingComponent = <Loading />;
		}

		if(!user.tel || this.state.rebind){
			mainComponent = (
				<div className = 'bindCon-nobind'>
					<h1 className = 'bindCon-title'>关联手机号码验证</h1>
					<Bind  bindTelResult = {bind.bindTel} bindCodeResult = {bind.bindCode} bind = {bindActions.bind} getCode = {bindActions.getCode} tipShowAndFade = {tipActions.tipShowAndFade} handleBind = {this.handleBind.bind(this)}/>
				</div>
				);
		}else{
			mainComponent = <HadBind tel = {user.tel} handleRebind = {this.handleRebind.bind(this)}/>;
		}

		return (
			<div className = 'bindCon-wrapper'>
					
				{mainComponent}

				{loadingComponent}
				<Tip text = {tip.text} showTip = {tip.showTip} />
			</div>
		);
	}
}
function mapStateToProps(state){
	return {
		tip:state.tip,
		user:state.user,
		bind:state.bind
	}
}

function mapDispatchToProps(dispatch){
	return {
		bindActions: bindActionCreators(bindActions, dispatch),
		tipActions: bindActionCreators(tipActions,dispatch),
		userActions: bindActionCreators(userActions,dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BindCon);