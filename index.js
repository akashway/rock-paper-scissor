const gamePlayIconList = document.querySelectorAll('#main>div>div')
let rulesButton = document.getElementById('rules-button')
let cancelRulesInfo=document.querySelector(".cross-rule-button")
const body = document.getElementsByTagName('body')[0]
const nextButton= document.getElementById('next-button')
const container = document.querySelector('.container')
const rock = document.getElementsByClassName('rock')[0]
const scissors = document.getElementsByClassName('scissors')[0]
const paper = document.getElementsByClassName('paper')[0]
const lines = document.querySelector('.lines')
const line1 = document.getElementById('line1')
const line2 = document.getElementById('line2')
const line3 = document.getElementById('line3')

let containerChild1Div
let containerChild2Div
let containerChild3Div
let showNextButton=false
let enablePlayIcon=true


let computerWonCounter = localStorage.getItem('computerWonCount') || 0
computerWonCounter=parseInt(computerWonCounter,10)
let playerWonCounter = localStorage.getItem('playerWonCount')|| 0
playerWonCounter=parseInt(playerWonCounter,10)

localStorage.setItem('computerWonCount',computerWonCounter)
localStorage.setItem('playerWonCount',playerWonCounter)


const playAgain = `
    <button onclick="location.reload()"  id="playagain">
        PLAY AGAIN
    </button>
`
const replay = `
    <button onclick="location.reload()"  id="replay">
        REPLAY
    </button>
`

const winnerText = `
    <p> YOU WIN</p>
    <p>AGAINST PC</p>
    ${playAgain}
`
const lossingText = `
    <p> YOU LOST</p>
    <p>AGAINST PC</p>
    ${playAgain}
`

const tieText = `
    <p> TIE UP</p>
    ${replay}
`

const computerScore = document.getElementsByClassName('computer-score')[0]
let pElementForcomputerScore = document.createElement('p')
pElementForcomputerScore.innerHTML = `<p class="score">${computerWonCounter}</p>`
computerScore.appendChild(pElementForcomputerScore)

const playerScore = document.getElementsByClassName('player-score')[0]
let pElementForplayerScore = document.createElement('p')
pElementForplayerScore.innerHTML = `<p class="score">${playerWonCounter}</p>`
playerScore.appendChild(pElementForplayerScore)


console.log(gamePlayIconList);



for (let i = 0; i < gamePlayIconList.length; i++) {
    let playerGuess = 0
    gamePlayIconList[i].addEventListener('click', () => {
        enablePlayIcon=false
        checkVisibilityOfPlayIcon()
        showNextButton=false
        console.log(gamePlayIconList[i].getAttribute('value'));
        playerGuess = gamePlayIconList[i];
        computerTurn(playerGuess)
        console.log(enablePlayIcon);
    })
}

function computerTurn(playerGuess) {
    let computerGuess = 0

    let randomValue = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < gamePlayIconList.length; i++) {
        if (parseInt(gamePlayIconList[i].getAttribute('value')) === randomValue) {
            // console.log(randomValue, gamePlayIconList[i]);
            computerGuess = gamePlayIconList[i]
            // gamePlayIconList[i].style.backgroundColor = 'transparent'
        }
    }
    calculateScore(playerGuess, computerGuess)
}

