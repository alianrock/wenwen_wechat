import React, {Component, PropTypes } from 'react';
import style from './Bind.less';
import { hashHistory } from 'react-router'

export default class HadBind extends Component {
	handleRebind(){
		this.props.handleRebind();
	}
	handleBack(){
		hashHistory.push('/');
	}
	render(){
		return(
				<div className = 'hadBind-con'>
					{this.props.back?<div className = 'hadBind-back icon icon-left'  onClick = {this.handleBack.bind(this)}></div>:''}
					<span className = 'hadBind-icon icon icon-check'></span>	
					<p className = 'hadBind-text_1'>你已成功绑定手机</p>
					<p className = 'hadBind-text_2'>关联手机：<em>{this.props.tel}</em></p>
					<p className = 'bind-tip hadBind-tip'><span className = 'bind-tip-icon'></span><span class='bint-tip-con'> 如需查询其他手机号码相关快件，请重新关联其他号码</span></p>
					<div className = 'hadBind-btn' onClick = {this.handleRebind.bind(this)}>重新关联其他号码</div>
				</div>
			);
	}
}

HadBind.propTypes = {
	handleRebind: PropTypes.func.isRequired,
	tel: PropTypes.string.isRequired
}