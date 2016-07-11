import React, {Component, PropTypes } from 'react';
// import style from './WaybillArriveCover.less';

export default class WaybillArriveCoverAddress extends Component {
	render(){
		return(<div className = 'WaybillArriveCoverAddress'>
			<ul className = 'list'>
				<li className = 'item'>
					<div className = 'item-con'>
						<p className = 'item-con-top'>
							<span className = 'name'>王小二</span>
							<span className = 'tel'>13424424234</span>
						</p>
						<p className = 'item-con-btm'>浙江省杭州市滨江区江南大道300号xx小区11幢611</p>
					</div>	
					<div className = 'item-check'></div>
				</li>
				<li className = 'item'>
					<div className = 'item-con'>
						<p className = 'item-con-top'>
							<span className = 'name'>王小二</span>
							<span className = 'tel'>13424424234</span>
						</p>
						<p className = 'item-con-btm'>浙江省杭州市滨江区江南大道300号xx小区11幢611</p>
					</div>	
					<div className = 'item-check'></div>
				</li>
			</ul>
			<div className = 'addbtn'><span className = 'icon icon-add'></span>添加其他地址</div>
			<div className = 'addressInputWrapper'>
				<span className = 'icon icon-pencil'></span>
				<input className = 'addressInput' placeholder = '请填写您的配送地址'/>
			</div>
			<p className = 'tip'><span className = ''></span>配送上门需要支付<em>2元</em>配送费哦！</p>
			<div className = 'confirm'>确定</div>
		</div>);
	}
}
