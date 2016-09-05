import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';
import Bind from '../../components/Bind/Bind';
import HadBind from '../../components/Bind/HadBind';

import * as bindActions from '../../actions/bind';
import {getUserFromRemote} from '../../actions/user';
import {clearToken} from '../../actions/user';
import {tipShowAndFade} from '../../actions/tip';

import style from './style.less';

class BindCon extends Component {
	constructor(props,context){
		super(props,context);
		this.back = (this.props.params && this.props.params.back) || null;
		this.state = {
			rebind:false
		}
	}
	componentDidMount(){
		const {user,getUserFromRemote} = this.props;
		if(!user.token && !user.hasGetToken){
			getUserFromRemote();
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
		const {tip,user,bind,bindActions,tipShowAndFade,clearToken} = this.props;
		let loadingComponent;
		let mainComponent;
		if(user.isRequesting || bind.bindCode.isRequesting || bind.bindTel.isRequesting) {
			loadingComponent = <Loading />;
		}
		if(!user.token || this.state.rebind){
			mainComponent = (
				<div className = 'bindCon-nobind'>
					<h1 className = 'bindCon-title'>关联手机号码验证</h1>
					<Bind  
						bindTelResult = {bind.bindTel} 
						bindCodeResult = {bind.bindCode}
						rebind = {this.state.rebind} 
						bind = {bindActions.bind} 
						getCode = {bindActions.getCode}
						clearToken = {clearToken}
						user = {user}
						tipShowAndFade = {tipShowAndFade} 
						handleBind = {this.handleBind.bind(this)}/>
				</div>
				);
		}else{
			mainComponent = <HadBind back = {this.back} tel = {user.tel} handleRebind = {this.handleRebind.bind(this)}/>;
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

BindCon.propTypes = {
	tip:PropTypes.object.isRequired,
	user:PropTypes.object.isRequired,
	bind:PropTypes.object.isRequired,
	bindActions:PropTypes.object.isRequired,
	getUserFromRemote:PropTypes.func.isRequired,
	clearToken: PropTypes.func.isRequired,
	tipShowAndFade:PropTypes.func.isRequired
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
		tipShowAndFade: bindActionCreators(tipShowAndFade,dispatch),
		getUserFromRemote: bindActionCreators(getUserFromRemote,dispatch),
		clearToken: bindActionCreators(clearToken,dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BindCon);