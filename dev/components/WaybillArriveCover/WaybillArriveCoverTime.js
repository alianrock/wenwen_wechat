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
	onChange(value) {
	    console.log('onChange', value);
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
				
				<div className = 'waybillArriveCover-confirm'>确定</div>

			</div>
		);
	}
}