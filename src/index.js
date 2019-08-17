import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

console.log("Rules of the game:")
console.log("* PLAYER ONE starts first ")
console.log("* Click 'ROLL DICE' to get dice numbers")
console.log("* The total of the dices will be your 'CURRENT' round score")
console.log("* Feel free to roll until you get your desired sum")
console.log("* BUT if you get a 1, you lose your 'CURRENT' round score AND your turn")
console.log("* Click 'HOLD' to add the 'CURRENT' round score and switch turn to your opponent")
console.log("* First to reach winning score wins!!!")
serviceWorker.unregister();
