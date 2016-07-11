import React, {Component, PropTypes } from 'react';
import style from './Search.less';
export default class Search extends Component {

	handleChange(e){
		let value =e.target.value.trim();
	}

	render(){
		return (
			<div className = 'search'>
				<span className='search-icon icon icon-search'></span>
				<input className='search-input' type='text' onChange = {this.handleChange.bind(this)} placeholder = '请输入运单号'/>	
			</div>
		)
	}
}

