import React, {Component, PropTypes } from 'react';
import WaybillArriveCover from './WaybillArriveCover.less';
import classNames from 'classNames';


export default class WaybillArriveCoverHelp extends Component {handleConfrim(e){
		const tel = this.refs.tel.trim();
		const text = this.ref.tel.trim();
		if(!/^1[3-9]\d{9}$/.test(tel)){
			this.props.tipShowAndFade('请填写正确的电话号码');
		}
		this.props.changeWay();
	}
	render(){
		const helpClass = classNames({
			'waybillArriveCoverHelp':true,
			'waybillArriveCoverHelp_show':this.props.show
		});
		return(
			<div className = {helpClass}>
				<from>
					<div className = 'inputwrapper'>
						<span className = 'icon icon-phone'></span>
						<input ref='tel' className = 'input' type = 'text' placeholder = '请填写小伙伴的手机号码'/>
					</div>
					<div className = 'inputwrapper'>
						<span className = 'icon icon-pencil'></span>
						<textarea ref='text' className = 'textarea'  placeholder = '请填写留言信息'/>

					</div>
				</from>
				<p className = 'waybillArriveCover-tip'><span className = 'tip-icon'></span>我们将发送留言信息和快递信息给代拿的小伙伴哦！</p>
				<div className = 'waybillArriveCover-confirm' onClick = {this.handleConfrim.bind(this)}>确定</div>
			</div>
		);
	}
}