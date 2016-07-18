import React, {Component, PropTypes } from 'react';
import Picker from 'rmc-picker';
import PickerStyle from 'rmc-picker/assets/index.css';
import WaybillArriveCover from './WaybillArriveCover.less';
import classNames from 'classNames';

import {NIGHT_DELIVER_OPTION}  from '../../config';

export default class WaybillArriveCoverTime extends Component {
	constructor(props,context){
		super(props, context);
		this.state = {
			items: NIGHT_DELIVER_OPTION,
      		value: NIGHT_DELIVER_OPTION[this.props.timeIndex || 0].value
		}
	}
	handleConfrim(){
		const {data,chooseWay,user} = this.props;
		if(data.appointTime == this.state.value) return;
		this.props.changeDiliverWay(user.token,{
			dataId:data.dataId,
			dispatchingWay:chooseWay,
			appointTime:this.state.value
		});
	}
	onChange(value) {
	    this.setState({
	      value,
	    });
	}
	render(){
		const timeClass = classNames({
			'waybillArriveCoverTime':true,
			'waybillArriveCoverTime_show':this.props.show
		});
		return(
			<div className = {timeClass}>
				<div className = 'waybillArriveCoverTime-picker'>
					<p className = 'header'><span className = 'icon icon-moon header-icon'></span>夜间配送时间段：</p>
					<Picker selectedValue={this.state.value} onValueChange={this.onChange.bind(this)}>
						 {this.state.items}
					</Picker>
				</div>
				
				<div className = 'waybillArriveCover-confirm' onClick = {this.handleConfrim.bind(this)}>确定</div>

			</div>
		);
	}
}
WaybillArriveCoverTime.propTypes = {
	changeDiliverWay:PropTypes.func.isRequired,
	show:PropTypes.bool.isRequired,
	user:PropTypes.object.isRequired,
	data:PropTypes.object.isRequired,
	chooseWay:PropTypes.string.isRequired
}