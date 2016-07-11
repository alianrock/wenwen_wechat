import React, {Component, PropTypes } from 'react';
import style from './WaybillArriveList.less';
import WaybillArriveItem from '../WaybillArriveItem/WaybillArriveItem';
import WaybillArriveCover from '../WaybillArriveCover/WaybillArriveCover';

export default class WaybillArriveList extends Component {
	render(){
		return (
			<div className = 'waybillList-wrapper'>
			<header className = 'waybillList-header'>待取快件</header>
				<WaybillArriveItem />
				<WaybillArriveCover />
			</div>
		);
	}
}