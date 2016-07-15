import React, {Component, PropTypes } from 'react';
import style from './Bind.less';
export default class Bind extends Component {
	constructor(props,context){
		super(props,context);
		this.state = {
			count:30,
			wait:false
		}

		this.timer = null;
	}

	countDown(){

		this.setState({
			wait:true
		});
		clearInterval(this.timer);
		this.timer = setInterval(() => {
			if(this.state.count == 0){
				clearInterval(this.timer);
				this.setState({
					wait:false,
					count:30
				});
				return;
			}
			this.setState({
				count:this.state.count-1
			});
		},1000);
	}

	getCode(){

		if(this.state.wait) return;
		const tel = this.refs.tel.value.trim();
		if(!/^1[3-9]\d{9}$/.test(tel)){
			this.props.tipShowAndFade('请填写正确的电话号码');
			return;
		}
		this.countDown();
		this.props.getCode(tel);
	}

	bindTel(){
		const code = this.refs.code.value.trim();
		const tel = this.refs.tel.value.trim();
		
		if(this.props.handleBind){
			this.props.handleBind();
		}
		if(!code){
			this.props.tipShowAndFade('请输入验证码');
			return;
		}
		this.props.bind(code,tel,this.props.bindCallBack);
	}

	render() {
		return (
			<div className = 'bindwarp'>	
				<p className= 'bind-tip'>
					<i className='bind-tip-icon'></i>
					<span className = 'bind-tip-con'>输入单号太麻烦？<em>输入手机号码</em>，即可快速查询哦！</span>
				</p>
				<form className = 'bind-form'>
					<div className='bind-inputwrapper'>
						<input className = 'bind-input'  type = 'text' placeholder = '请输入手机号码' ref='tel'/>
						<span className = 'bind-codebtn bind-codebtn_1' onClick = {this.getCode.bind(this)}>{this.state.wait?this.state.count+'秒':'获取验证码'}</span>
					</div>
					<div className='bind-inputwrapper'>
						<input className = 'bind-input' type='text' ref='code' placeholder = '请输入验证码'/>
						<span className = 'bind-codebtn bind-codebtn_2' onClick = {this.bindTel.bind(this)}>马上验证</span>
					</div>
				</form>
			</div>
		)
	}
}

Bind.propTypes = {
	getCode: PropTypes.func.isRequired,
	bind: PropTypes.func.isRequired,
	tipShowAndFade: PropTypes.func.isRequired
}



