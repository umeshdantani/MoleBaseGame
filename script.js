let scoreH2 = document.getElementById('score');
let timeleftH2 = document.getElementById('timeLeft');
let startNewGameButton = document.getElementById('startNewGame');
let pauseGameButton = document.getElementById('pauseGame');
let squares = document.querySelectorAll('.square');
let gameMusic = new Audio("/assets/gameMusic.mp3");
let hitMusic = new Audio("/assets/hitmusic.mp3");
let score=0;
let timeleft=60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

function randomMole(){
    squares.forEach(square=>{
        square.classList.remove('mole');
    })
     hitPosition = Math.floor(Math.random()*squares.length)
    squares[hitPosition].classList.add('mole');
}
randomMole();

function countDown(){
    timeleft--;
    if(timeleft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
    }else{
        timeleftH2.innerHTML = `Your time Left : ${timeleft}`;
    }
}
countDown();

squares.forEach(square=>{
    square.addEventListener('mousedown',()=>{
        if(timerId != null){
            if(square.id == hitPosition){
                hitMusic.play();
                // setTimeout(()=>{
                //     hitMusic.pause();
                // },1200)
                score++;
                scoreH2.innerHTML = `Your score : ${score}`;
                hitPosition = null;
            }
        }
    })
})

function startGame(){
    score=0;
    timeleft=60;
    scoreH2.textContent ='Your score : 0';
    timeleftH2.textContent = 'Your time Left : 60';
    pauseGameButton.style.display = 'inline-block';
    gameMusic.play();
    timerId = setInterval(randomMole,1000);
    randomMoleId =setInterval(countDown,1000);
}

function pauseResumeButton(){
    if(pauseGameButton.textContent === 'pause')
    {   gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId=null;
        randomMoleId=null;
        pauseGameButton.textContent = 'resume';
    }
    else{
        gameMusic.play();
        timerId = setInterval(randomMole,1000);
        randomMoleId =setInterval(countDown,1000);
        pauseGameButton.textContent = 'pause';
    }
}

startNewGameButton.addEventListener('click',startGame);
pauseGameButton.addEventListener('click',pauseResumeButton)