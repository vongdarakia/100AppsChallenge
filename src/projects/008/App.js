import React, { Component } from 'react';
import unirest from 'unirest';
import './App.css';

const styles = {
	position: 'relative'
}

class RandomQuotesApp extends Component {
	constructor() {
		super();
		let self = this;

		this.state = {
			quotes: null,
			left: 0,
			opacity: 100,
			transition: 'all .5s ease-out',
			isTransitioning: false
		}
		unirest.get("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10")
		.header("X-Mashape-Key", "wbyCsc5ChWmshvo4hUgvEMlE4Ro1p194zHsjsn3FiEwT7LIKgV")
		.header("Accept", "application/json")
		.end(function (result) {
			// To prevent error when switching through projects too fast.
			if (self.refs.exists)
				self.setState({ quotes: result.body });
		});
	}

	next() {
		let quotes = this.state.quotes;
		let self = this;

		if (!this.state.isTransitioning) {
			self.setState({ isTransitioning: true });
			this.fadeAway(() => {
				quotes.splice(0, 1);
				self.setState({ quotes: quotes, isTransitioning: false });
				if (this.state.quotes.length <= 5) {
					unirest.get("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10")
					.header("X-Mashape-Key", "wbyCsc5ChWmshvo4hUgvEMlE4Ro1p194zHsjsn3FiEwT7LIKgV")
					.header("Accept", "application/json")
					.end(function (result) {
						quotes = quotes.concat(result.body);
						self.setState({ quotes: quotes });
					});
				}
			});
		}
	}

	fadeAway(callback) {
		this.setState({ left: 300, opacity: 0, transition: 'all .5s ease-out' });
		setTimeout(() => {
			this.setState({ left: 0, opacity: 100, transition: 'opacity .5s ease-in' });
			callback();
		}, 1000);
	}

	render() {
		if (this.state.quotes === null || this.state.quotes.length === 0)
			return (<h2 ref="exists">Loading...</h2>);

		let quote = this.state.quotes[0];
		return (
			<div className="RandomQuotesApp" ref="exists">
				<div className="box-wrapper">
					<div className="quote-box"
						style={
							{
								...styles,
								left: this.state.left,
								opacity: this.state.opacity,
								transition: this.state.transition
							}
						}>
						<p className="quote">"{quote.quote}"</p>
						<p className="author">- {quote.author}</p>
					</div>
					<div className="btn-next-wrapper">
						<span
							className="btn-next"
							onClick={this.next.bind(this)}>
							Next Quote
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default RandomQuotesApp;
