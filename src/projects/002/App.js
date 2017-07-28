import React, { Component } from 'react';
import './App.css';

let baseImgUrl = "/img/proj-002/";

class BinarySwitch extends Component {
	constructor() {
		super();
		this.state = {
			val: 0
		};
	}

	componentDidMount() {
		this.setState({val: this.props.val});
	}

	render() {
		let src = this.state.val === 0 ? "switch-off.png" : "switch-on.png";
		let title = this.state.val === 0 ? "Switch off" : "Switch on";
		let alt = "switch-off.png";

		return (<div className="switch"
			onClick={() => {
				let val = this.state.val === 1 ? 0 : 1;
				this.setState({val: val});
				this.props.update(this.props.index, val);
			}}>
			<img src={baseImgUrl + src} alt={alt} title={title}></img>
		</div>);
	}
}

class BinarySwitchApp extends Component {
	constructor() {
		super();

		let switches = [0, 0, 0, 0];
		let maxLights = Math.pow(2, switches.length) - 1;

		this.state = {
			switches: switches,
			total: this.getTotalLightsOn(switches),
			maxLights: maxLights
		};

		console.log("Thank you, MadeByOliver, for the light images!");
		console.log("http://www.flaticon.com/authors/madebyoliver");

		console.log("Thank you, Mert Gutav, for the switch images!");
		console.log("https://www.sketchappsources.com/contributor/mertgutav");
	}

	getTotalLightsOn(switches=null) {
		let total = 0;

		if (switches == null)
			switches = this.state.switches;

		for (var i = switches.length - 1; i >= 0; i--) {
			if (switches[i] === 1)
				total += Math.pow(2, switches.length - 1 - i);
		}

		return total;
	}

	update(index, val) {
		let switches = this.state.switches;
		switches[index] = val;

		this.setState({
			switches: switches,
			total: this.getTotalLightsOn()
		});
	}

	render() {
		let maxLights = this.state.maxLights;
		let total = this.state.total;
		return (
			<div className="BinarySwitchApp">
				<div className="lights-wrapper">
					<div className="lights">
					{[...Array(total)].map((x, i) => (
						<div key={i} className="light">
							<img
								src={baseImgUrl+"light-on.png"} className="light-on"
								title="Light on" alt="light-off"></img>
						</div>
					))}
					{[...Array(maxLights - total)].map((x, i) => (
						<div key={total + 1 + i} className="light">
							<img
								src={baseImgUrl + "light-off.png"} className="light-off"
								title="Light off" alt="light-off"></img>
						</div>
					))}
					</div>
				</div>
				<div className="switches">
				{this.state.switches.map((val, index) => (
					<BinarySwitch val={val} key={index} index={index} update={this.update.bind(this)}/>
				))}
				</div>
			</div>
		);
	}
}

export default BinarySwitchApp;
