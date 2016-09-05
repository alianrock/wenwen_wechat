import React, {Component, PropTypes } from 'react';
import { hashHistory } from 'react-router'
import Tab from '../Tab/Tab';
import './AddressList.less'
export default class AddressList extends Component {
	constructor(props, context){
		super(props,context);
		this.tabs = ['寄件人地址','收件人地址'];
		this.state = {
			tabOnIndex: this.props.tabIndex || 0//0代表寄件人地址，1代表收件人地址
		};
	}

	handleTap(index){
		this.setState({
			tabOnIndex:index
		});
		hashHistory.push('/'+index);
	}

	renderItem(){
		let listCom = [];
		const {list} = this.props;
		if(list && list.length > 0){

			this.props.list.map((item,index) => {
				if(item.type == this.state.tabOnIndex) {
					listCom.push(
						<section key = {index} className = 'address-item'>
							<div className = 'address-item-con'>
								<div className = 'address-item-con-top'>
									<span className = 'name'>
										{
											(item.isDefault == '1')?<span className = 'default-tag'>默认</span>:''
										}
										{item.name}
									</span>
									<span className = 'tel'>{item.phone}</span>
								</div>
								<div className = 'address-item-con-btm'>{item.pcdName +' '+ item.detailAddress}</div>
							</div>
							<div onClick = {()=>this.props.handleEdit(item.type,item.addressId)} className = 'address-item-icon icon icon-edit'></div>
						</section>
					);
				}
			});
		}

		if(listCom.length === 0){
			listCom.push(<section key = 'none' className = 'address-none'>
				<span className = 'address-none-icon'></span>
				<p className = 'address-none-tip'>收件人地址列表空荡荡的</p>
			</section>);
		}
			
		return listCom;
	}


	render(){
		return(
			<div className = 'address-wrapper'>
				<Tab tabOnIndex = {this.state.tabOnIndex} items = {this.tabs} handleTap = {this.handleTap.bind(this)}/>
				<p className = 'address-header'>地址管理</p>

				
				<div className = 'address-list'>
				{this.renderItem()}
				</div>

				<div className = 'address-add' onClick = {()=>this.props.handleEdit(this.state.tabOnIndex)}>
					<span className = 'icon icon-plus'></span>
				</div>
			</div>
		);
	}
}