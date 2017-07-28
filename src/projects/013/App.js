import React, { Component } from 'react';
import './App.css';

class DiceRollApp extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      dice: [0],
      numDice: 1
    }

  }

  componentDidMount() {
    this.rollDice();
  }

  rollDice() {
    let rand = 0;
    let total = 0;
    let dice = [];

    for (var i = this.state.numDice - 1; i >= 0; i--) {
      rand = Math.floor(Math.random() * 6) + 1;
      total += rand;
      dice.push(rand);
    }
    this.setState({ dice: dice, total: total });
  }

  handleChange(key) {
    this.setState({numDice: key.target.value});
  }

  render() {
    return (
      <div className="DiceRollApp">
        <div className="total">
          {this.state.total}
        </div>
        <div className="dice">
          {this.state.dice.map((item, key) => (
            <div className="die" key={key}>
              <img src={"img/proj-013/"+item+".png"} alt=""></img>
            </div>
          ))}
        </div>
        <div>
        # Dice: <input type="number" value={this.state.numDice} onChange={this.handleChange.bind(this)}/>
        </div>
        <button className="roll" onClick={this.rollDice.bind(this)}>Roll</button>
      </div>
    );
  }
}

export default DiceRollApp;
