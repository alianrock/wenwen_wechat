import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router'

import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';
import AddressEdit from '../../components/AddressEdit/AddressEdit';

import * as addressActions from '../../actions/address';
import {getUser} from '../../actions/user';
import {tipShowAndFade} from '../../actions/tip';



class AddressEditCon extends Component {
	constructor(props,context){
		super(props,context);
		this.addressId = this.props.params.id && this.props.params.id.trim();
		this.type = this.props.params.type.trim();
		this.addressData = null;
	}
	
	componentWillMount(){
		const {getUser,addressActions,address} = this.props;
		getUser(function(token){
			if(!token){
				hashHistory.push('/bind/back');
			}else if(!address.list){
				addressActions.getAddrList(token);	
			}
		}.bind(this));
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.address.list && this.addressId && !this.addressData){
			nextProps.address.list.map((item)=>{
				if(this.addressId == item.addressId){
					this.addressData = item;
				}
			});
		}
	}
	

	render(){
		const {tip,user,address,addressActions,tipShowAndFade} = this.props;
		let loadingComponent;
		if(user.isRequesting || address.isRequesting) {
			loadingComponent = <Loading />;
		}
		return (
			<div>
				<AddressEdit 
					deleteAddr = {addressActions.deleteAddr} 
					editAddr = {addressActions.editAddr}
					getArea = {addressActions.getArea}
					clearArea = {addressActions.clearArea}
					addressData = {this.addressData} 
					selectArea = {addressActions.selectArea}
					type = {this.type}
					user = {user} 
					dataProvince = {address.areaProvince}
					dataCity = {address.areaCity}
					dataDistrict = {address.areaDistrict}
					dataStreet = {address.areaStreet}
					areaIsRequesting = {address.areaIsRequesting}
					tipShowAndFade = {tipShowAndFade}/>
				{loadingComponent}
				<Tip text = {tip.text} showTip = {tip.showTip} />
			</div>
		);
	}
}

AddressEditCon.porpTypes = {
	tip:PropTypes.object.isRequired,
	user:PropTypes.object.isRequired,
	address:PropTypes.object.isRequired,
	addressActions:PropTypes.object.isRequired,
	getUser:PropTypes.func.isRequired,
	tipShowAndFade:PropTypes.func.isRequired
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
		getUser: bindActionCreators(getUser,dispatch),
		tipShowAndFade: bindActionCreators(tipShowAndFade,dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddressEditCon);