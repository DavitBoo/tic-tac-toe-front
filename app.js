const gameGrid = document.getElementById('game-grid')
let blocks = document.querySelectorAll('.block')

const overlay = document.querySelector('.overlay')
const overoverlay = document.querySelector('.overoverlay')
const startBtn = document.querySelector('.start-game')
const inputP1 = document.getElementById('input-p1')
const inputP2 = document.getElementById('input-p2')

let playerO = ''
let playerX = ''

inputP1.addEventListener('input', () => {
    console.log(playerO)
    playerO = inputP1.value
    if(playerO !== '' && playerX !== ''){
        startBtn.classList.remove('hide')
    }
})

inputP2.addEventListener('input', () => {
    playerX = inputP2.value
    if(playerO !== '' && playerX !== ''){
        startBtn.classList.remove('hide')
    }
})


startBtn.addEventListener('click', () => {
    overlay.classList.add('hide')
    overoverlay.classList.add('hide')
    startBtn.classList.add('hide')

    Game.getPlayer();
})


blocks.forEach(element => {
    element.addEventListener('click', () => {
        Gameboard.renderContent(element.dataset.block);
    })
})


/**************** Game **************** */

const Game = (() => {
    let displayPlayer = document.getElementById('display-player')
    let player = 1

    const changePlayer = () => {

        if(player === 1) player=2;
        else player=1
        
        console.log(player)
        
    }

    const getPlayer = () => {
        displayPlayer.innerHTML = `${player===1? playerO : playerX}, make your move.`
        return player
    }


    const gameIsOver = gameboard => {
        if(
                (gameboard[0]==='X' && gameboard[1]==='X' && gameboard[2]==='X') ||
                (gameboard[3]==='X' && gameboard[4]==='X' && gameboard[5]==='X') ||
                (gameboard[6]==='X' && gameboard[7]==='X' && gameboard[8]==='X') ||
                (gameboard[0]==='X' && gameboard[3]==='X' && gameboard[6]==='X') ||
                (gameboard[1]==='X' && gameboard[4]==='X' && gameboard[7]==='X') ||
                (gameboard[2]==='X' && gameboard[5]==='X' && gameboard[8]==='X') ||
                (gameboard[0]==='X' && gameboard[4]==='X' && gameboard[8]==='X') ||
                (gameboard[2]==='X' && gameboard[4]==='X' && gameboard[6]==='X')
        ){
            console.log('X win')
            displayPlayer.innerHTML = `Congratulations ${playerX} <br><button id="play-again">Play Again!</button>`
        } else if(
                (gameboard[0]==='O' && gameboard[1]==='O' && gameboard[2]==='O') ||
                (gameboard[3]==='O' && gameboard[4]==='O' && gameboard[5]==='O') ||
                (gameboard[6]==='O' && gameboard[7]==='O' && gameboard[8]==='O') ||
                (gameboard[0]==='O' && gameboard[3]==='O' && gameboard[6]==='O') ||
                (gameboard[1]==='O' && gameboard[4]==='O' && gameboard[7]==='O') ||
                (gameboard[2]==='O' && gameboard[5]==='O' && gameboard[8]==='O') ||
                (gameboard[0]==='O' && gameboard[4]==='O' && gameboard[8]==='O') ||
                (gameboard[2]==='O' && gameboard[4]==='O' && gameboard[6]==='O')
        ){
            console.log('O Win')
            displayPlayer.innerHTML = `Congratulations ${playerO}, you won! <button id="play-again">Play Again</button>`
        } else if (!gameboard.includes('')){
            displayPlayer.innerHTML = `It is a tie! <button id="play-again">Play Again</button>`
            console.log('Tie Game')
        }
        return
    }

    return {
        changePlayer,
        getPlayer,
        gameIsOver
    }

})()


/************ Gameboard *********** */

const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', '']
    

    const renderContent = index => {
        console.log(gameboard)
        let moveType
        if(Game.getPlayer()===1) moveType = 'O'
        else moveType = 'X'
    
        if(gameboard[index]===''){
            gameboard[index] = moveType
            Game.changePlayer() 
        }
    
        gameGrid.innerHTML = gameboard.reduce((acc, elem, i)  => {
            acc += `<div data-block="${i}" class="block ${ elem==='X' ? 'x' : (elem==='O' ? 'o' : '') }"><div>${elem}</div></div>`
            return acc
        }, ``)

        blocks = document.querySelectorAll('.block')

        blocks.forEach(element => {
            element.addEventListener('click', () => {
                renderContent(element.dataset.block);
            })
        })

        Game.gameIsOver(gameboard)
        


        if(document.getElementById('play-again')){
            const playAgain = document.getElementById('play-again')
            console.log('hey')
            playAgain.addEventListener('click', () => {
                restartGame();
            })
            
        }
        
    }

    const restartGame = () => {
        gameboard = ['', '', '', '', '', '', '', '', '']
        renderContent();
    }

    return { 
        renderContent,
        restartGame
     }
})()


const Players = (playerName) => {
    return playerName;
}


