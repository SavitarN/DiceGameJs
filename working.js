'use strict';

let playerEl0 = document.querySelector('.player--0');
let playerEl1 = document.querySelector('.player--1');
let rollDice = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let newGame = document.querySelector('.btn--new');
let score = document.querySelector('.score');
let currentEl0 = document.getElementById('current--0');
let currentEl1 = document.getElementById('current--1');
let dice = document.querySelector('.dice');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');


let createdScoreVariable;
let activePlayer;
let playerScore;//holds the score of both the player at the same time//
// to switch the player//

let playing;//state variable that tells game is playing or not//


//initializing the game function //
const initialization = function () {
    createdScoreVariable = 0;
    activePlayer = 0;
    playerScore = [0, 0];
    playing = true;

    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;
    currentEl0.textContent = 0;
    currentEl1.textContent = 0;

    dice.classList.add('hidden');
    playerEl0.classList.remove('player--winner');
    playerEl1.classList.remove('player--winner');
    playerEl0.classList.add('player--active');
    playerEl1.classList.remove('player--active');


}

initialization();
const switchPlayer = function () {

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    createdScoreVariable = 0;//player switch garda yelai 0 na rakhyo vane feri purano player ko score ni jodenxa//
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerEl0.classList.toggle('player--active');
    playerEl1.classList.toggle('player--active');

};


dice.classList.add('hidden');//dice lai hide gareko//
rollDice.addEventListener('click', function () {
    if (playing) {

        //number is being generated randomly//
        const diceNumber = Math.trunc(Math.random() * 6) + 1;

        dice.src = `dice-${diceNumber}.png`;
        dice.classList.remove('hidden');//dice lai show gareko//

        if (diceNumber != 1) {
            createdScoreVariable += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = createdScoreVariable;
        }
        else {
            switchPlayer();//edi one aayo dice number vane switch gardene//
        }
    }


});

//hold dabaesake paxi //
hold.addEventListener('click', function () {

    if (playing) {
        playerScore[activePlayer] += createdScoreVariable;
        document.getElementById(`score--${activePlayer}`).textContent = playerScore[activePlayer];
        //player has won the game so lets finish it//
        if (playerScore[activePlayer] >= 20) {
            playing = false;//kina vane game jitesakyo//
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        }

        else {
            switchPlayer();
        }
    }
    //reset the game//

    newGame.addEventListener('click', initialization);//we can passed the functoin in another function . we donot call the initialization function its js that calls it automatically//

});