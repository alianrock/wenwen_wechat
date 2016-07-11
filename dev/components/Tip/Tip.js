import React, {Component, PropTypes } from 'react';
import style from './Tip.less';
import classNames from 'classNames';
export default class Tip extends Component {

	constructor(props, context){
		super(props, context);
	}

	componentWillReceiveProps(nextprops){
		// this.tipClass = classNames({
		// 	'tip': true,
		// 	'tip-show': nextprops.showTip,
		// 	'tip-fadeIn': (nextprops.showTip != this.props.showTip) && nextprops.showTip,
		// 	'tip-fadeOut': (nextprops.showTip != this.props.showTip) && !nextprops.showTip
		// });
		// console.log('show',this.state.show);
		// console.log('showtip',this.props.showTip);
		// if(this.state.show != props.showTip && props.showTip){
		// 	this.setState({show: true, fadeIn: true , fadeOut: false});
		// }		
		// if(this.state.show != this.props.showTip && !this.props.showTip){
		// 	this.setState({show: true, fadeIn: false,fadeOut: true});
		// 	// setTimeout(function(){
		// 	// 	this.setState({show: false, fadeIn: false,fadeOut: false})
		// 	// }.bind(this), 1200);
		// }	
	}

	componentDidUpdate(){

			
	}

	render() {
		var tipClass = classNames({
			'tip': true,
			'tip-show': this.props.showTip
		});
		return (
			<div className = {tipClass}>
				<p className = 'tip-name'>{this.props.text}</p>
			</div>
		)
	}
}
Tip.propTypes = {
	showTip: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired
}


