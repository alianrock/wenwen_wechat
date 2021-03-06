import React, {Component, PropTypes } from 'react';
import style from './Search.less';
export default class Search extends Component {
	constructor(props,context){
		super(props,context);
		this.timer = null;
	}
	
	handleChange(e){
		let value = e.target.value.trim();
		clearTimeout(this.timer);
		this.timer = setTimeout(function(e){
			this.props.filter(value);
		}.bind(this),200);
	}

	render(){
		return (
			<div className = 'search'>
				<span className='search-icon icon icon-search'></span>
				<input className='search-input' type='text' onChange = {this.handleChange.bind(this)} placeholder = {this.props.placeholder}/>	
			</div>
		)
	}
}

