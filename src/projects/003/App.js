import React, { Component } from 'react';
import './App.css';

class IncomeBox extends Component {
	constructor() {
		super();
		this.state = {
			qty: 0
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	componentDidMount() {
		if (this.props.cost === 0) {
			this.setState({ qty: 1 });
		}
	}

	render() {
		let income = this.props.income * (this.state.qty > 0 ? this.state.qty : 1);
		let incomeEl = (<p className="income"><span className="green">${income}</span> per {this.props.time/1000}s</p>);
		let cost = (<p className="cost"><span className="red">Cost: ${this.props.cost}</span></p>);
		let btnBuy = "";
		let disabledBuy = "";
		let disabledClick = "";

		let money = this.props.getMoney();
		let clickOnly = this.props.time === 0;
		let hasItem = this.state.qty > 0;
		let canBuy = money >= this.props.cost;

		if (!canBuy || (clickOnly && hasItem)) {
			disabledBuy = "disabled";
		}

		if (!hasItem) {
			disabledClick = "disabled";
		}

		if (this.props.cost === 0 || this.props.time === 0) {
			incomeEl = "";
		}

		if (this.props.cost === 0) {
			cost = "";
		} else {
			btnBuy = (
				<div className={disabledBuy + " btn-buy"}
					onClick={this.buy.bind(this)}>
					<p className="buy">Get</p>
					{cost}
				</div>
			);
		}
		return (
			<div className="box-income" >
				<div className={disabledBuy + " col-left"}>
					{btnBuy}
				</div>
				<div className={disabledClick + " col-right"}>
					<div className={disabledClick + " btn-click"}
						onClick={this.clickForCash.bind(this)}>
						<p className="name">{this.props.name}</p>
						{incomeEl}
						<p className="click-income"><span className="green">${this.props.income}</span> per click </p>
					</div>
				</div>
			</div>
		);
	}

	buy() {
		let money = this.props.getMoney();
		let clickOnly = this.props.time === 0;
		let hasItem = this.state.qty > 0;
		let canBuy = money >= this.props.cost;

		if (!canBuy || (clickOnly && hasItem)) {
			return;
		}

		if (this.props.takeFromCash(this.props.cost)) {
			if (this.props.time === 0) {
				this.setState({qty: this.state.qty + 1});
				return;
			}

			if (!this.timer) {
				this.timer = setInterval(this.tick.bind(this), this.props.time);
			}

			this.setState({qty: this.state.qty + 1});
		}

		if (this.props.name === "Hire Akia") {
			alert("Thank you for hiring me! My email is vongdarakia@gmail.com. Please send me a nice offer :)");
		}
	}

	clickForCash() {
		if (this.state.qty > 0)
			this.props.addToCash(this.props.income);
	}

	tick() {
		this.props.addToCash(this.props.income * this.state.qty);
	}
}

class MoneyTickerApp extends Component {
	constructor() {
		super();
		this.state = {
			income: 0,
			cash: 0
		}

		this.incomeBoxes = [
			{income: 1, time: 0, cost: 0, name: "Beg for money"},
			{income: 2, time: 0, cost: 10, name: "Sell cheap coffee"},
			{income: 12, time: 2000, cost: 100, name: "Freelance Programmer"},
			{income: 80, time: 3000, cost: 1998, name: "Work for Google"},
			{income: 1337, time: 4000, cost: 24000, name: "Start a company"},
			{income: 2147483647, time: 5000, cost: 314159, name: "Hire Akia"},
		];
	}

	componentDidMount() {
		this.timer = setInterval(this.tick.bind(this), 500);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		let self = this;
		return (
			<div className="MoneyTickerApp">
				<div className="cash">${this.state.cash}</div>
				{this.incomeBoxes.map((item, idx) => (
					<IncomeBox
						key={idx}
						income={item.income}
						time={item.time}
						cost={item.cost}
						name={item.name}
						getMoney={self.getMoney.bind(self)}
						addToCash={self.addToCash.bind(self)}
						takeFromCash={self.takeFromCash.bind(self)}/>
				))}

			</div>
		);
	}

	getMoney() {
		return this.state.cash;
	}

	addToCash(add=0) {
		this.setState({ cash: this.state.cash + add });
	}

	takeFromCash(take=0) {
		if (this.state.cash - take >= 0) {
			this.setState({ cash: this.state.cash - take });
			return true;
		}
		return false;
	}

	tick() {
		this.setState({ cash: this.state.cash + this.state.income });
	}
}

export default MoneyTickerApp;