function calculateScore(playerGuess, computerGuess) {

    let winnerValue = -1
    let winner = ""
    let playerGuessValue = playerGuess.getAttribute('value')
    let computerGuessValue = computerGuess.getAttribute('value')

    console.log(computerWonCounter, playerWonCounter);


    container.classList.add('update-container')
    container.innerHTML = ''

    const containerChild1 = document.createElement('div')
    const containerChild2 = document.createElement('div')
    const containerChild3 = document.createElement('div')
    containerChild2.setAttribute('class', 'result-item2')

    containerChild1Div = container.appendChild(containerChild1)
    containerChild2Div = container.appendChild(containerChild2)
    containerChild3Div = container.appendChild(containerChild3)

    console.log("playerGuess", playerGuess);

    const youPicked = document.createElement('p')
    youPicked.innerHTML = "<p class='para1'>YOU PICKED</p>"
    containerChild1Div.appendChild(youPicked)

    const PCPicked = document.createElement('p')
    PCPicked.innerHTML = "<p class='para2'>PC PICKED</p>"
    containerChild3Div.appendChild(PCPicked)

    containerChild1Div.appendChild(playerGuess)



    if (playerGuessValue === computerGuessValue) {
        console.log("TIE");
        winner = "tie"
        winnerValue = 0
    }

    else if (playerGuessValue === '1') {
        if (computerGuessValue === '2') {
            console.log("player is winner");
            winner = "player"
            winnerValue = 1
            playerWonCounter++
        }
        else if (computerGuessValue === '3') {
            console.log("computer is winner");
            winner = "computer"
            winnerValue = 3
            computerWonCounter++
        }

    }

    else if (playerGuessValue === '2') {
        if (computerGuessValue === '1') {
            console.log("computer is winner");
            winner = "computer"
            winnerValue = 1
            computerWonCounter++

        }
        else if (computerGuessValue === '3') {
            console.log("player is winner");
            winner = "player"
            winnerValue = 2
            playerWonCounter++

        }
    }

    else if (playerGuessValue === '3') {
        if (computerGuessValue === '1') {
            console.log("player is winner");
            winner = "player"
            winnerValue = 3
            playerWonCounter++
        }
        else if (computerGuessValue === '2') {
            console.log("computer is winner");
            winner = "computer"
            winnerValue = 2
            computerWonCounter++
        }

    }

    pElementForplayerScore.innerHTML = `<p class="score">${playerWonCounter}</p>`
    pElementForcomputerScore.innerHTML = `<p class="score">${computerWonCounter}</p>`
    localStorage.setItem('computerWonCount', computerWonCounter)
    localStorage.setItem('playerWonCount', playerWonCounter)

    updateWinnersIcons(winnerValue, winner)

    if (playerGuessValue === computerGuessValue) {
        let computerGuessCloneNode = computerGuess.cloneNode(true)
        containerChild3Div.appendChild(computerGuessCloneNode)
    }
    else {
        containerChild3Div.appendChild(computerGuess)
    }


}


rulesButton.addEventListener('click', () => {
    document.querySelector('.game-rule').style.visibility="visible"
})

cancelRulesInfo.addEventListener('click',()=>{
    document.querySelector('.game-rule').style.visibility="hidden"
}
)


document.addEventListener('DOMContentLoaded', () => {
    enablePlayIcon=true
    const updateLine = (line, startDiv, endDiv) => {
        const radius = startDiv.offsetWidth / 2;
        const startX = startDiv.offsetLeft + radius;
        const startY = startDiv.offsetTop + radius;
        const endX = endDiv.offsetLeft + radius;
        const endY = endDiv.offsetTop + radius;


        line.setAttribute("x1", startX);
        line.setAttribute("y1", startY);
        line.setAttribute("x2", endX);
        line.setAttribute("y2", endY);
    };

    updateLine(line1, rock, scissors);
    updateLine(line2, scissors, paper);
    updateLine(line3, paper, rock);
})


function updateWinnersIcons(winnerValue, winner) {
    let resultMessage = document.createElement('div')
    if (winner === "tie") {
        resultMessage.innerHTML = tieText
    }
    else if (winner === "player") {
        showNextButton=true
        resultMessage.innerHTML = winnerText
    }
    else if (winner === "computer") {
        resultMessage.innerHTML = lossingText
    }
    containerChild2Div.appendChild(resultMessage)

    console.log("winnerValue", winnerValue);
    for (let i = 0; i < gamePlayIconList.length; i++) {
        if (gamePlayIconList[i].getAttribute('value') == winnerValue) {
            console.log("inside if", gamePlayIconList[i]);
            gamePlayIconList[i].classList.add('modify')
        }
    }


    if(showNextButton){
        document.getElementById("next-button").style.visibility="visible"
        document.querySelector('.footer-button').classList.add('update-footer')
    }
}

nextButton.addEventListener('click',()=>{
    location.href='celebration.html'
})

function checkVisibilityOfPlayIcon(){
enablePlayIcon?console.log("nothing"):document.getElementsByClassName('symbol')[0].classList.add('disableClick');document.getElementsByClassName('symbol')[1].classList.add('disableClick');document.getElementsByClassName('symbol')[2].classList.add('disableClick')
}