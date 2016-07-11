import React, {Component, PropTypes } from 'react';
import style from './Loading.less';
export default class Loading extends Component {
	render() {
		return (
			<div className = 'loading_small'>	
			 	<div className="loading_small-box1"></div>
				<div className="loading_small-box2"></div>
			</div>
		)
	}
}


