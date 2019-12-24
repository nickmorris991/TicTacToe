// basic imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// additional styling libraries
import {Line} from 'react-lineto';

function Square(props) {
  return (
    <button className = "square" onClick ={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const draw = calculateDraw(this.state.squares);

    // line specifications
    const ColoredLine = ({ color }) => (
      <hr
        style = {{
          color: color,
          backgroundColor: color,
          height: 5
        }}
      />
    );

    // determine status
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
      console.log(winner);
    } else if (draw) {
      status = 'Draw! Refresh to Play Again'
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // return board element
    return (
      <div>
        <div className="status">{status}</div>
        <ColoredLine color="rgb(103, 226, 109)"/>        
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        {/* pass down winning cordinates to display */}
        {/* goal: visualization / animation practice */}
        <div>
          <Line 
            borderStyle = "dotted" 
            borderColor = "black" 
            borderWidth = {8} 
            x0 = {65} y0={125} 
            x1={590} y1={650}/>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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

function calculateDraw(squares) {
  if (squares.indexOf(null) > -1) {
    return false;
  } else {
    return true;
  }
}

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
    let [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { 
        square: squares[a],
        position: lines[i]
      }; 
    } 
  }
  return null;
}