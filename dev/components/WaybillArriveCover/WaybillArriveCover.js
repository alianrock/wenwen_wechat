import React, {Component, PropTypes } from 'react';
import style from './WaybillArriveCover.less';
import WaybillArriveCoverAddress from './WaybillArriveCoverAddress';
// import WaybillArriveCoverHelp from './WaybillArriveCoverHelp';
// import WaybillArriveCoverTime from './WaybillArriveCoverTime';


export default class WaybillArriveCover extends Component {
	render(){
		return (
			<div className = 'waybillArriveCover'>
				<span className = 'waybillArriveCover-close'></span>
				<div className = 'waybillArriveCover-btnw'>
					<div className = 'waybillArriveCover-btn waybillArriveCover-btn_active'>
						<span className = 'icon icon-day'></span>白天配送
					</div>
					<div className = 'waybillArriveCover-btn'>
						<span className = 'icon icon-night'></span>夜间配送
					</div>
					<div className = 'waybillArriveCover-btn'>
						<span className = 'icon icon-shop'></span>到店自取
					</div>
					<div className = 'waybillArriveCover-btn waybillArriveCover-confrim'>确定
					</div>
				</div>
				<WaybillArriveCoverAddress/>
			</div>
		);
	}
}