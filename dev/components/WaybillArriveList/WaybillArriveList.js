import React, {Component, PropTypes } from 'react';
import style from './WaybillArriveList.less';
import WaybillArriveItem from '../WaybillArriveItem/WaybillArriveItem';
import WaybillArriveCover from '../WaybillArriveCover/WaybillArriveCover';
import Search from '../../components/Search/Search';

import icon from './images/noContent-SJ@3x.png';

export default class WaybillArriveList extends Component {

	constructor(props,context){
		super(props,context);
		this.state = {
			complete:false
		}
		this.completeItems = [];
		this.noCompleteItems = [];
	}

	renderList(){
		const {waybillArrive,waybillActions} =  this.props;
		const items = waybillArrive.list;
		let listCom = [];
		//判断show字段是否存在或者为show，显示
		//如果itemsleng为0 显示没有记录组件

		if(items.length > 0){
			listCom.push(<header key = 'header' className = 'waybillList-header'>
				{this.state.complete?<span>已取快件<em>（最近七天）</em></span>:'待取快件'}
				</header>);
			items.map((item,index)=>{
				if(item.hide) return;
				listCom.push(
					<WaybillArriveItem 
						key = {index+'-'+this.state.complete} complete = {this.state.complete} 
						user = {this.props.user}  
						data = {item} 
						showCover = {waybillActions.showCover} 
						getLog = {waybillActions.getLog}/>
				);
			});
		}

		if(listCom.length <= 1){
			listCom.push(
				<div key = 'none' className = 'waybillList-none'>
					<img className = 'waybillList-none-icon' src={icon} alt='没有记录'/>
					<p className = 'waybillList-none-tip'>
					{
						(items && items.length == 0)?
							'你暂时没有'+(this.state.complete?'已取':'待取')+'的快件哦'
							:
							'找不到记录哦'
					}
					</p>
				</div>
			);
		}
		return listCom;
	}

	handlefilter(value){
		this.props.waybillActions.filterList(value);
	}

	toggleComplete(){
		if(!this.state.complete){
			this.props.getCompleteList();
		}else{
			this.props.getNoCompleteList();
		}
		this.setState({
			complete:!this.state.complete
		});	
	}

	render(){
		const {cover} = this.props.waybillArrive;
		const {hideCover,changeDiliverWay,getAddrList} = this.props.waybillActions;
		const {tipShowAndFade} = this.props;
		return (
			<div className = 'waybillList-wrapper'>
				<Search filter = {this.handlefilter.bind(this)} placeholder = '请输入运单号'/>

				<div className = 'waybillList-listWrapper'>
					{this.renderList()}
				</div>
				
				<WaybillArriveCover 
					user = {this.props.user} 
					data = {cover.data}
					addrList = {cover.addrList}
					coverShow = {cover.isShow} 
					hideCover = {hideCover} 
					changeDiliverWay = {changeDiliverWay}
					tipShowAndFade = {tipShowAndFade}
					getAddrList = {getAddrList}/>

				<div className = 'waybillList-showCompleted' onClick = {this.toggleComplete.bind(this)}>{this.state.complete?'查看未取快件':'查看已取快件'}</div>	
			</div>
		);
	}
}

WaybillArriveList.proptypes = {
	getCompleteList:PropTypes.func.isRequired,
	getNoCompleteList:PropTypes.func.isRequired,
	tipShowAndFade:PropTypes.func.isRequired,
	user:PropTypes.object.isRequired,
	waybillArrive:PropTypes.object.isRequired,
	waybillActions:PropTypes.object.isRequired,
}