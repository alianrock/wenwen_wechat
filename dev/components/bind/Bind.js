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
		this.props.getCode(tel,this.countDown.bind(this));
	}

	componentWillUnmount(){
		clearInterval(this.timer);
	}

	bindTel(){
		const code = this.refs.code.value.trim();
		const tel = this.refs.tel.value.trim();
		
		if(!code){
			this.props.tipShowAndFade('请输入验证码');
			return;
		}
		if(!/^1[3-9]\d{9}$/.test(tel)){
			this.props.tipShowAndFade('请填写正确的电话号码');
			return;
		}
		if(this.props.handleBind){
			this.props.handleBind();
		}

		//清除token
		if(this.props.clearToken) this.props.clearToken();
		
		const data = {
			verificationCode: code,
			phone: tel,
			token: this.props.rebind?this.props.user.token:null 
		}
		this.props.bind(data,this.props.rebind,this.props.bindCallBack);
	}
	render() {

		return (
			<div className = 'bindwarp'>	
				<p className= 'bind-tip'>
					<i className='bind-tip-icon'></i>
					{
						this.props.tipType? 
							(
								<span className = 'bind-tip-con'>输入单号太麻烦？<em>输入手机号码</em>，即可快速查询哦！</span>
								):
							(
								<span className = 'bind-tip-con'>设置关联手机号码，可快速查询关联手机相关快件，享受<em>到件通知、在线寄件</em>等服务
								</span>
							)
							
					}
					
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
	tipShowAndFade: PropTypes.func.isRequired,
	bind: PropTypes.func.isRequired,
	tipShowAndFade: PropTypes.func.isRequired,
	bindTelResult: PropTypes.object.isRequired,
	bindCodeResult: PropTypes.object.isRequired,
}



