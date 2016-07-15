import React, {Component, PropTypes } from 'react';
import Tab from '../Tab/Tab';
import './AddressList.less'
export default class AddressList extends Component {
	constructor(props, context){
		super(props,context);
		this.tabs = ['寄件人地址','收件人地址'];
		this.state = {
			tabOnIndex:0
		};
	}
	handleTap(index){
		this.setState({
			tabOnIndex:index
		});
	}
	render(){
		return(
			<div className = 'address-wrapper'>
				<Tab tabOnIndex = {this.state.tabOnIndex} items = {this.tabs} handleTap = {this.handleTap.bind(this)}/>
				<p className = 'address-header'>地址管理</p>
				<div className = 'address-list'>
					<section className = 'address-item'>
						<div className = 'addres-item-con'>
							<div className = 'address-item-con-top'>

								<span className = 'name'><span className = 'default-tag'>默认</span>王小二</span>
								<span className = 'tel'>1234567890</span>
							</div>
							<div className = 'address-item-con-btm'>浙江省杭州市滨江区江南大道300号XX小区2幢1单元202</div>
						</div>
						<div className = 'address-item-icon icon icon-edit'></div>
					</section>
					<section className = 'address-item'>
						<div className = 'addres-item-con'>
							<div className = 'address-item-con-top'>

								<span className = 'name'><span className = 'default-tag'>默认</span>王小二</span>
								<span className = 'tel'>1234567890</span>
							</div>
							<div className = 'address-item-con-btm'>浙江省杭州市滨江区江南大道300号XX小区2幢1单元202</div>
						</div>
						<div className = 'address-item-icon icon icon-edit'>	</div>
					</section>
				</div>

				<div className = 'address-add'>
					<span className = 'icon icon-plus'></span>
				</div>
			</div>
		);
	}
}