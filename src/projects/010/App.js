import React, { Component } from 'react';
import './App.css';

class NotToDoListApp extends Component {
	constructor() {
		super();
		this.state = {
			currItemName: "",
			items: []
		};
	}

	addToList() {
		let items = this.state.items;

		if (this.state.currItemName.length > 0) {
			items.push(this.state.currItemName);
			this.setState({items: items, currItemName: ""});
		}
	}

	removeFromList(idx) {
		let items = this.state.items;
		items.splice(idx, 1);
		this.setState({items: items});
	}

	handleChange(event) {
		this.setState({ currItemName: event.target.value });
	}

	onEnter(event) {
		if (event.key === "Enter") {
			this.addToList();
		}
	}

	render() {
		let list = (<div className="notes">Please add something that you shouldn't do. Ex. "Light my cat on fire."</div>);

		if (this.state.items.length > 0) {
			list = this.state.items.map((item, idx) => (
				<li key={idx} onClick={() => { this.removeFromList(idx); }}>{item}</li>
			));
		}
		return (
			<div className="NotToDoListApp">
				<h2>Not-to-do List</h2>
				<div className="input-section">
					<input value={this.state.currItemName}
						onChange={this.handleChange.bind(this)}
						onKeyPress={this.onEnter.bind(this)}
						placeholder="What not to do?"
					/>

				</div>

				<ul className="list">
					{list}
				</ul>
			</div>
		);
	}
}

export default NotToDoListApp;
