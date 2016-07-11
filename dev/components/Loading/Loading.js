import React, {Component, PropTypes } from 'react';
import style from './Loading.less';
export default class Loading extends Component {
	render() {
		return (
			<div className = 'loading'>	
			 	<div className="loading-rect1"></div>
				<div className="loading-rect2"></div>
				<div className="loading-rect3"></div>
				<div className="loading-rect4"></div>
				<div className="loading-rect5"></div>
			</div>
		)
	}
}


