import React, {Component, PropTypes } from 'react';
import classNames from 'classNames';

export default class WaybillArriveCoverAddress extends Component {
	constructor(props,context){
		super(props,context);
		this.state = {
			selectAddrId:0,
			showAddAddrInput: false
		};
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.show && !this.state.addressList){
			this.getAddressList();
		} 
	}
	getAddressList(){
		this.props.getAddressList();
	}
	//选择地址
	selectAddr(id){
		this.setState({
			selectAddrId:id
		});
	}
	//添加地址
	handleAddAddr(){
		this.setState({
			showAddAddrInput:true 
		});
	}
	//提交信息
	hanldeConfirm(e){
		const newAddr = this.refs.newAddr.value.tirm();
		//如果没有选择列表中的地址也没有填写新地址，那么提示没填写地址
		// if(){}
		this.props.changeWay();
	}
	renderAddrList(){
		this.addressList.map((addr) =>{
			//如果地址id和选中的匹配，则设置那个class
			if(addr.id == this.state.selectAddrId){}
		});
	}
	render(){
		const addressClass = classNames({
			'WaybillArriveCoverAddress':true,
			'WaybillArriveCoverAddress_show':this.props.show
		});

		return(<div className = {addressClass}>
			<ul className = 'list'>
				<li className = 'item'>
					<div className = 'item-con'>
						<p className = 'item-con-top'>
							<span className = 'name'>王小二</span>
							<span className = 'tel'>13424424234</span>
						</p>
						<p className = 'item-con-btm'>浙江省杭州市滨江区江南大道300号xx小区11幢611</p>
					</div>	
					<div className = 'item-check icon icon-check'></div>
				</li>
				<li className = 'item item_select'>
					<div className = 'item-con'>
						<p className = 'item-con-top'>
							<span className = 'name'>王小二</span>
							<span className = 'tel'>13424424234</span>
						</p>
						<p className = 'item-con-btm'>浙江省杭州市滨江区江南大道300号xx小区11幢611</p>
					</div>	
					<div className = 'item-check icon icon-check'></div>
				</li>
				<li className = 'item'>
					<div className = 'item-con'>
						<p className = 'item-con-top'>
							<span className = 'name'>王小二</span>
							<span className = 'tel'>13424424234</span>
						</p>
						<p className = 'item-con-btm'>浙江省杭州市滨江区江南大道300号xx小区11幢611</p>
					</div>	
					<div className = 'item-check icon icon-check'></div>
				</li>
				<li className = 'item item_select'>
					<div className = 'item-con'>
						<p className = 'item-con-top'>
							<span className = 'name'>王小二</span>
							<span className = 'tel'>13424424234</span>
						</p>
						<p className = 'item-con-btm'>浙江省杭州市滨江区江南大道300号xx小区11幢611</p>
					</div>	
					<div className = 'item-check icon icon-check'></div>
				</li>
			</ul>
			{
				!this.state.showAddAddrInput ? 
				(<div className = 'addbtn'><span className = 'addbtn-icon icon icon-plus'></span>添加其他地址</div>)
				 : 
				(<div className = 'addressInputWrapper'>
					<span className = 'addressInputWrapper-icon icon icon-pencil'></span>
					<input ref ='newAddr' className = 'addressInput' placeholder = '请填写您的配送地址'/></div>)
			}
			<p className = 'waybillArriveCover-tip'><span className = 'tip-icon'></span>配送上门需要支付<em>2元</em>配送费哦！</p>
			<div className = 'waybillArriveCover-confirm' onClick = {this.hanldeConfirm.bind(this)}>确定</div>
		</div>);
	}
}
