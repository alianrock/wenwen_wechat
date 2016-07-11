import React, {Component, PropTypes } from 'react';
import style from './Bind.less';
export default class Bine extends Component {

	getCode(){
		var tel = this.refs.tel.value.trim();
		if(!/^1[3-9]\d{9}$/.test(tel)){
			this.props.tipShowAndFade('请填写正确的电话号码');
			return;
		}
		this.props.getCode(tel);
	}

	bindTel(){
		var code = this.refs.code.value.trim();
		if(!code){
			this.props.tipShowAndFade('请输入验证码');
			return;
		}
		this.props.bind(code);

	}

	render() {
		return (
			<div className = 'binewarp'>	
				<p className= 'bine-tip'>
					<i className='bine-tipicon'></i>
					输入单号太麻烦？<em>输入手机号码</em>，即可快速查询哦！
				</p>
				<form className = 'bine-form'>
					<div className='bine-inputwrapper'>
						<input className = 'bine-input'  type = 'text' placeholder = '请输入手机号码' ref='tel'/>
						<span className = 'bine-codebtn bine-codebtn_1' onClick = {this.getCode.bind(this)}>获取验证码</span>
					</div>
					<div className='bine-inputwrapper'>
						<input className = 'bine-input' type='text' ref='code' placeholder = '请输入验证码'/>
						<span className = 'bine-codebtn bine-codebtn_2' onClick = {this.bindTel.bind(this)}>马上验证</span>
					</div>
				</form>
			</div>
		)
	}
}

Bine.propTypes = {
	getCode: PropTypes.func.isRequired,
	bind: PropTypes.func.isRequired,
	tipShowAndFade: PropTypes.func.isRequired
}



