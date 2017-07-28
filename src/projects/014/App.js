import React, { Component } from 'react';
import './App.css';
import Portfolio from './containers/Portfolio';

class PortfolioV1App extends Component {
	render() {
		return (
			<div className="PortfolioV1App">
				<h2>100 Apps Challenge</h2>
				<Portfolio/>
			</div>
		);
	}
}

export default PortfolioV1App;
