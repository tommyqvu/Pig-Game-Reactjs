import React from 'react';
import dice1 from '../assets/dice-1.png';
import dice2 from '../assets/dice-2.png';
import dice3 from '../assets/dice-3.png';
import dice4 from '../assets/dice-4.png';
import dice5 from '../assets/dice-5.png';
import dice6 from '../assets/dice-6.png';

class Dice extends React.Component {
  renderDice() {
    const { diceNumber, dice } = this.props;
    switch (diceNumber) {
      case null:
        return null;
      case 1:
        return <img src={dice1} alt='Dice' className={`dice dice-${dice}`} />;
      case 2:
        return <img src={dice2} alt='Dice' className={`dice dice-${dice}`} />;
      case 3:
        return <img src={dice3} alt='Dice' className={`dice dice-${dice}`} />;
      case 4:
        return <img src={dice4} alt='Dice' className={`dice dice-${dice}`} />;
      case 5:
        return <img src={dice5} alt='Dice' className={`dice dice-${dice}`} />;
      case 6:
        return <img src={dice6} alt='Dice' className={`dice dice-${dice}`} />;
      default:
        return null;
    }
  }
  render() {
    return <div>{this.renderDice()}</div>;
  }
}

export default Dice;
