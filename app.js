const gameGrid = document.getElementById('game-grid')
let blocks = document.querySelectorAll('.block')


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
        displayPlayer.innerHTML = 'Player ' + player
    }

    const getPlayer = () => {
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
        } else if (!gameboard.includes('')){
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
    const gameboard = ['', '', '', '', '', '', '', '', '']
    

    const renderContent = index => {

        let moveType
        if(Game.getPlayer()===1) moveType = 'O'
        else moveType = 'X'
    
        if(gameboard[index]===''){
            gameboard[index] = moveType
        
    
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
            Game.changePlayer()
        }
    }
    return { renderContent }
})()


const Players = () => {
    
}


