/*
    Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
    Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
    In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
    La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
    Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
*/

const form = document.querySelector('form');
const grill = document.querySelector('.grill');
form.addEventListener('submit', play);

function createSquares(i, squareSize){
    const square = document.createElement('div');
    square.classList.add('square');
    square.style = `width: calc(100% / ${squareSize}); height: calc(100% / ${squareSize});`;
    square.innerHTML = `<span class="opacity-0">${i}</span>`;
    return square;
}

function createBombs(numberOfBombs, numSquare){
    const bombs = [];
    while(bombs.length < numberOfBombs){
        const bomb = getRndInteger(1, numSquare);
        if(!bombs.includes(bomb)){
            bombs.push(bomb);
        }
    }
    return bombs;
}

function controlBombs(i, bombs, squareSize){
    const squares = document.querySelectorAll('.square');
    if(bombs.includes(i + 1) || bombs.includes(i - 1) || bombs.includes(i + squareSize) || bombs.includes(i + (squareSize + 1)) || bombs.includes(i + (squareSize - 1)) || bombs.includes(i - squareSize) || bombs.includes(i - (squareSize + 1)) || bombs.includes(i - (squareSize - 1))){
        console.log(i);
        squares[i - 1].innerHTML = ` 1 `;
    }
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function play(e){
    e.preventDefault();
    grill.innerHTML = '';
    const difficulty = document.getElementById('level').value;
    const numberOfBombs = 16;
    let numSquare = 0;
    let squareSize = 0;
    switch (difficulty) {
        case "easy":
            console.log('facile');
            numSquare = 100;
            squareSize = 10;
            break;
        case "medium":
            console.log('medio');
            numSquare = 81;
            squareSize = 9;
            break;
        case "hard":
            console.log('difficile');
            numSquare = 49;
            squareSize = 7;
            break;   
    }

    const bombs = createBombs(numberOfBombs, numSquare);
    let messageOutput = document.querySelector('h2');
    messageOutput.innerHTML = `Seleziona il livello di difficoltà`;
    console.log(messageOutput);
    let scoring = 1;
    let gameOver = false;
    console.log(bombs);

    for(let i = 1; i <= numSquare; i++){
        const square = createSquares(i, squareSize);
        square.addEventListener('click', function(){
            if(!gameOver && !square.classList.contains('safe')){
                if(bombs.includes(i)){
                    square.classList.add('lose');
                    messageOutput.innerHTML = `Hai perso!!!! Il tuo punteggio è ${scoring - 1}`;
                    gameOver = true;
                } else {
                    square.classList.add('safe');
                    if(scoring === numSquare - numberOfBombs){
                        messageOutput.innerHTML = `Hai vinto!!!! Sei riuscito a trovare tutti i quadratini dove non erano presenti le bombe. Il tuo punteggio è: ${scoring}`;
                        gameOver = true;
                    } else {
                        console.log(numSquare - numberOfBombs)
                        messageOutput.innerHTML = `Punteggio: ${scoring}`;
                        controlBombs(i, bombs, squareSize);
                    }
                    scoring++;
                }
            }
        })
        grill.appendChild(square);
    }
}