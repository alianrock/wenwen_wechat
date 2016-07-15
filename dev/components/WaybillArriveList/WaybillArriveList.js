import React, {Component, PropTypes } from 'react';
import style from './WaybillArriveList.less';
import WaybillArriveItem from '../WaybillArriveItem/WaybillArriveItem';
import WaybillArriveCover from '../WaybillArriveCover/WaybillArriveCover';
import Search from '../../components/Search/Search';

import icon from './images/noContent-SJ@3x.png';
export default class WaybillArriveList extends Component {

	renderList(){
		const items = this.props.list.items;
		let list = [];
		//判断show字段是否存在或者为show，显示
		//如果itemsleng为0 显示没有记录组件

		if(items.length == 0){
			list.push(
				<div className = 'waybillList-none'>
					<img className = 'waybillList-none-icon' src={icon} alt='没有记录'/>
					<p className = 'waybillList-none-tip'>你暂时没有待取的快件哦</p>
					<div className = 'waybillList-none-btn'>查看已取快件</div>
				</div>
			);
		}
		items.map((item)=>{
			if(!item.hide) return;
			list.push(
				<WaybillArriveItem data = {item} showCover = {this.props.waybillActions.showCover} />
			);
		});
	}
	render(){
		const {cover} = this.props.waybillArrive;
		return (
			<div className = 'waybillList-wrapper'>
				<Search/>

				<div className = 'waybillList-listWrapper'>
					<header className = 'waybillList-header'>待取快件</header>
					{/*<div className = 'waybillList-none'>
						<img className = 'waybillList-none-icon' src={icon} alt='没有记录'/>
						<p className = 'waybillList-none-tip'>你暂时没有待取的快件哦</p>
						<div className = 'waybillList-none-btn'>查看已取快件</div>
					</div>*/}
					<WaybillArriveItem showCover = {this.props.waybillActions.showCover} />
				</div>
				
				<WaybillArriveCover coverShow = {cover.isShow} hideCover = {this.props.waybillActions.hideCover} changeWay = {this.props.waybillActions.changeDiliverWay}
					tipShowAndFade = {this.props.tipActions.tipShowAndFade}
					 data = {{pickUpType:'0', dispatchingWay:'0'}}/>
					
			</div>
		);
	}
}