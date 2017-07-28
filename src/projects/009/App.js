import React, { Component } from 'react';
import unirest from 'unirest';
import './App.css';
import './font-awesome-4.7.0/css/font-awesome.css';

var disabled = "";
var baseUrl = "https://love-calculator.p.mashape.com/getPercentage?";
const animation = {
	animation: "expand 1200ms infinite",
	padding: '25px',
	borderRadius: '100%',
	boxShadow: '0px 0px 20px #ffffff',
};

class LoveMatchApp extends Component {
	constructor() {
		super();
		this.state = {
			name1: "",
			name2: "",
			isLoading: "loading",
			animation: {},
			heartColor: {
				color: '#1B2B34'
			},
			match: 0,
			result: ""
		}
	}

	getColorCSS(r, g, b, a) {
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	}

	getMatchPercentage() {
		this.setState({ animation: animation });
		let params = `fname=${this.state.name1}&sname=${this.state.name2}`;
		let self = this;
		unirest.get(baseUrl + params)
		.header("X-Mashape-Key", "wbyCsc5ChWmshvo4hUgvEMlE4Ro1p194zHsjsn3FiEwT7LIKgV")
		.header("Accept", "application/json")
		.end(function (res) {
			let color = "";
			let matchNum = res.body.percentage;

			if (res.body.result === "Not a good choice.") {
				color = self.getColorCSS(242, 38, 19, .40);
			} else if (res.body.result === "Can choose someone better.") {
				color = self.getColorCSS(242, 38, 19, .60);
			} else if (res.body.result === "All the best!") {
				color = self.getColorCSS(242, 38, 19, .80);
			} else if (res.body.result === "Congratulations! Good choice") {
				color = self.getColorCSS(242, 38, 19, 1);
			} else {
				color = "#1B2B34";
			}
			self.setState({
				animation: {},
				heartColor: {
					color: color
				},
				match: matchNum,
				result: res.body.result
			});
		});
	}

	handleChange(event) {
		let obj = {};
		obj[event.target.name] = event.target.value;
		this.setState(obj);
	}

	handleKeyPress(event) {
		if (event.key === "Enter"
			&& !(this.state.name1 === "" || this.state.name2 === "")) {
			this.getMatchPercentage();
		}
	}

	render() {
		disabled = (this.state.name1 === "" || this.state.name2 === "");
		return (
			<div className="LoveMatchApp">
				<div className="container">
					<div className={this.state.isLoading} style={this.state.animation}>
						<i style={this.state.heartColor} className="fa fa-heart fa-4x heart loading-logo"></i>
					</div>
					<div className="match">{this.state.match} %</div>
					<div>{this.state.result}</div>
					<div className="phrase">
						Enter in two names to see how well they match
					</div>
					<div className="inputs">
						<input value={this.state.name1} name="name1"
							onChange={this.handleChange.bind(this)}
							onKeyPress={this.handleKeyPress.bind(this)}/>
						<input value={this.state.name2} name="name2"
							onChange={this.handleChange.bind(this)}
							onKeyPress={this.handleKeyPress.bind(this)}/>
					</div>
					<button
						onClick={this.getMatchPercentage.bind(this)}
						disabled={disabled}
					>Get Match Percentage</button>
				</div>
			</div>
		);
	}
}

function findKeyframesRule(rule) {
	var ss = document.styleSheets || [];

	for (var i = 0; i < ss.length; ++i) {
		if (ss[i].cssRules)
			for (var j = 0; j < ss[i].cssRules.length; ++j) {
				if (ss[i].cssRules[j].type === window.CSSRule.WEBKIT_KEYFRAMES_RULE
					&& ss[i].cssRules[j].name === rule) { return ss[i].cssRules[j]; }
			}
	}
	return null;
}
findKeyframesRule('expand');

export default LoveMatchApp;
