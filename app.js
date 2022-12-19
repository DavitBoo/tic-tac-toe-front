const gameGrid = document.getElementById('game-grid')
let blocks = document.querySelectorAll('.block')


/* real player or cumpter constants and definitions */

const real1 = document.getElementById('real-1')
const cpu1 = document.getElementById('cpu-1')
const real2 = document.getElementById('real-2')
const cpu2 = document.getElementById('cpu-2')

let typePlayerO = ''
let typePlayerX = ''

real1.addEventListener('click', () => {
    real1.classList.add('icon-selected')
    cpu1.classList.remove('icon-selected')
    typePlayerO = 'real'
})

cpu1.addEventListener('click', () => {
    cpu1.classList.add('icon-selected')
    real1.classList.remove('icon-selected')
    typePlayerO = 'cpu'
})

real2.addEventListener('click', () => {
    real2.classList.add('icon-selected')
    cpu2.classList.remove('icon-selected')
    typePlayerX = 'real'
})

cpu2.addEventListener('click', () => {
    cpu2.classList.add('icon-selected')
    real2.classList.remove('icon-selected')
    typePlayerX = 'cpu'
})


/* player names */

const overlay = document.querySelector('.overlay')
const overoverlay = document.querySelector('.overoverlay')
const startBtn = document.querySelector('.start-game')
const inputP1 = document.getElementById('input-p1')
const inputP2 = document.getElementById('input-p2')

let playerO = ''
let playerX = ''

inputP1.addEventListener('input', () => {
    playerO = inputP1.value
    if((playerO !== '' && playerX !== '') && (typePlayerO !== '' && typePlayerX !== '')) {
        startBtn.classList.remove('hide')
    }
})

inputP2.addEventListener('input', () => {
    playerX = inputP2.value
    if((playerO !== '' && playerX !== '') && (typePlayerO !== '' && typePlayerX !== '')){
        startBtn.classList.remove('hide')
    }
})


startBtn.addEventListener('click', () => {  
    Game.startGame();
})



/**************** Game **************** */

const Game = (() => {
    let displayPlayer = document.getElementById('display-player')
    let player = 1

    const changePlayer = () => {

        if(player === 1) player=2;
        else player=1
                
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
            displayPlayer.innerHTML = `<p>Congratulations ${playerX}</p> <button id="play-again">Play Again!</button>`
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
            displayPlayer.innerHTML = `<p>Congratulations ${playerO}, you won!</p> <button id="play-again">Play Again!</button>`
        } else if (!gameboard.includes('')){
            displayPlayer.innerHTML = `<p>It is a tie!</p> <button id="play-again">Play Again!</button>`
            console.log('Tie Game')
        }
        return
    }

    const startGame = () => {
        overlay.classList.add('hide')
        overoverlay.classList.add('hide')
        startBtn.classList.add('hide')

        if(typePlayerO === 'real'){
        blocks.forEach(element => {
            element.addEventListener('click', () => {
                Gameboard.renderContent(element.dataset.block);
            })
        })} else{
            Gameboard.renderContent(Math.floor(Math.random() * 9));
        }

        console.log('hellooo')

        getPlayer();
    }


    return {
        changePlayer,
        getPlayer,
        gameIsOver,
        startGame
    }

})()


/************ Gameboard *********** */

const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', '']
    

    const renderContent = index => {
        console.log(gameboard)

        // O => player 1    X => player 2
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

        console.log(Game.getPlayer())
        console.log(typePlayerO)
        if((Game.getPlayer()===1 && typePlayerO === 'cpu') || (Game.getPlayer()!==1 && typePlayerX === 'cpu')){
            Gameboard.renderContent(Math.floor(Math.random() * 9));
            }else{
                blocks = document.querySelectorAll('.block')
                blocks.forEach(element => {
                    element.addEventListener('click', () => {
                        renderContent(element.dataset.block);
                    })
                })
        }

        Game.gameIsOver(gameboard)
        

        if(document.getElementById('play-again')){
            const playAgain = document.getElementById('play-again')
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


const Players = (playerName, typeUser) => {
    return {playerName, typeUser};
}


