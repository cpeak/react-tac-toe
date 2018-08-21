import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className={"c-square " + props.clicked + " " + props.value } onClick={props.onClick}>
      <span>{props.value}</span>
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      clicked: Array(9).fill('unchecked'),
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const clicked = this.state.clicked.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    clicked[i] = this.state.clicked ? 'checked': 'unchecked';
    this.setState({
      clicked: clicked,
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        clicked={this.state.clicked[i]}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "The winner is " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div className="c-game-container">
        <h2 className="c-status">{status}</h2>
        <div className="c-board">
          <div className="c-board__row first-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="c-board__row second-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="c-board__row third-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="c-tabletop">
        <Board />
        <div className="c-game-info-bar">
          <h2 className="heading">Status</h2>
          <p>{/* status */}</p>
          <h2 class="heading">To Do</h2>
          <ul>
            <li>Stop when game is won</li>
            <li>Prevent clicking on alreay picked squares</li>
            <li>Class swapping onClick</li>
          </ul>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares [a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
