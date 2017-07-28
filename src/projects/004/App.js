import React, { Component } from 'react';
import './App.css';

let movies = [
	"Interstellar",
	"Inception"
];

let interests = [
	"ReactJS",
	"Tesla",
	"Facebook",
	"Sustainability",
	"Full Stack Development",
	"Open-source Education",
];

let idols = [
	"Elon Musk",
];

let shows = [
	"Rick and Morty",
	"Ghost in the Shell: Stand Alone Complex",
	"Hunter x Hunter",
	"Sense8",
	"Cowboy Bebop",
	"Avatar: The Last Airbender",
];

let hobbies = [
	"Kendo",
	"Rockclimbing",
];

let education = [
	"42",
	"Rochester Institute of Technology"
];

let info = {
	"Movie": movies,
	"Interest": interests,
	"Idol": idols,
	"Show": shows,
	"Hobby": hobbies,
	"Education": education,
}

let items = [];

for (var key in info) {
	if (info.hasOwnProperty(key)) {
		let vals = info[key];
		for (var itemKey in vals) {
			if (vals.hasOwnProperty(itemKey)) {
				items.push({ type: key, val: vals[itemKey]})
			}
		}
	}
}

class ListSearchApp extends Component {
	constructor() {
		super();
		this.state = {
			searchString: "",
			items: items
		}
	}

	handleChange(e) {
		this.setState({searchString:e.target.value});
	}

	render() {
		let searchString = this.state.searchString.trim().toLowerCase();
		let items = this.state.items;

		if (searchString.length > 0) {
			items = items.filter((item) => {
				return item.val.toLowerCase().match( searchString );
			});
		}

		return (
			<div className="ListSearchApp">
				<div className="input-wrapper">
					<h2 className="header-title">Things About Me</h2>
					<input
						className="input-search"
						type="text"
						placeholder="Search"
						value={this.state.searchString}
						onChange={this.handleChange.bind(this)}/>
				</div>
				<ul className="items">
					{items.map((item, key) => (
						<li className="item" key={key}>
							<span className={"item-type " + item.type}>{item.type}</span>
							<span className="item-val">{item.val}</span>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default ListSearchApp;
