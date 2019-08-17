import React from 'react';

const PlayerCard = ({ activePlayer, totalScore, roundScore, player , winner}) => (
  <div className={`player-panel ${activePlayer === player && winner !== player? 'active' : null} ${winner === player? "winner":null}`} >
    <div className='player-name'>{player === winner ? "Winner!": `Player ${player}`}</div>
    <div className='player-score'>{totalScore}</div>
    <div className='player-current-box'>
      <div className='player-current-label'>Current</div>
      <div className='player-current-score'>{activePlayer === player ? roundScore : 0}</div>
    </div>
  </div>
);

export default PlayerCard;
