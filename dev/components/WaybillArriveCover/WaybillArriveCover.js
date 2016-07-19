import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import style from './WaybillArriveCover.less';
import WaybillArriveCoverAddress from './WaybillArriveCoverAddress';
import WaybillArriveCoverHelp from './WaybillArriveCoverHelp';
import WaybillArriveCoverTime from './WaybillArriveCoverTime';
import classNames from 'classNames';
import {WAYBILL_STATUS} from '../../config/';

export default class WaybillArriveCover extends Component {
	constructor(props,context){
		super(props,context);
		this.btnList = [
				{name:'配送上门',way:'3',type:'0',label:'deliver'},
				{name:'找人代拿',way:'1',type:'0',label:'help'},
				{name:'隔天取件',way:'2',type:'0',label:'nextday'},
				{name:'白天配送',way:'3',type:'1',label:'day'},
				{name:'到店自取',way:'0',type:'1',label:'shop'}];
				// {name:'夜间配送',way:'4',type:'1',label:'night'}
		this.state = {
			chooseWay:'',
			showAddress:false,
			showTime:false,
			showHelp:false
		}
	}
	componentWillReceiveProps(nextProps){
		if(!this.state.chooseWay){
			this.setState({
				chooseWay: nextProps.data.dispatchingWay
			});
		}
		if(!nextProps.coverShow){
			this.setState({
				chooseWay:'',
				showAddress:false,
				showTime:false,
				showHelp:false
			});
		}
	}
	handleClose(e){
		if(e && e.preventDefault) e.preventDefault();
		this.props.hideCover();	
	}
	handleWayBtnTap(way){
		this.setState({
			chooseWay: way
		});
	}
	handleConfirmBtnTap(){
		const {data,changeDiliverWay,user}  = this.props;
		if(data.dispatchingWay == this.state.chooseWay) {
			this.handleClose();
			return;
		}

		const changeData = {
			dataId:data.dataId,
			dispatchingWay:this.state.chooseWay
		}
		switch(this.state.chooseWay){
			case '3':
				//获取当前this.props.pickuptype，如果不是配送件，就设置state
				if(data.pickupType === '0'){
					this.setState({
						showAddress:true
					});
				}else{
					changeDiliverWay(user.token,changeData);
				}
				break;
			case '4':
				this.setState({
					showTime:true
				});
				break;
			case '1':
				this.setState({
					showHelp:true
				});
				break;
			case '0':
			case '2':
				changeDiliverWay(user.token,changeData);
				break;
			default:
				break;
		}
	}
	handleBack(){
		this.setState({
			showAddress:false,
			showTime:false,
			showHelp:false
		});
	}
	renderBtn(){
		const type = this.props.data.pickupType;
		const waybillStatus = this.props.data.waybillStatus;
		const way = this.state.chooseWay;
		let btnListDom = [];

		if(!this.props.coverShow) return;
		this.btnList.map((btn) =>{
			if(btn.type === type){
				let activeClass = (way == btn.way?'waybillArriveCover-btn_active':'');
				//如果是滞留件，没有隔天取件的按钮
				if(waybillStatus == WAYBILL_STATUS.DELAY && btn.way == '2') return;
				btnListDom.push(
					<div className = {'waybillArriveCover-btn ' + activeClass} 
						onClick = { () => this.handleWayBtnTap(btn.way)}
						 key = {btn.way} >
						<span className = {'icon icon-' + btn.label}></span>{btn.name}
					</div>
				);
			}
		});
		return btnListDom;
	}
	renderBackBtn(){
		if(this.state.showAddress || this.state.showHelp || this.state.showTime){
			return (<span className = 'waybillArriveCover-back icon icon-left' onClick = {this.handleBack.bind(this)}></span>);
		}
	}
	render(){
		const coverClass = classNames({
			'waybillArriveCover': true,
			'waybillArriveCover_show': this.props.coverShow
		});
		const btnwClass = classNames({
			'waybillArriveCover-btnw':true,
			'waybillArriveCover-btnw_fade':(this.state.showTime || this.state.showAddress || this.state.showHelp)

		});
		const {tipShowAndFade,changeDiliverWay,getAddrList,user,addrList,data} =  this.props;
		return (
			<div className = {coverClass}>
				<span className = 'waybillArriveCover-close' onClick = {this.handleClose.bind(this)}></span>
				
				{this.renderBackBtn()}
				<div className = {btnwClass} ref= 'bntw' >
					{this.renderBtn()}
				
					<div className = 'waybillArriveCover-btn waybillArriveCover-confrim' onClick = {this.handleConfirmBtnTap.bind(this)}>确定
					</div>
				</div>
				<WaybillArriveCoverAddress 
					getAddrList = {getAddrList} 
					tipShowAndFade = {tipShowAndFade} 
					changeDiliverWay = {changeDiliverWay} 
					show = {this.state.showAddress} 
					user = {user} 
					addrList = {addrList}
					data = {data}
					chooseWay = {this.state.chooseWay}/>
				<WaybillArriveCoverTime user = {user} changeDiliverWay = {changeDiliverWay} 
					show = {this.state.showTime}
					data = {data}
					chooseWay = {this.state.chooseWay}/>
				<WaybillArriveCoverHelp 
					tipShowAndFade = {tipShowAndFade} 
					changeDiliverWay = {changeDiliverWay} 
					show = {this.state.showHelp}
					user = {user} 
					data = {data}
					chooseWay = {this.state.chooseWay}/>

			</div>
		);
	}
}

WaybillArriveCover.propTypes = {
	user:PropTypes.object.isRequired,
	data:PropTypes.object.isRequired,
	addrList:PropTypes.array.isRequired,
	coverShow:PropTypes.bool.isRequired,
	hideCover:PropTypes.func.isRequired,
	changeDiliverWay:PropTypes.func.isRequired,
	tipShowAndFade:PropTypes.func.isRequired,
	getAddrList:PropTypes.func.isRequired
}