import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router'

import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';
import AddressList from '../../components/AddressList/AddressList';

import * as addressActions from '../../actions/address';
import {getUser} from '../../actions/user';


class AddressListCon extends Component {
	constructor(props,context){
		super(props.context);
		this.tabIndex = (props.params && props.params.tabindex) || 0;
	}

	componentWillMount(){
		const {user,getUser,addressActions,address} = this.props;
		if(user.hasGetToken && !user.token){
			hashHistory.push('/bind/back');
		}else if(!user.token){
			getUser(function(token){
				if(!token){
					hashHistory.push('/bind/back');
				}else if(!address.list){
					addressActions.getAddrList(token);
				}
			}.bind(this));
		}
	}

	handleEdit(type,id){
		hashHistory.push('/edit/'+type+'/'+(id || ''));
	}

	render(){
		const {tip,user,address,addressActions} = this.props;
		let loadingComponent;
		if(user.isRequesting || address.isRequesting) {
			loadingComponent = <Loading />;
		}
		return (
			<div>
				<AddressList tabIndex = {this.tabIndex} handleEdit = {this.handleEdit.bind(this)} user = {user} list = {address.list}/>
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
		address:state.address
	}
}

function mapDispatchToProps(dispatch){
	return {
		addressActions: bindActionCreators(addressActions,dispatch),
		getUser: bindActionCreators(getUser,dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddressListCon);