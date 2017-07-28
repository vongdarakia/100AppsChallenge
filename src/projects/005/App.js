import React, { Component } from 'react';
import './App.css';

class Item extends Component {
	clickHandler() {
		this.props.addToOrder(this.props.item);
	}
	render() {
		let item = this.props.item;
		return (
			<div className="menu-item" onClick={this.clickHandler.bind(this)}>
				<p className="menu-item-name">{item.name}</p>
				<p className="menu-item-price">${item.price.toFixed(2)}</p>
			</div>
		);
	}
}

class LineItem extends Component {
	clickHandler() {
		this.props.removeFromOrder(this.props.item);
	}
	render() {
		let item = this.props.item;
		return (
			<p className="line-item" onClick={this.clickHandler.bind(this)}>
				<span className="item-total">
					$ {(item.price * item.qty).toFixed(2)}
				</span>
				<span className="item-qty">
					$ {item.price} x {item.qty}
				</span>
				<span className="item-name">
					{item.name}
				</span>
			</p>
		);
	}
}

class Menu extends Component {
	render() {
		let menu = this.props.menu;
		return (
			<div className="Menu">
				<div className="menu-items">
					<div className="entrees">
						<h2 className="menu-sub-header">Entrée</h2>
						{menu.entrees.map((item, idx) => (
							<Item item={item} key={idx} addToOrder={this.props.addToOrder}/>
						))}
					</div>
					<div className="sides">
						<h2 className="menu-sub-header">Sides</h2>
						{menu.sides.map((item, idx) => (
							<Item item={item} key={idx} addToOrder={this.props.addToOrder}/>
						))}
					</div>
					<div className="drinks">
						<h2 className="menu-sub-header">Drinks</h2>
						{menu.drinks.map((item, idx) => (
							<Item item={item} key={idx} addToOrder={this.props.addToOrder}/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

class MiniMenuApp extends Component {
	constructor() {
		super();
		this.state = {
			items: {}
		}
	}

	addToOrder(item) {
		let items = this.state.items;

		if (item.name in items) {
			items[item.name].qty += 1;
		} else {
			let copy = Object.assign({}, item);

			items[item.name] = copy;
			items[item.name].qty = 1;
		}
		this.setState({ items: items });
	}

	removeFromOrder(item) {
		let items = this.state.items;

		if (item.name in items) {
			items[item.name].qty -= 1;
			if (items[item.name].qty <= 0)
				delete items[item.name];
			this.setState({ items: items });
		}
	}

	order() {
		delete this.state.items;
		this.setState({ items: {} });
		alert("Your order will come shortly! If not, then it did in another universe.");
	}

	render() {
		let total = 0;
		let items = this.state.items;
		let menu = this.props.menu;

		Object.keys(items).map((name) => {
			total += items[name].qty * items[name].price;
			return 0;
		});

		let totalEl = (<p className="order-total">Please select an item from the menu</p>);
		if (Object.keys(items).length > 0) {
			totalEl = (
				<div>
					<hr />
					<p className="order-total">${ total.toFixed(2) } </p>
					<div className="btn-order" onClick={this.order.bind(this)}>Order</div>
				</div>
			);
		}
		return (
			<div className="MiniMenuApp">
				<h1 className="MiniMenuApp-header">Welcome to Simple Concepts</h1>
				<h2 className="MiniMenuApp-sub-header">A restaurant made simple</h2>
				<Menu menu={menu} addToOrder={this.addToOrder.bind(this)}/>
				<div className="info">
					<div className="order-items">
					{Object.keys(items).map((name, i) => (
						<LineItem key={i}
							item={items[name]}
							removeFromOrder={this.removeFromOrder.bind(this)} />
					))}
					</div>
					{ totalEl }
				</div>
			</div>
		);
	}
}

export default MiniMenuApp;
