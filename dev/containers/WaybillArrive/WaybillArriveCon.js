import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router'

import Search from '../../components/Search/Search';
import WaybillArriveList from '../../components/WaybillArriveList/WaybillArriveList';

import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';

import * as waybillArriveActions from '../../actions/waybillArrive'; 
import * as tipActions from '../../actions/tip';
import * as userActions from '../../actions/user';


class WaybillArriveCon extends Component {
	componentWillMount(){
		const {userActions,waybillArriveActions} = this.props;
		userActions.getUser(function(token,tel){
			if(!tel){
				hashHistory.push('/bind');
			}else{
				waybillArriveActions.getList(token);	
			}
			
		}.bind(this));
	}
	render(){
		const {waybillActions,tipActions,
				user,waybillArrive,tip} = this.props; 
		let loadingComponent;
		if(user.isRequsting || waybillArrive.isRequesting) {
			loadingComponent = <Loading />;
		}
		return (
			<div>
				<WaybillArriveList 
					list = {waybillArrive.lis} 
					waybillActions = {waybillActions}
					tipActions = {tipActions}/>
				{loadingComponent}
				<Tip text = {tip.text} showTip = {tip.showTip} />
			</div>
		);
	}
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
		tipActions: bindActionCreators(tipActions,dispatch),
		userActions: bindActionCreators(userActions,dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WaybillArriveCon);