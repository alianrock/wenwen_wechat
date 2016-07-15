import React, {Component, PropTypes } from 'react';
import { render, ReactDOM} from 'react-dom';

// import injectTapEventPlugin from 'react-tap-event-plugin';
import '../../style/base.less';
import './test.less';
import 'react-fastclick';
// injectTapEventPlugin({
//   shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
//     return false;
//   }
// });

class Test extends Component {
	handleTap(e){
		e.preventDefault();
		console.log('tap');
		let cover = this.refs.cover1;
		cover.style.display = 'none';
	}
	handleClick(){
		console.log('click');
	}
	render(){
		return(
			<div className = 'wrapper' >
				<div className = 'inner1' ref='cover1' onClick = {this.handleTap.bind(this)}>1</div>
				<div className = 'inner2' ref='cover2' onClick ={this.handleClick}>
				<input/>
				</div>

			</div>
		)
	}
}


render(
	<Test/>,
	document.getElementById('j_wrap')
);
