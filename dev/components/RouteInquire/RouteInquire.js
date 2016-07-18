import React, {Component, PropTypes } from 'react';
import { hashHistory } from 'react-router'
import style from './RouteInquire.less';
import {ROUTE_EXPRESS_COMPONEY} from '../../config/';

export default class RouteInquire extends Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			componey:'请选择快递公司哦',
			componeyCode:''
		}
	}

	//选择快递公司
	handleSelect(e){
		const code = e.target.value;
		const item = ROUTE_EXPRESS_COMPONEY.filter((item) => item.code == code);
		this.setState({componey: item[0].name,componeyCode: code});
	}

	//提交请求
	handleRouteSubmit(e){

		let number = this.refs.number.value.trim();
		if(this.state.componeyCode === ''){
			this.props.tipShowAndFade('请选择快递公司哦');
			return;
		}
		if(!number){
			this.props.tipShowAndFade('请填写运单号哦');
			return;
		} 

		hashHistory.push('/route/'+this.state.componeyCode+'/'+number);
		
	}

	render() {
		return (
			<div className = 'routerq-formwarp'>	
				<form className = 'routerq-form'>
					<div className = 'routerq-inputwrapper'>
						<div className = 'routerq-inputicon_1 icon icon-kuaidi'>
						</div>
						
						<div className = 'routerq-selectw'>
							{this.state.componey}
							<select className='routerq-select' onChange={this.handleSelect.bind(this)}>
								<option value = '' key='none'>请选择快递公司</option>
								{ROUTE_EXPRESS_COMPONEY.map(option =>
						            <option value={option.code} key={option.code} >
						              {option.name}
						            </option>)
						        }
							</select>
						</div>
						<i className = 'routerq-inputicon_2 routerq-inputicon_2_xj icon icon-jiantou'></i>
					</div>	

					<div className = 'routerq-inputwrapper'>
						<div className = 'routerq-inputicon_1 icon icon-note'>
						</div>
						<input ref = 'number' type='text' placeholder ='请输入运单号' className = 'routerq-input' />
						{/*<i className = 'routerq-inputicon_2 icon icon-xiangji'></i>*/}
					</div>	
				</form>
				<div className = 'routerq-submit' onClick = {this.handleRouteSubmit.bind(this)}>查询</div>			
			</div>
		)
	}
}


RouteInquire.propTypes = {
	requestRoute: PropTypes.func.isRequired,
	tipShowAndFade: PropTypes.func.isRequired
}