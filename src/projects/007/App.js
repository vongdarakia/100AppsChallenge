import React, { Component } from 'react';
import './App.css';

const styles = {
  transition: 'all .5s ease-out'
}

const colors = ["#D91E18", "#EF4836", "#663399", "#913D88",
  "#446CB3", "#C5EFF7", "#22A7F0", "#1E8BC3", "#34495E",
  "#87D37C", "#90C695", "#26A65B", "#36D7B7", "#3FC380",
  "#E9D460", "#26C281", "#F5AB35", "#FDE3A7", "#F9BF3B"];

class ColorBox extends Component {
  constructor() {
    super();
    this.state = {
      color: this.getRandomColor()
    }
  }

  getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  toggle() {
    let newColor = this.getRandomColor();
    while (newColor === this.state.color) {
      newColor = this.getRandomColor();
    }
    this.setState({
      color: newColor
    });
  }

  render() {
    return (
      <div onClick={this.toggle.bind(this)}
        className="color-box"
        style={
          {...styles, backgroundColor: this.state.color}
        }></div>
    );
  }
}

class SimpleAnimationApp extends Component {
  constructor() {
    super();
    this.state = {
      width: [0,0,0,0],
      height: [0,0,0,0]
    }
  }

  render() {
    return (
      <div className="SimpleAnimationApp">
        {this.state.height.map((y, i1) => {
          return this.state.width.map((x, i2) => (
            <ColorBox key={i1 + "-" + i2}>{i1 + "-" + i2}</ColorBox>
          ));
        })}
      </div>
    );
  }
}

export default SimpleAnimationApp;
