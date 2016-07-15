import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import style from './WaybillArriveCover.less';
import WaybillArriveCoverAddress from './WaybillArriveCoverAddress';
import WaybillArriveCoverHelp from './WaybillArriveCoverHelp';
import WaybillArriveCoverTime from './WaybillArriveCoverTime';
import classNames from 'classNames';

export default class WaybillArriveCover extends Component {
	constructor(props,context){
		super(props,context);
		this.btnList = [
				{name:'到店自取',way:'0',type:'0',label:'shop'},
				{name:'配送上门',way:'3',type:'0',label:'deliver'},
				{name:'找人代拿',way:'1',type:'0',label:'help'},
				{name:'隔天取件',way:'2',type:'1',label:'nextday'},
				{name:'白天配送',way:'3',type:'1',label:'day'},
				{name:'夜间配送',way:'4',type:'1',label:'night'}];
		this.state = {
			chooseWay:'0',
			showAddress:false,
			showTime:false,
			showHelp:false
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			chooseWay: nextProps.data.dispatchingWay
		})
	}
	handleClose(e){
		e.preventDefault();
		this.setState({
			showAddress:false,
			showTime:false,
			showHelp:false
		});
		this.props.hideCover();	
	}
	handleWayBtnTap(way){
		this.setState({
			chooseWay: way
		});
	}
	handleConfirmBtnTap(){
		if(this.props.dispatchingWay == this.state.chooseWay) return;
		switch(this.state.chooseWay){
			case '3':
				//获取当前this.props.pickuptype，如果不是配送件，就设置state
				//if(type == )
				this.setState({
					showAddress:true
				});
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
			case '5':
				//5在接口是没有的，所以要进行转换
				if(this.state.changeWay == 5){}
				this.props.changeWay();
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
	renderBtn(type,way){
		let btnListDom = [];
		this.btnList.map((btn) =>{
			if(btn.type === type){
				let activeClass = (way == btn.way?'waybillArriveCover-btn_active':'');
				btnListDom.push(
					<div className = {'waybillArriveCover-btn ' + activeClass} 
						onClick = { () => this.handleWayBtnTap(btn.way)}
						 key = {btn.way} 
					>
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
		return (
			<div className = {coverClass}>
				<span className = 'waybillArriveCover-close' onClick = {this.handleClose.bind(this)}></span>
				
				{this.renderBackBtn()}
				<div className = {btnwClass} ref= 'bntw' >
					{this.renderBtn(this.props.data.pickUpType,this.state.chooseWay)}
					<div className = 'waybillArriveCover-btn waybillArriveCover-confrim' onClick = {this.handleConfirmBtnTap.bind(this)}>确定
					</div>
				</div>
				<WaybillArriveCoverAddress tipShowAndFade = {this.props.tipShowAndFade} changeWay = {this.props.changeWay} show = {this.state.showAddress}/>
				<WaybillArriveCoverTime changeWay = {this.props.changeWay} show = {this.state.showTime}/>
				<WaybillArriveCoverHelp tipShowAndFade = {this.props.tipShowAndFade} changeWay = {this.props.changeWay} show = {this.state.showHelp}/>

			</div>
		);
	}
}