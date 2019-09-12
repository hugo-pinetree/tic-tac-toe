import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import { ReactComponent } from '*.svg';



  
class Square extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hovered: false
        }
    }
    handleOnMouseOver(){
        this.setState({
            hovered: true
        })
       
    }
    handleOnMouseOut(){

        
        this.setState({
            hovered: false
        })
     
    }
    render(){
        
        var player;
        var classN;
        if(this.state.hovered && this.props.value == null && this.props.gameOn){
            classN = 'squareHover';
            if(this.props.currentPlayer){
                player = 'X';
            }
            else{
                player = 'O';
            }
        }
        else{
            classN = 'square';
            player = this.props.value;
        }
        

        return(
        <button 
            className= {classN}
            onClick= {() => this.props.onClick()}
            onMouseOver={()=> this.handleOnMouseOver()}
            onMouseOut={()=>this.handleOnMouseOut()}  
        >
                {player}
        </button>
        );
    }
}
class Board extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            gameOn: true
           
        };
    }  
    handleClick(i){
        const squares = this.state.squares.slice(); //copies the array
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X':'O';
        this.setState({
          squares: squares,  
          xIsNext: !this.state.xIsNext,
             //sets the prev state to the new state
        }); 
    }
    handleGameOver(){
        if(this.state.gameOn){ //make sure gameOn is true so that we dont continually change the state
            this.setState({gameOn:false}) ;
        }
    }
    
    renderSquare(i){
            return ( //the paraenthesis are there for readability
                <Square 
                  value= {this.state.squares[i]}
                  gameOn={this.state.gameOn}
                  currentPlayer={this.state.xIsNext}
                  onClick={()=> this.handleClick(i)}
                  
                />
            );  
        }
       
    render() {
        let winner;  
        let status;
        winner = calculateWinner(this.state.squares);
        if (winner){
            this.handleGameOver(); 
            status = 'Winner: ' + winner;
        }
        else{
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');   
        }
      return (
        <div>
          <div className="status">{status}</div>
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
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
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );