import React, {Component, PropTypes } from 'react';
import style from './Route.less';
import {ROUTE_EXPRESS_COMPONEY} from '../../config/';
export default class Route extends Component {
	constructor(props){
		super(props);
	}

	renderList(){
		let list = [];
		let route = this.props.route;
		// console.log((!route.result || !route.result.Traces));
		if(!route.result || !route.result.Traces) return;

		route.result.Traces.map((item,index) =>{
			const topClass = index == 0 ? 'route-list-item_top':'';
			list.push(<li key = {index} className = {'route-list-item '+topClass}><span className = 'dot'></span><div className = 'con'><p className = 'con-msg'>{item.AcceptStation}</p><p className = 'con-date'>{item.AcceptTime}</p></div></li>)
		});
		return list;
	}

	render(){
		const logoClass ='route-header-logo route-header-logo_' + this.props.componeyCode ;
		const name = ROUTE_EXPRESS_COMPONEY.filter((item) => item.code == this.props.componeyCode)[0].name;
		return (
			<div className = 'route-wrapper'>
				<header className = 'route-header'>
					<pan className = {logoClass}></pan>
					<h2 className = 'route-header-text'><span className = 'route-header-com'>{name}</span><span className = 'route-header-line'>|</span><span className = 'route-heaer-num'>{this.props.num}</span></h2>
				</header>
				<ul className='route-list'>
					{this.renderList()}
				</ul>	           	
			</div>
		);
	}
}
