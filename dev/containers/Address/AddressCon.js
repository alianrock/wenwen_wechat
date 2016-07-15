import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';
import AddressList from '../../components/Address/AddressList';

class AddressCon extends Component {
	render(){
		const {tip,user} = this.props;
		let loadingComponent;
		// if(waybillArrive.isRequesting) {
		// 	loadingComponent = <Loading />;
		// }
		return (
			<div>
				<AddressList/>
				{loadingComponent}
				<Tip text = {tip.text} showTip = {tip.showTip} />
			</div>
		);
	}
}
function mapStateToProps(state){
	return {
		tip:state.tip,
		user:state.user
	}
}

function mapDispatchToProps(dispatch){
	return {
		
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddressCon);