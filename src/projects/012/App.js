import React, { Component } from 'react';
import './App.css';

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class DayCountDownApp extends Component {
	constructor() {
		super();
		this.state = {
			yearsTill: 0,
			monthsTill: 0,
			daysTill: 0,
			hoursTill: 0,
			minsTill: 0,
			secsTill: 0,
			countDown: false,
			isPast: false,
			isInvalid: false,
			timer: null,
			dateFormat: ""
		}
	}

	onChange(event) {
		let year = document.getElementById("year").value;
		let month = document.getElementById("month").value;
		let day = document.getElementById("day").value;

		if (year === "" || month === "" || day === "" ||
			year <= 0 || month <= 0 || day <= 0) {
			this.setState({ isInvalid: true });
			return;
		}

		let d = new Date(`${month}/${day}/${year}`);
		let now = new Date();

		if (isNaN( d.getTime() )) {
			this.setState({ isInvalid: true, dateFormat: "" });
			return 0;
		}

		let dd = d.getDate();
		let mm = d.getMonth();
		let yyyy = d.getFullYear();
		let dateFormat = months[mm] + " " + dd + ", " + yyyy;

		let diff = d.getTime() - now.getTime();
		let isPast = diff < 0;
		if (isPast) {
			diff = diff * -1;
		}

		let daysTill = Math.floor(diff / 86400000);
		diff -= daysTill * 86400000;
		let hoursTill = Math.floor(diff / 3600000);
		diff -= hoursTill * 3600000;
		let minsTill = Math.floor(diff / 60000);
		diff -= minsTill * 60000;
		let secsTill = Math.floor(diff / 1000);
		diff -= secsTill * 1000;

		this.setState({
			daysTill: daysTill,
			hoursTill: pad(hoursTill, 2),
			minsTill: pad(minsTill, 2),
			secsTill: pad(secsTill, 2),
			countDown: true,
			isPast: isPast,
			isInvalid: false,
			dateFormat: dateFormat
		});
		if (d.getTime() - now.getTime() === 0) {
			alert("Wow. You've actually waited this long? Here's a cookie.");
		}
	}

	componentDidMount() {
		document.getElementById("year").value = 2017;
		document.getElementById("month").value = 7;
		document.getElementById("day").value = 7;
		this.onChange();
		this.setState({
			timer: setInterval(() => {
				this.onChange();
			}, 1000)
		});
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	render() {
		let countDown = "";
		let comment = "";
		let commentStyle = this.state.isPast ? "past" : "future";

		let day = document.getElementById("day") ? document.getElementById("day").value : null;
		let month = document.getElementById("month") ? document.getElementById("month").value : null;
		let year = document.getElementById("year") ? document.getElementById("year").value : null;

		let validDay = day && day > 0 && day <= 31 ? "" : "invalid";
		let validMonth = month && month > 0 && month <= 12 ? "" : "invalid";
		let validYear = year && year > 0 ? "" : "invalid";

		if (this.state.isInvalid) {
			countDown = `Type in a date to start the count down!`;
		}
		else if (this.state.countDown) {
			if (this.state.dateFormat.length > 0) {
				if (this.state.isPast) {
					comment = (<span>Has passed since <span className="date">{this.state.dateFormat}</span></span>);
				} else {
					comment = (<span>Until <span className="date">{this.state.dateFormat}</span></span>);
				}
			}

			if (this.state.daysTill > 0)
				countDown = `${this.state.daysTill} days, ${this.state.hoursTill}:${this.state.minsTill}:${this.state.secsTill}`;
			else
				countDown = `${this.state.hoursTill}:${this.state.minsTill}:${this.state.secsTill}`;
		}

		return (
			<div className="DayCountDownApp">
				<div className="inputs">
					<input id="year" className={validYear}
						type="number" placeholder="year"
						onChange={this.onChange.bind(this)}/>
					<input id="month" className={validMonth}
						type="number" placeholder="month"
						onChange={this.onChange.bind(this)}/>
					<input id="day" className={validDay}
						type="number" placeholder="day"
						onChange={this.onChange.bind(this)}/>
				</div>
				<div>
					<h2 className="count-down">{countDown}</h2>
					<h2 className={"comment " + commentStyle}>{comment}</h2>
				</div>
			</div>
		);
	}
}

export default DayCountDownApp;
