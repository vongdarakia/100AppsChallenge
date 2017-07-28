import React, { Component } from 'react';
import './App.css';

class Menu extends Component {
	constructor() {
		super();
		this.state = {
			index: 0
		}
	}

	changePage(idx) {
		this.setState({ index: idx });
	}

	render() {
		let self = this;

		return (
			<div>
				<div className="menu-header">
					<ul>
					{this.props.items.map((item, idx) => {
						let style = "";
						if (self.state.index === idx) {
							style = "focus";
						}
						return (<li onClick={this.changePage.bind(this, idx)}
						key={idx} className={style}>{item}</li>)
					})}
					</ul>
				</div>
				<div className="menu-page">
					<p>This is a {this.props.items[this.state.index]} page.</p>
				</div>
			</div>
		);
	}
}
class NavigationMenuApp extends Component {
  render() {
    return (
      <div className="NavigationMenuApp">
        <Menu items={["Home", "About", "Contact"]}></Menu>
      </div>
    );
  }
}

export default NavigationMenuApp;
