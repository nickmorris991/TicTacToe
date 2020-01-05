import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
    let linePos;
    if (winner) {
      status = 'Winner: ' + winner.square;
      linePos = calculateLinePos(winner.position);
    } else if (draw) {
      status = 'Draw! Refresh to Play Again'
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // return board element
    if (winner) {
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
          <div>
            <Line 
              borderStyle = "dotted" 
              borderColor = "black" 
              borderWidth = {8} 
              x0 = {linePos.x0} y0={linePos.y0} 
              x1={linePos.x1} y1={linePos.y1}/>
          </div>
        </div>
      );
    } 
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

/* ***** Functions ***** */

function calculateDraw(squares) {
  if (squares.indexOf(null) > -1) {
    return false;
  } else {
    return true;
  }
}

function calculateLinePos(pos) {
  let lineCoordinates = {}
  lineCoordinates[[0, 1, 2]] = {x0: 65, y0: 190, x1: 590, y1: 190};
  lineCoordinates[[3, 4, 5]] = {x0: 65, y0: 390, x1: 590, y1: 390};
  lineCoordinates[[6, 7, 8]] = {x0: 65, y0: 590, x1: 590, y1: 590};
  lineCoordinates[[0, 3, 6]] = {x0: 135, y0: 130, x1: 135, y1: 630};
  lineCoordinates[[1, 4, 7]] = {x0: 335, y0: 130, x1: 335, y1: 650};
  lineCoordinates[[2, 5, 8]] = {x0: 535, y0: 130, x1: 535, y1: 650};
  lineCoordinates[[0, 4, 8]] = {x0: 65, y0: 125, x1: 590, y1: 650};
  lineCoordinates[[2, 4, 6]] = {x0: 580, y0: 130, x1: 110, y1: 630};
  return lineCoordinates[pos];
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