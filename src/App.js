import React from 'react';
import './App.css';

import PlayerCard from './components/PlayerCard';
import Dice from './components/Dice';

const defaultState = {
  activePlayer: 0,
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
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    this.setState({ activePlayer, roundScore: 0, lastDice: 0 });
  }
  onRoll() {
    const { gameIsPlaying } = this.state;
    if (gameIsPlaying) {
      let roundScore = 0;
      //Run a number
      console.log('Roll dice!');
      const diceOne = Math.floor(Math.random() * 6 + 1);
      const diceTwo = Math.floor(Math.random() * 6 + 1);
      // Set state and display number
      if (diceOne !== 1 && diceTwo !== 1) {
        roundScore += diceOne + diceTwo;
      } else {
        console.log('Got one!');

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
      activePlayer === 0
        ? (playerOneTotal += roundScore)
        : (playerTwoTotal += roundScore);
      console.log('Player one ' + playerOneTotal);
      console.log('Player two ' + playerTwoTotal);
      //Check for winner
      if (playerOneTotal >= winningScore) {
        console.log('player one won');
        winner = 0;
        gameIsPlaying = false;
      } else if (playerTwoTotal >= winningScore) {
        console.log('player one won');
        winner = 1;
        gameIsPlaying = false;
      } else {
        console.log('nobody won yet');
        this.nextPlayer();
      }
      this.setState({ playerOneTotal, playerTwoTotal, winner, gameIsPlaying });
    }
  }
  initialize() {
    const {winningScore} = this.state
    this.setState(prevState=>({
      ...prevState,...defaultState, winningScore
    }))
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
          player={0}
          activePlayer={activePlayer}
          winner={winner}
        />
        <PlayerCard
          totalScore={playerTwoTotal}
          roundScore={roundScore}
          player={1}
          activePlayer={activePlayer}
          winner={winner}
        />
        <button className='btn-new' onClick={()=>this.initialize()}>
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
        <input
          type='number'
          placeholder='Winning score'
          className='win-score'
          value={winningScore}
          onChange={e => this.onWinningScoreChange(e)}
        />
        <Dice diceNumber={diceOne} dice={1} />
        <Dice diceNumber={diceTwo} dice={2} />
      </div>
    );
  }
}

export default App;


// document
// .querySelector('.player-' + activePlayer + '-panel')
// .classList.add('winner');
// document
// .querySelector('.player-' + activePlayer + '-panel')
// .classList.remove('active');
