import React, {Component, PropTypes } from 'react';
import classNames from 'classNames';

export default class WaybillArriveCoverAddress extends Component {
	constructor(props,context){
		super(props,context);
		this.state = {
			selectAddr:null,
			showAddAddrInput: false
		};
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.show && !this.props.show){
			this.props.getAddrList(this.props.user.token);
			this.state = {
				selectAddr:null,
				showAddAddrInput: false
			};
		} 
	}
	
	//添加地址
	handleAddAddr(){
		this.setState({
			selectAddr:null,
			showAddAddrInput:true
		});
	}
	//提交信息
	hanldeConfirm(e){
		let newAddr = this.state.showAddAddrInput ? this.refs.newAddr.value.trim():'';
		const {data,chooseWay,tipShowAndFade,user} = this.props;
		//如果没有选择列表中的地址也没有填写新地址，那么提示没填写地址
		let changeData = {
			dataId:data.dataId,
			dispatchingWay:chooseWay
		}

		if(this.state.showAddAddrInput && newAddr){
			changeData.address = newAddr;
			this.props.changeDiliverWay(user.token,changeData);
		}else if(!this.state.showAddAddrInput && this.state.selectAddr){
			changeData.address = this.state.selectAddr.addressId;
			changeData.name = this.state.selectAddr.name;
			changeData.phone = this.state.selectAddr.phone;
			this.props.changeDiliverWay(user.token,changeData);
		}else if((this.state.showAddAddrInput && !newAddr) || !this.state.selectAddr){
			tipShowAndFade('请选择或者填写您的配送地址哦！')
		}
	}
	//选择地址
	handleSelect(addr){
		if(this.state.selectAddr && addr.addressId == this.state.selectAddr.addressId) {
			this.setState({
				selectAddr:null
			})
		}else{
			this.setState({
				selectAddr:addr
			})
		}
	}
	renderAddrList(){
		let addrListCom = [];
		const selectAddr = this.state.selectAddr;
		this.props.addrList.map((addr,index) =>{
			addrListCom.push(<li onClick = { () => this.handleSelect(addr)} key = {index} className = {(selectAddr && addr.addressId == selectAddr.addressId)?'item item_select':'item'}>
					<div className = 'item-con'>
						<p className = 'item-con-top'>
							<span className = 'name'>{addr.name||''}</span>
							<span className = 'tel'>{addr.phone||''}</span>
						</p>
						<p className = 'item-con-btm'>{addr.pcdName + addr.detailAddress}</p>
					</div>	
					<div className = 'item-check icon icon-check'></div>
				</li>);
		});
		return addrListCom;
	}
	render(){
		const addressClass = classNames({
			'WaybillArriveCoverAddress':true,
			'WaybillArriveCoverAddress_show':this.props.show
		});

		return(<div className = {addressClass}>
			<ul className = 'list'>
			{this.renderAddrList()}
			</ul>
			{
				!this.state.showAddAddrInput ? 
				(<div className = 'addbtn' onClick = {this.handleAddAddr.bind(this)}><span className = 'addbtn-icon icon icon-plus'></span>添加其他地址</div>)
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

WaybillArriveCoverAddress.propTypes = {
	getAddrList:PropTypes.func.isRequired,
	tipShowAndFade:PropTypes.func.isRequired,
	changeDiliverWay:PropTypes.func.isRequired,
	show:PropTypes.bool.isRequired,
	user:PropTypes.object.isRequired,
	addrList:PropTypes.array.isRequired,
	data:PropTypes.object.isRequired,
	chooseWay:PropTypes.string.isRequired
}
