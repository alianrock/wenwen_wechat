import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Search from '../../components/Search/Search';
import WaybillArriveList from '../../components/WaybillArriveList/WaybillArriveList';


class WaybillArriveCon extends Component {
	render(){
		return (
			<div>
				<Search/>
				<WaybillArriveList/>
			</div>
		);
	}
}
function mapStateToProps(state){
	return {
	}
}

function mapDispatchToProps(dispatch){
	return {
		
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WaybillArriveCon);