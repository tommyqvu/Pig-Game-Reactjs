import React from 'react';
import './App.css';

import PlayerCard from './components/PlayerCard';
import Dice from './components/Dice';

const defaultState = {
  activePlayer: 1,
  playerOneTotal: 0,
  playerTwoTotal: 0,
  roundScore: 0,
  diceOne: null,
  diceTwo: null,
  gameIsPlaying: true,
  winningScore: 50,
  lastDice: 0,
  winner: null,
};

class App extends React.Component {
  state = {
    ...defaultState,
  };
  nextPlayer() {
    let { activePlayer } = this.state;
    activePlayer === 1 ? (activePlayer = 2) : (activePlayer = 1);
    this.setState({ activePlayer, roundScore: 0, lastDice: 0 });
  }
  onRoll() {
    const { gameIsPlaying } = this.state;
    if (gameIsPlaying) {
      let roundScore = 0;
      //Run a number
      const diceOne = Math.floor(Math.random() * 6 + 1);
      const diceTwo = Math.floor(Math.random() * 6 + 1);
      // Set state and display number
      if (diceOne !== 1 && diceTwo !== 1) {
        roundScore += diceOne + diceTwo;
      } else {
        this.nextPlayer();
      }
      return this.setState({ diceOne, diceTwo, roundScore });
    }
  }
  onWinningScoreChange(e) {
    this.setState({ winningScore: e.target.value });
  }
  onHold() {
    let { gameIsPlaying } = this.state;
    if (gameIsPlaying) {
      let {
        playerOneTotal,
        playerTwoTotal,
        roundScore,
        activePlayer,
        winningScore,
        winner,
      } = this.state;
      // Add current score to total score
      activePlayer === 1
        ? (playerOneTotal += roundScore)
        : (playerTwoTotal += roundScore);
      //Check for winner
      if (playerOneTotal >= winningScore) {
        winner = 1;
        gameIsPlaying = false;
      } else if (playerTwoTotal >= winningScore) {
        winner = 2;
        gameIsPlaying = false;
      } else {
        this.nextPlayer();
      }
      this.setState({ playerOneTotal, playerTwoTotal, winner, gameIsPlaying });
    }
  }
  initialize() {
    const { winningScore } = this.state;
    this.setState(prevState => ({
      ...prevState,
      ...defaultState,
      winningScore,
    }));
  }
  render() {
    const {
      activePlayer,
      playerOneTotal,
      playerTwoTotal,
      roundScore,
      diceOne,
      diceTwo,
      winningScore,
      winner,
    } = this.state;
    return (
      <div className='wrapper clearfix'>
        <PlayerCard
          totalScore={playerOneTotal}
          roundScore={roundScore}
          player={1}
          activePlayer={activePlayer}
          winner={winner}
        />
        <PlayerCard
          totalScore={playerTwoTotal}
          roundScore={roundScore}
          player={2}
          activePlayer={activePlayer}
          winner={winner}
        />
        <button className='btn-new' onClick={() => this.initialize()}>
          <i className='ion-ios-plus-outline' />
          New game
        </button>
        <button className='btn-roll' onClick={() => this.onRoll()}>
          <i className='ion-ios-loop' />
          Roll dice
        </button>
        <button className='btn-hold' onClick={() => this.onHold()}>
          <i className='ion-ios-download-outline' />
          Hold
        </button>
        <div className='win-score'>WINNING SCORE:
        <input
          type='number'
          className='win-score-input'
          value={winningScore}
          onChange={e => this.onWinningScoreChange(e)}
        /></div>
       
        <Dice diceNumber={diceOne} dice={1} />
        <Dice diceNumber={diceTwo} dice={2} />
      </div>
    );
  }
}

export default App;
