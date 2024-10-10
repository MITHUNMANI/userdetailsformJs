function createChessBoardUI () {
    const chessUI = document.getElementById('chess');

    for( let row=0; row<8 ; row++){
        for (let col=0;col<8;col++){
            const squarebox = document.createElement('div');
            squarebox.classList.add('square');

            if((row + col) % 2 === 0){
                squarebox.classList.add('white');
            }
            else{
                squarebox.classList.add('black');
            }
            chessUI.appendChild(squarebox);
        }
    }
}

createChessBoardUI();