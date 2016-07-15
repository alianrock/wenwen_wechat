import React, {Component, PropTypes } from 'react';
import style from './Tab.less';
export default class Tab extends Component {
	render(){
		console.log(this.props.tabOnIndex)
		let tabs = [];
		this.props.items.map((item,index) => {
			tabs.push(<div key = {index} className ={'tab-item ' + ((index == this.props.tabOnIndex)?'tab-item_on':'')} onClick = {() => {this.props.handleTap(index) } }><h2 className = 'tab-item-inner'>{item}</h2></div>);
		});
		return(
			<div className = 'tab-wrapper'>
				{tabs}
			</div>
		);
	}
}