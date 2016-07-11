import React, {Component, PropTypes } from 'react';
import style from './WaybillArriveItem.less';
import LoadingSmall from '../Loading/LoadingSmall';

export default class WaybillArriveItem extends Component {
	render(){
		return (
			<div>
				<section className = 'waybillItem'>
				<header className = 'waybillItem-header'>顺丰<span className='waybillItem-header-line'>|</span><span>1234567890</span>
					</header>
					<div className = 'waybillItem-mid'>
						<div className = 'waybillItem-middle-icon'></div>
						<div className = 'waybillItem-middle-state'>请到店自取</div>
						<div className = 'waybillItem-middle-btn'>没空拿？</div>
					</div>
					<div className = 'waybillItem-btm'>
						<span className = 'waybillItem-btm-icon1'></span>
						<span className = 'waybillItem-btm-con'>
							xx问问点 <span className = 'waybillItem-btm-line'>|</span>位置号：<span className='waybillItem-btm-num'>12345</span>
						</span>
						<span className = 'waybillItem-btm-icon2 icon icon-down'></span>		
					</div>
					<div className = 'waybillItem-log'>
						<LoadingSmall/>
						<ul className = 'waybillItem-list'>
							<li className = 'item'>
								<span className = 'item-dot'></span>
								你的宝贝已到xx问问店
								<span className = 'item-time'>2014050511</span>
							</li>
							<li className = 'item'>
								<span className = 'item-dot'></span>
								你的宝贝已到xx问问店
								<span className = 'item-time'>2014050511</span>
							</li>
							<li className = 'item'>
								<span className = 'item-dot'></span>
								你的宝贝已到xx问问店
								<span className = 'item-time'>2014050511</span>
							</li>
							<li className = 'item item_courier'>
								<span className = 'courier-icon'></span>
								<span className = 'courier-con'>
									<p>配送员：xxx</p>
									<p>联系方式：<span className='tel'>13434214</span></p>
								</span>
								<a href='tel:13560387458' className = 'courier-tel'></a>
							</li>
						</ul>
					</div>
				</section>
				<section className = 'waybillItem'>
					<header className = 'waybillItem-header'>顺丰<span className='waybillItem-header-line'>|</span>1234567890
					</header>
					<div className = 'waybillItem-mid'>
						<div className = 'waybillItem-middle-icon waybillItem-middle-icon_2'></div>
						<div className = 'waybillItem-middle-state'>即将为您配送</div>
						<div className = 'waybillItem-middle-btn'>没在家？</div>
					</div>
					<div className = 'waybillItem-btm'>
						<span className = 'waybillItem-btm-icon1'></span>
						<span className = 'waybillItem-btm-con'>
							xx问问点 <span className = 'waybillItem-btm-line'>|</span>位置号：<span className='waybillItem-btm-num'></span>
						</span>
						<span className = 'waybillItem-btm-icon2 icon icon-down'></span>		
					</div>
					<div className = 'waybillItem-log'>
						<LoadingSmall/>
						<ul className = 'waybillItem-list'>

						</ul>
					</div>
				</section>
			</div>
		);
	}
}