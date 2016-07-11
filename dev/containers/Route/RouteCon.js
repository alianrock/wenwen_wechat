import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './style.less';

import RouteComponent from '../../components/Route/Route';
import Loading from '../../components/Loading/Loading';
import Tip from '../../components/Tip/Tip';

import * as routeActions from '../../actions/route';


class RouteCon extends Component {
	constructor(props){
		super(props);
		this.componey = this.props.params.com;
		this.number = this.props.params.num;
	}

	componentWillMount(){
		this.props.routeActions.requestRoute(this.componey, this.number)
	}
	
	render(){

		const {	route,tip,routeActions} = this.props;
		let loadingComponent = '';
		if(route.isRequesting) {
			loadingComponent = <Loading />;
		}
		return (
			<div>
				<RouteComponent com = 'sf' num = {this.number} />
				{loadingComponent}
				<Tip text = {tip.text} showTip = {tip.showTip} />
			</div>
		);
	}
}

RouteCon.propTypes = {
	route: PropTypes.object.isRequired,
	tip:PropTypes.object.isRequired,
	routeActions:PropTypes.object.isRequired
}

function mapStateToProps(state){
	return {
		route: state.route,
		tip: state.tip
	}
}

function mapDispatchToProps(dispatch){
	return {
		routeActions: bindActionCreators(routeActions, dispatch)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RouteCon);
