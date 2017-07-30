import React, { Component } from 'react';
import './App.css';
import '../../css/font-awesome-4.7.0/css/font-awesome.css';

class CharacterBox extends Component {
	render() {
		return (
			<div className="CharacterBox">
				<i className="up fa fa-chevron-up" aria-hidden="true" onClick={this.props.onUp}></i>
				<span className="character">{this.props.character}</span>
				<i className="down fa fa-chevron-down" aria-hidden="true" onClick={this.props.onDown}></i>
			</div>
		);
	}
}

class BasicDecryptionApp extends Component {
	constructor() {
		super();
		let self = this;

		self.words = require("./words");
		let rotation = self.getValidRotation();
		let wordArr = self.getRandomWord();
		let encryptedArr = self.encryptWord(wordArr, rotation);
		let rotations = encryptedArr.map(e => rotation);

		self.state = {
			wordArr,
			encryptedArr,
			rotation,
			rotations,
			numStrikes: 0,
			limit: 3,
			numCorrect: 0,
			status: ""
		}
	}

	getValidRotation() {
		let rotation = Math.floor((Math.random() * 25)) + 1;
		while (rotation === 0) {
			rotation = Math.floor((Math.random() * 25)) + 1;
		}
		return rotation;
	}

	nextRandomWord() {
		let self = this;
		let rotation = self.getValidRotation();
		let wordArr = self.getRandomWord();
		let rotations = wordArr.map(e => rotation);

		this.setState({wordArr, rotation, rotations});
	}

	giveUp() {
		if (this.state.numStrikes + 1 < 3) {
			this.nextRandomWord();
		}
		this.checkLoss(this.state.numStrikes + 1);
	}

	getRandomWord() {
		let randomIdx = Math.floor((Math.random() * this.words.length));
		return this.words[randomIdx].toLowerCase().split('');
	}

	encryptWord(wordArr, rotation=13) {
		let encrypted = [];
		let c;

		for (var i = 0; i < wordArr.length; i++) {
			c = (wordArr[i].charCodeAt(0) - 97 + rotation) % 26 + 97;
			c = String.fromCharCode(c).toLowerCase();
			encrypted.push(c);
		}
		return encrypted;
	}

	rotateCharacter(character, rotation) {
		character = (character.charCodeAt(0) - 97 + rotation) % 26 + 97;
		character = String.fromCharCode(character).toLowerCase();
		return character;
	}

	onUp(idx) {
		let { rotations } = this.state;
		rotations[idx]++;
		if (rotations[idx] > 25) rotations[idx] = 0;

		this.setState({rotations})
	}

	onDown(idx) {
		let { rotations } = this.state;
		rotations[idx]--;
		if (rotations[idx] < 0) rotations[idx] = 25;

		this.setState({rotations})
	}

	restart() {
		let self = this;
		let rotation = self.getValidRotation();
		let rotations = this.state.rotations.map(e => { return rotation });
		this.setState({rotation, rotations, numStrikes: 0, numCorrect: 0, status: ""});
	}

	reset() {
		let rotations = this.state.rotations.map(e => { return this.state.rotation });
		this.setState({rotations});
	}

	isValid() {
		for (var i = 0; i < this.state.rotations.length; i++) {
			if (this.state.rotations[i] !== 0) {
				return false;
			}
		}
		return true;
	}

	validate() {
		if (this.isValid()) {
			this.setState(prev => {
				return {
					numCorrect: prev.numCorrect + 1
				}
			});
			this.nextRandomWord();
		} else {
			this.checkLoss(this.state.numStrikes + 1);
		}
	}

	checkLoss(numStrikes) {
		if (numStrikes === this.state.limit) {
			this.setState({numStrikes, status: "Wow. I hope you're not trying to get into cyber security."});
		} else {
			this.setState({numStrikes});
		}
	}

	render() {
		let self = this;

		let strikes = [];
		for (let i = 0; i < this.state.numStrikes; i++) {
			strikes.push(<i key={i + "strike"} className="strike red fa fa-times" aria-hidden="true"></i>)
		}
		for (let i = this.state.numStrikes; i < this.state.limit; i++) {
			strikes.push(<i key={i + "strike"} className="strike fa fa-times" aria-hidden="true"></i>)
		}

		let corrects = [];
		for (let i = 0; i < this.state.numCorrect; i++) {
			corrects.push(<i key={i + "strike"} className="correct green fa fa-circle-o" aria-hidden="true"></i>)
		}

		let buttons = [];
		if (this.state.numStrikes === this.state.limit) {
			buttons.push(<button id="btnRestart" key="btnRestart" onClick={this.restart.bind(this)}>Restart</button>)
		} else {
			buttons.push(<button id="btnCheck" key="btnCheck" onClick={this.validate.bind(this)}>Submit</button>);
			buttons.push(<button id="btnReset" key="btnReset" onClick={this.reset.bind(this)}>Reset</button>);
			buttons.push(<button id="btnGiveUp" key="btnGiveUp" onClick={this.giveUp.bind(this)}>Give Up</button>);
		}
		// console.log(self.state);
		return (
			<div className="BasicDecryptionApp">
			<div className="status">{this.state.status}</div>
				<div className="marks">
					<div className="corrects">{corrects}</div>
					<div className="strikes">{strikes}</div>
				</div>

				<div className="encrypted">
					{this.state.wordArr.map((c, idx) => {
						c = this.rotateCharacter(c, this.state.rotations[idx]);
						return (
							<CharacterBox key={"c" + idx}
								idx={idx}
								onUp={self.onUp.bind(self, idx)}
								onDown={self.onDown.bind(self, idx)}
								character={c}
							/>
						)
					})}
				</div>
				<div className="buttons">
					{buttons}
				</div>
			</div>
		);
	}
}

export default BasicDecryptionApp;
