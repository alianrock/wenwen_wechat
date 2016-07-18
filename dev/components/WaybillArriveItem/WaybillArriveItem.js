import React, {Component, PropTypes } from 'react';
import style from './WaybillArriveItem.less';
import LoadingSmall from '../Loading/LoadingSmall';
import classNames from 'classNames';
import {STATE_MAP} from '../../config/';
export default class WaybillArriveItem extends Component {
	constructor(props,context){
		super(props,context);
		this.state = {
			showLog:false
		}
		// this.constructor.contextTypes =  {
		//    store: PropTypes.object.isRequired
		// }
	}

	handleTapBtn(e){
		e.preventDefault();
		e.stopPropagation();
		this.props.showCover(this.props.data);
		this.setState({
			showLog:false
		});
	}
	handleTapItem(e){
		if(!this.state.showLog && (!this.props.log)){
			this.props.getLog(this.props.user.token,this.props.data.dataId);
		}
		this.setState({
			showLog:!this.state.showLog
		});
		
	}

	renderLog(){
		const {log} = this.props.data;
		let logCom = [];
		if(!log){	
			logCom.push(<LoadingSmall key = 'loading'/>);
		}else{
			log.map((item,index)=>{
				logCom.push(
					<li key = {index} className = 'item'>
						<span className = 'item-dot'></span>
						{item.desc}
						<span className = 'item-time'>{item.time}</span>
					</li>);		
			});
		}

		if(this.props.ownerName){
			const callBtn = this.props.ownerTel ? <a href={'tel:' + this.props.ownerTel} className = 'courier-tel'></a> : '';
			logCom.push(
				<div key= 'courier' classNames = 'item_courier'>
					<span className = 'courier-icon'></span>
					<span className = 'courier-con'>
						<p>配送员：{this.props.ownerName || '问问小哥'}</p>

						<p>联系方式：<span className='tel'>{this.props.ownerTel || '暂无'}</span></p>
					</span>
					{callBtn}
				</div>
			);
		}
		return logCom;
		
	}

	

	renderNoCompleteItem(data){
		return (
			<div>
				<header className = 'waybillItem-header'>
					<span className = 'waybillItem-header-con'>
						{data.expressCompany}
						<span className='waybillItem-header-line'>|</span>
						<span>{data.waybillNo}</span>
					</span>
				</header>
				<div className = 'waybillItem-mid'>
					<div className ={'waybillItem-middle-icon waybillItem-middle-icon_'+data.dispatchingWay}></div>
					<div className = 'waybillItem-middle-state'>{STATE_MAP(data.dispatchingWay)}</div>

					{
						(data.pickupType == 0 && data.dispatchingWay != 0)?'':<div className = 'waybillItem-middle-btn'  onClick = {this.handleTapBtn.bind(this)} >{data.pickupType == 0 ? '没空拿？':'不在家？'}</div>
					}
				</div>
				<div className = 'waybillItem-btm'>
					<span className = 'waybillItem-btm-icon1'></span>
					<span className = 'waybillItem-btm-con'>
						{data.storeName} 
						{
							!!data.areaNum ? <span><span className = 'waybillItem-btm-line'>|</span>位置号：<span className='waybillItem-btm-num'>{data.areaNum}</span></span>:''
						}
					</span>
					<span className = 'waybillItem-btm-icon2 icon icon-down'></span>		
				</div>
				<div className ='waybillItem-log'>
					<ul className='waybillItem-list'>{this.renderLog()}</ul>
				</div>
			</div>
		);
	}	

	renderCompleteItem(data){
		return (
			<div>
				<header className = 'waybillItem-header'>
					<span className = 'waybillItem-header-con'>
						{data.expressCompany}
						<span className='waybillItem-header-line'>|</span>
						<span>{data.waybillNo}</span>
					</span>
					<span className = 'waybillItem-btm-icon2 icon icon-down'></span>	
				</header>
				<div className ='waybillItem-log'>
					<ul className='waybillItem-list'>{this.renderLog()}</ul>
				</div>
			</div>
		)
	}

	render(){
		const itemClass = classNames({
			'waybillItem':true,
			'waybillItem_complete':this.props.complete,
			'waybillItem_showLog':this.state.showLog
		});
		const {data}  = this.props;
		return (
			<section className = {itemClass} onClick = {this.handleTapItem.bind(this)}>
				{this.props.complete?this.renderCompleteItem(data):this.renderNoCompleteItem(data)}
			</section>
		);
	}
}

WaybillArriveItem.propTypes = {
	user:PropTypes.object.isRequired,
	data:PropTypes.object.isRequired,
	showCover: PropTypes.func.isRequired,
	getLog:PropTypes.func.isRequired
}