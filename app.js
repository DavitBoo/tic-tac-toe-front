const createPlayer = (name, marker) => {
    return (name, marker)
}

const gameGrid = document.getElementById('game-grid')
let blocks = document.querySelectorAll('.block')
let player = 1;
let displayPlayer = document.getElementById('display-player')

const Gameboard = {

}

const arrMoves = ['', '', '', '', '', '', '', '', '']

blocks.forEach(element => {
    element.addEventListener('click', () => {
        upadateState(element.dataset.block);
    })
})

function upadateState(index){
    let moveType
    if(player===1) moveType = 'O'
    else moveType = 'X'

    if(arrMoves[index]===''){
        arrMoves[index] = moveType
    

        gameGrid.innerHTML = arrMoves.reduce((acc, elem, i)  => {
            acc += `<div data-block="${i}" class="block ${ elem==='X' ? 'x' : (elem==='O' ? 'o' : '') }"><div>${elem}</div></div>`
            return acc
        }, ``)

        blocks = document.querySelectorAll('.block')

        blocks.forEach(element => {
            element.addEventListener('click', () => {
                upadateState(element.dataset.block);
            })
        })

        if(player === 1){
            player=2;
        }else{
            player=1;
        }

        displayPlayer.innerHTML = 'Player ' + player
    }
}

// players objects      ---> factory ?




// game flow       ---> module ?