import React, { Component } from 'react';
import './App.css';
import commonWords from './1000.json';

var words = [];

for (var i = 0; i < commonWords.length; i++) {
	if (commonWords[i].length > 2) {
		words.push(commonWords[i].toUpperCase());
	}
}

class TypingGameApp extends Component {
	constructor() {
		super();

		let word = this.getNewWord();
		let letters = {};
		let letterList = [];
		let self = this;

		for (var i = 0; i < word.length; i++) {
			letterList.push(word[i]);
			letters[word[i]] = true;
		}

		this.state = {
			letters: letters,
			letterList: letterList,
			score: 0,
			streak: 0,
			multiplier: 1,
			// Have to do it this way otherwise the program will have a hard
			// time removing the event listener.
			keyHandler: self.handleKeyup.bind(this)
		}
	}

	componentDidMount() {
		window.addEventListener("keyup", this.state.keyHandler);
	}

	componentWillUnmount() {
		window.removeEventListener("keyup", this.state.keyHandler);
	}

	handleKeyup(e) {
		const {keyCode} = e;
		const letter 	= `${String.fromCharCode(keyCode)}`;

		if (!isAlphaNumeric(keyCode)) {
			console.log(letter);
			return;
		}
		const {letters, letterList} = this.state;
		const hasLetter = letters[letter];
		let newLetters = {...letters};
		let newStreak = this.state.streak;
		let newMul = this.state.multiplier;
		let newScore = this.state.score;

		if (hasLetter) {
			delete newLetters[letter];
			for (let i = 0; i < letterList.length; i++) {
				if (letterList[i] === letter) {
					letterList.splice(i, 1);
					i--;
					newScore += 1 * newMul;
				}
			}
		} else {
			newLetters[letter] = true;
			letterList.push(letter);
			newStreak = 0;
			newMul = 1;
			newScore -= 1;
		}

		if (letterList.length === 0) {
			// newLetters = []
			// this.setState({letters: newLetters, });
			let newWord = this.getNewWord();
			for (let i = 0; i < newWord.length; i++) {
				letterList.push(newWord[i]);
				newLetters[newWord[i]] = true;
			}
			newStreak++;
			if (newStreak !== 0 && newStreak % 5 === 0) {
				console.log("streak " + newStreak);
				if (newMul < 4)
					newMul *= 2;
			}
		}

		this.setState({
			letters: newLetters,
			letterList: letterList,
			streak: newStreak,
			multiplier: newMul,
			score: newScore
		});
	}

	getNewWord() {
		let randomIdx = Math.floor((Math.random() * words.length));
		return words[randomIdx];
	}

	render() {
		return (
			<div className="TypingGameApp" ref="exist">
				<div className="container">
					<div className="info">
						<div className="score">{this.state.score}</div>
						<div className="multiplier">multipler {this.state.multiplier}</div>
						<div className="streak">streak {this.state.streak}</div>
					</div>
					<div className="letters">
						{this.state.letterList.map((letter, key) => {
							return (<span key={key} className="letter">{letter}</span>);
						})}
					</div>
					<div className="explanation">
						Type all the letters!!! Go go go!
					</div>
				</div>
			</div>
		);
	}
}

function isAlphaNumeric(keyCode) {
	return (48 <= keyCode && keyCode <= 57) || (65 <= keyCode && keyCode <= 90);
}

export default TypingGameApp;
