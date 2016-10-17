import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router'

import Search from '../../components/Search/Search';
import WaybillArriveList from '../../components/WaybillArriveList/WaybillArriveList';

import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';

import * as waybillArriveActions from '../../actions/waybillArrive'; 
import {getUser} from '../../actions/user';
import {tipShowAndFade} from '../../actions/tip';

class WaybillArriveCon extends Component {
	
	constructor(props, context){
		super(props,context);
		// this.constructor.childContextTypes =  {
		//     user: PropTypes.object.isRequired
		// }
	}
	
	// getChildContext() {
	// 	console.log('contxt',this.props.user);
	//     return {user: this.props.user};
	// }

	componentWillMount(){
		const {getUser,waybillActions} = this.props;
		getUser(function(token){
			waybillActions.getList(token,'ex2u',0);
		}.bind(this),true);
	}
	
	getCompleteList(){
		const {waybillActions,user} = this.props;
		waybillActions.getList(user.token,'ex2u',1);	
	}
	getNoCompleteList(){
		const {waybillActions,user} = this.props;
		waybillActions.getList(user.token,'ex2u',0);	
	}

	render(){
		const {waybillActions,tipShowAndFade,
				user,waybillArrive,tip} = this.props; 
		let loadingComponent;
		if(user.isRequesting || waybillArrive.isRequesting) {
			loadingComponent = <Loading />;
		}
		return (
			<div>
				<WaybillArriveList 
					getCompleteList = {this.getCompleteList.bind(this)}
					getNoCompleteList = {this.getNoCompleteList.bind(this)}
					tipShowAndFade = {tipShowAndFade}
					user = {user} 
					waybillArrive = {waybillArrive} 
					waybillActions = {waybillActions}/>
				{loadingComponent}
				<Tip text = {tip.text} showTip = {tip.showTip} />
			</div>
		);
	}
}

WaybillArriveCon.propTypes = {
	tip:PropTypes.object.isRequired,
	user:PropTypes.object.isRequired,
	waybillArrive:PropTypes.object.isRequired,
	waybillActions:PropTypes.object.isRequired,
	getUser:PropTypes.func.isRequired,
	tipShowAndFade:PropTypes.func.isRequired
}

function mapStateToProps(state){
	return {
		waybillArrive: state.waybillArrive,
		tip: state.tip,
		user: state.user
	}
}

function mapDispatchToProps(dispatch){
	return {
		waybillActions: bindActionCreators(waybillArriveActions, dispatch),
		tipShowAndFade: bindActionCreators(tipShowAndFade,dispatch),
		getUser: bindActionCreators(getUser,dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WaybillArriveCon);