import React, {Component, PropTypes } from 'react';
import style from './Route.less';
export default class Route extends Component {
	constructor(props){
		super(props);
		this.comMap = {
			sf:{logo:'route-header-logo_sf',name: '顺丰速运'}
		};
	}

	render(){
		const logoClass ='route-header-logo ' + this.comMap[this.props.com].logo ;
		const name = this.comMap[this.props.com].name;

		return (
			<div className = 'route-wrapper'>
				<header className = 'route-header'>
					<pan className = {logoClass}></pan>
					<h2 className = 'route-header-text'><span className = 'route-header-com'>{name}</span><span className = 'route-header-line'>|</span><span className = 'route-heaer-num'>{this.props.num}</span></h2>
				</header>
				<ul className='route-list'>
					<li className = 'route-list-item route-list-item_top'>
						<span className = 'dot'></span>
						<div className = 'con'>
							<p className = 'con-msg'>快件已签收</p>
							<p className = 'con-date'>2016-06-01<span className = 'time'>20:00:00</span></p>
						</div>
					</li>
					<li className = 'route-list-item'>
						<span className = 'dot'></span>
						<div className = 'con'>
						<p className = 'con-msg'>快件离开<strong className='con-msg-s'>xx营业部</strong>，正在发往<strong className='con-msg-s'>xx中心</strong></p>
							<p className = 'con-date'>2016-06-01<span className = 'con-date-time'>20:00:00</span></p>
						</div>
					</li>
					<li className = 'route-list-item'>
						<span className = 'dot'></span>
						<div className = 'con'>
						<p className = 'con-msg'><strong className='con-msg-s'>顺丰速运</strong>已收取快件</p>
							<p className = 'con-date'>2016-06-01<span className = 'time'>20:00:00</span></p>
						</div>
					</li>
				</ul>	           	
			</div>
		);
	}
}
