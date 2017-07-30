import React, { Component } from 'react';
import './App.css';

class BalloonDisplay extends Component {
	constructor() {
		super();
		this.state = {
			air: 0,
			range: Math.floor(Math.random() * 10) + 1
		}
	}

	render() {
		return (
			<div >
				<button className="btn" onClick={() => {
					let air = this.state.air;

					if (air + 1 >= this.state.range) {
						let range =  Math.floor(Math.random() * 10) + 1;
						this.setState({air: 0, range: range});
						air = 0;

					} else {
						this.setState({air: air + 1});
					}

					let ballon = document.getElementById("balloon");
					ballon.style.height = (100 + air * 20) + "px";
					ballon.style.width = (100 + air * 20) + "px";
				}}>Air</button>
				<div id="balloon"></div>
			</div>
		);
	}
}

class BalloonApp extends Component {
	render() {
		return (
			<div className="BalloonApp">
				<BalloonDisplay />
			</div>
		);
	}
}

export default BalloonApp;
