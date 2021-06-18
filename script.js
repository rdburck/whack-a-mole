const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
let result = 0;
let currentTime = 60;
let timerId = null;

function randomSquare() {
    //the follwoing function runs while currentTime > 0
    //adds and removes the mole from the square
    if(currentTime != 0) {
        square.forEach(className => {
            className.classList.remove('mole');
        })
        //Math.floor returns the largest integer less than or equal to the specified number
        //Math.random returns a random number between 0 and 1.
        //So we use Math.floor and multiply by 9 so that we return an integer to help move the mole
        //to random position.
        let randomPosition = square[Math.floor(Math.random() * 9)];
        randomPosition.classList.add('mole');
    
        //assign the id of the randomPosition to hitPosition for us later
        hitPosition = randomPosition.id;
    }
    
}
//adds the score when user hits the mole
square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition) {
            result = result + 1;
            score.textContent = result;
        }
    })
})
//controls how quickly the mole moves (or how frequently randomSquare runs)
function moveMole() {
        let timerId = null;
        //performs randomSquare function every 1000ms or 1s
        timerId = setInterval(randomSquare, 1000);
}

moveMole();

//controls our timer and makes sure that our time id displayed counting down.
//uses countDownTimerId to count down our timer.
function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;
    if(currentTime === 0) {
        //clearInterval clears a timer set with setInterval function
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        //alert('Game Over! Your final score is ' + result);
        restartButton();
    }
}
//uses the countDown funnction to run the countDown function every second
let countDownTimerId = setInterval(countDown, 1000);

var rButton = document.createElement('BUTTON');
rButton.innerText = 'Try again';
let heading = document.querySelector('#heading');

//a function that allows us to restart our game
function restartButton() {
    if(currentTime <= 0) {
        heading.appendChild(rButton);
        rButton.addEventListener('click', () => {
            location.reload();
        })
    }
}